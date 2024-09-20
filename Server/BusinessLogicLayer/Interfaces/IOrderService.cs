namespace BusinessAccessLayer.Interfaces;
using DataAccessLayer.Models;

public interface IOrderService
{
    Task<Order> AddOneOrder(Order order);
    Task<Order> GetOneOrder(int id);
}
