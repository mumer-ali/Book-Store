using BusinessAccessLayer.Interfaces;
using BusinessAccessLayer.Services;
using Microsoft.Extensions.DependencyInjection;

namespace BusinessAccessLayer.Extensions
{
    public static class RegisterBALServices
    {
        public static IServiceCollection AddBALServices(this IServiceCollection services)
        {
            services.AddScoped<IAdminService, AdminService>();
            services.AddScoped<IBookService, BookService>();
            services.AddScoped<ICustomerService, CustomerService>();
            services.AddScoped<IOrderService, OrderService>();
            services.AddScoped<IReviewService, ReviewService>();
            services.AddScoped<IOrderItemService, OrderItemService>();
            return services;
        }
    }
}
