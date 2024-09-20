using DataAccessLayer.Models;

namespace DataAccessLayer.Interfaces
{
    public interface IOrderItemRepository
    {
        Task<List<OrderItem>> AddItems(List<OrderItem> items);
        Task<List<OrderItem>> GetItems(int id);
    }
}
