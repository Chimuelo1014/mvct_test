using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using RabbitMQ.Client;

namespace HealthService.Infrastructure.EventsBus;

public class RabbitMQEventBus : IEventBus, IDisposable
{
    private IConnection? _connection;
    private IModel? _channel;
    private readonly ILogger<RabbitMQEventBus> _logger;
    private readonly IConfiguration _configuration;
    private const string QueueName = "test_ping_queue";
    private readonly int _maxRetries = 5;
    private readonly int _retryDelayMs = 3000;

    public RabbitMQEventBus(IConfiguration configuration, ILogger<RabbitMQEventBus> logger)
    {
        _logger = logger;
        _configuration = configuration;
        
        // ✅ Inicializar conexión con reintentos
        InitializeConnection();
    }

    private void InitializeConnection()
    {
        var factory = new ConnectionFactory
        {
            HostName = _configuration["RMQ_HOST"] ?? "localhost",
            UserName = _configuration["RMQ_USER"] ?? "guest",
            Password = _configuration["RMQ_PASS"] ?? "guest",
            Port = 5672,
            RequestedHeartbeat = TimeSpan.FromSeconds(60),
            AutomaticRecoveryEnabled = true
        };

        for (int attempt = 1; attempt <= _maxRetries; attempt++)
        {
            try
            {
                _logger.LogInformation("🔄 Intento {Attempt}/{MaxRetries} de conexión a RabbitMQ: {Host}:{Port}", 
                    attempt, _maxRetries, factory.HostName, factory.Port);

                _connection = factory.CreateConnection();
                _channel = _connection.CreateModel();

                _channel.QueueDeclare(
                    queue: QueueName,
                    durable: true,
                    exclusive: false,
                    autoDelete: false,
                    arguments: null
                );

                _logger.LogInformation("✅ RabbitMQ conectado: {Host}:{Port} | Cola: {Queue}", 
                    factory.HostName, factory.Port, QueueName);
                return;
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "⚠️ Intento {Attempt}/{MaxRetries} falló. Reintentando en {Delay}ms...", 
                    attempt, _maxRetries, _retryDelayMs);

                if (attempt == _maxRetries)
                {
                    _logger.LogError(ex, "❌ No se pudo conectar a RabbitMQ después de {MaxRetries} intentos", _maxRetries);
                    throw;
                }

                Thread.Sleep(_retryDelayMs);
            }
        }
    }

    public void Subscribe<T>(Func<T, Task> handler)
    {
        _logger.LogWarning("Subscribe no implementado en RabbitMQEventBus (Producer)");
    }

    public Task PublishAsync<T>(T evt)
    {
        try
        {
            if (_channel == null || !_channel.IsOpen)
            {
                _logger.LogWarning("⚠️ Canal cerrado, reconectando...");
                InitializeConnection();
            }

            var json = JsonSerializer.Serialize(evt, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            });
            
            var body = Encoding.UTF8.GetBytes(json);

            var properties = _channel!.CreateBasicProperties();
            properties.Persistent = true;
            properties.ContentType = "application/json";
            properties.Timestamp = new AmqpTimestamp(DateTimeOffset.UtcNow.ToUnixTimeSeconds());

            _channel.BasicPublish(
                exchange: "",
                routingKey: QueueName,
                basicProperties: properties,
                body: body
            );

            _logger.LogInformation("📤 Mensaje publicado a RabbitMQ: {Json}", json);
            return Task.CompletedTask;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "❌ Error publicando mensaje a RabbitMQ");
            throw;
        }
    }

    public void Dispose()
    {
        _channel?.Close();
        _connection?.Close();
        _logger.LogInformation("🔌 RabbitMQ desconectado");
    }
}