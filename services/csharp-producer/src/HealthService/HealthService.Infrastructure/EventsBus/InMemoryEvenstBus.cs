namespace HealthService.Infrastructure.EventsBus;

public class InMemoryEventBus : IEventBus
{
    private readonly Dictionary<Type, List<Func<object, Task>>> _handlers = new();

    public void Subscribe<T>(Func<T, Task> handler)
    {
        var type = typeof(T);

        if (!_handlers.ContainsKey(type))
            _handlers[type] = new();

        _handlers[type].Add(x => handler((T)x));
    }

    public async Task PublishAsync<T>(T evt)
    {
        var type = typeof(T);

        if (_handlers.TryGetValue(type, out var handlers))
        {
            foreach (var h in handlers)
                await h(evt!);
        }
    }
}