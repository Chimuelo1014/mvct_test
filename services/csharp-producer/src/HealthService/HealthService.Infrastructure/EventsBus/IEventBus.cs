namespace HealthService.Infrastructure.EventsBus;

public interface IEventBus
{
    void Subscribe<T>(Func<T, Task> handler);
    Task PublishAsync<T>(T evt);
}