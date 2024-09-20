using BusinessAccessLayer.Interfaces;
using DataAccessLayer.Interfaces;
using DataAccessLayer.Models;

namespace BusinessAccessLayer.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _repository;
        public OrderService(IOrderRepository repository) 
        {
            _repository = repository;
        }
        public async Task<Order> AddOneOrder(Order order)
        {
            try
            {
                return await _repository.AddOrder(order);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }
        public async Task<Order> GetOneOrder(int id)
        {
            try
            {
                return await _repository.GetOrder(id);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }
    }
}
