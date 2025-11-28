using Microsoft.Extensions.DependencyInjection;
using HealthService.Infrastructure.EventsBus;

namespace HealthService.Infrastructure;

public static class InfrastructureServiceRegistration
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services)
    {
        // ✅ Cambio: Usar RabbitMQEventBus en lugar de InMemoryEventBus
        services.AddSingleton<IEventBus, RabbitMQEventBus>();
        
        return services;
    }
}