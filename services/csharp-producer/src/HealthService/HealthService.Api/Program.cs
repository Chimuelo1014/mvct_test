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
builder.Logging.SetMinimumLevel(LogLevel.Information);

// ✅ CORS configurado desde variables de entorno
var allowedOrigins = builder.Configuration["CORS_ORIGINS"]?.Split(',') 
    ?? new[] { "http://localhost:5173", "http://localhost:3000", "http://localhost" };

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
builder.Services.AddInfrastructureServices();
builder.Services.AddApplicationServices();

var app = builder.Build();

app.UseCors("AllowFrontend");

// ✅ HEALTH CHECK MEJORADO - Ruta correcta
app.MapGet("/api/v1/health", (ILogger<Program> logger) => 
{
    try
    {
        logger.LogInformation("💚 Health check OK vía /api/v1/health");
        return Results.Ok(new { 
            status = "Healthy", 
            service = "csharp-producer",
            timestamp = DateTime.UtcNow
        });
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "❌ Health check failed");
        return Results.Problem("Service unhealthy");
    }
});

// ✅ ENDPOINT DE PUBLICACIÓN
app.MapPost("/api/v1/publish", async (PublishRequest req, IEventBus bus, ILogger<Program> logger) =>
{
    try
    {
        var evt = new MessagePublishedEvent(
            EventId: Guid.NewGuid().ToString(),
            Timestamp: DateTime.UtcNow.ToString("o"),
            TenantId: "default-tenant",
            Message: req.Message
        );
        
        await bus.PublishAsync(evt);
        MessageStore.LastMessage = req.Message;

        logger.LogInformation("✅ Mensaje publicado: {EventId}", evt.EventId);

        return Results.Accepted("/api/v1/publish", new
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

// ✅ Endpoint para obtener último mensaje
app.MapGet("/api/v1/last", () =>
{
    return Results.Json(new
    {
        message = MessageStore.LastMessage
    });
});

// ✅ Agregar endpoint raíz para pruebas
app.MapGet("/", () => "CipherAudit C# Producer - Online ✅");

app.Run();