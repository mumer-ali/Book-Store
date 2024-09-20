using Microsoft.Extensions.DependencyInjection;

namespace BusinessAccessLayer.Extensions
{
    public static class RegisterAutoMapper
    {
        public static IServiceCollection AddAutoMapperServices(this IServiceCollection services)
        {
            services.AddAutoMapper(typeof(RegisterAutoMapper).Assembly);
            return services;
        }
    }
}
