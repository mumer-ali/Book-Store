using DataAccessLayer.Models;

namespace BusinessAccessLayer.Interfaces
{
    public interface IOrderItemService
    {
        Task<List<OrderItem>> AddOrderItem(List<OrderItem> items);
        Task<List<OrderItem>> GetOrderItems(int id);
    }
}
