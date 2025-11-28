using HealthService.Domain.Events;

namespace HealthService.Application.Events.Handlers;

public class MessagePublishedEventHandler
{
    public Task HandleAsync(MessagePublishedEvent evt)
    {
        Console.WriteLine($"[EVENT] {evt.Message}");
        return Task.CompletedTask;
    }
}