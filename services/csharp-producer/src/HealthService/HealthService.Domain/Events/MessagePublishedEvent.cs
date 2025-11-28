namespace HealthService.Domain.Events;

public record MessagePublishedEvent(
    string EventId,      // Alineado con Java: eventId
    string Timestamp,    // Alineado con Java: timestamp (ISO 8601)
    string TenantId,     // Alineado con Java: tenantId
    string Message       // Payload adicional
);