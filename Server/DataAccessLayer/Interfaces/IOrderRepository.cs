using DataAccessLayer.Models;

namespace DataAccessLayer.Interfaces
{
    public interface IOrderRepository
    {
        Task<Order> AddOrder(Order order);
        Task<Order> GetOrder(int id);
    }
}
