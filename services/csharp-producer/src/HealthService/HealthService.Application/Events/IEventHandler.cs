using HealthService.Domain.Events;

namespace HealthService.Application.Events;

public interface IEventHandler<TEvent> where TEvent : IEvent
{
    Task HandleAsync(TEvent evt);
}