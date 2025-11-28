using HealthService.Infrastructure; 
using HealthService.Infrastructure.EventsBus;
using HealthService.Domain.Events;
using HealthService.Application.Events.Handlers;
using HealthService.Api.Contracts;
using HealthService.Application;
using HealthService.Api.Storage;

var builder = WebApplication.CreateBuilder(args);

// ✅ Logging mejorado
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.SetMinimumLevel(LogLevel.Debug);

// ✅ CORS configurado desde variables de entorno
var allowedOrigins = builder.Configuration["CORS_ORIGINS"]?.Split(',') 
    ?? new[] { "http://localhost:5173", "http://localhost:3000" };

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(allowedOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// ✅ Registro de servicios
builder.Services.AddInfrastructureServices(); // Ahora usa RabbitMQEventBus
builder.Services.AddApplicationServices();

var app = builder.Build();

app.UseCors("AllowFrontend");

// ✅ Event Bus - Eliminar suscripción (no se usa en productor)
// El consumer Java manejará el consumo

// ✅ ENDPOINTS
app.MapPost("/publish", async (PublishRequest req, IEventBus bus, ILogger<Program> logger) =>
{
    try
    {
        var evt = new MessagePublishedEvent(
            EventId: Guid.NewGuid().ToString(),
            Timestamp: DateTime.UtcNow.ToString("o"), // ISO 8601
            TenantId: "default-tenant",
            Message: req.Message
        );
        
        await bus.PublishAsync(evt);
        MessageStore.LastMessage = req.Message;

        logger.LogInformation("✅ Mensaje publicado: {EventId}", evt.EventId);

        return Results.Accepted("/publish", new
        {
            published = true,
            eventId = evt.EventId,
            message = evt.Message,
            timestamp = evt.Timestamp
        });
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "❌ Error publicando mensaje");
        return Results.Problem("Error al publicar mensaje");
    }
});

app.MapGet("/last", () =>
{
    return Results.Json(new
    {
        message = MessageStore.LastMessage
    });
});

app.MapGet("/health", (ILogger<Program> logger) => 
{
    logger.LogInformation("💚 Health check OK");
    return Results.Json(new { status = "Healthy", service = "csharp-producer" });
});

app.Run();