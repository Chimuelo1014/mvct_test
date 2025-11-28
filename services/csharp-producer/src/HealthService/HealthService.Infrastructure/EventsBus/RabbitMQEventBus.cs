using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using RabbitMQ.Client;

namespace HealthService.Infrastructure.EventsBus;

public class RabbitMQEventBus : IEventBus, IDisposable
{
    private readonly IConnection _connection;
    private readonly IModel _channel;
    private readonly ILogger<RabbitMQEventBus> _logger;
    private const string QueueName = "test_ping_queue";

    public RabbitMQEventBus(IConfiguration configuration, ILogger<RabbitMQEventBus> logger)
    {
        _logger = logger;
        
        var factory = new ConnectionFactory
        {
            HostName = configuration["RMQ_HOST"] ?? "localhost",
            UserName = configuration["RMQ_USER"] ?? "guest",
            Password = configuration["RMQ_PASS"] ?? "guest",
            Port = 5672,
            RequestedHeartbeat = TimeSpan.FromSeconds(60),
            AutomaticRecoveryEnabled = true
        };

        try
        {
            _connection = factory.CreateConnection();
            _channel = _connection.CreateModel();

            // Declarar la cola (idempotente)
            _channel.QueueDeclare(
                queue: QueueName,
                durable: true,
                exclusive: false,
                autoDelete: false,
                arguments: null
            );

            _logger.LogInformation("✅ RabbitMQ conectado: {Host}:{Port} | Cola: {Queue}", 
                factory.HostName, factory.Port, QueueName);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "❌ Error conectando a RabbitMQ: {Host}:{Port}", 
                factory.HostName, factory.Port);
            throw;
        }
    }

    public void Subscribe<T>(Func<T, Task> handler)
    {
        // No implementado en productor
        _logger.LogWarning("Subscribe no implementado en RabbitMQEventBus (Producer)");
    }

    public Task PublishAsync<T>(T evt)
    {
        try
        {
            var json = JsonSerializer.Serialize(evt, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            });
            
            var body = Encoding.UTF8.GetBytes(json);

            var properties = _channel.CreateBasicProperties();
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