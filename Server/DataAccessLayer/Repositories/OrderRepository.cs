using DataAccessLayer.Data;
using DataAccessLayer.Interfaces;
using DataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly DatabaseContext _context;
        public OrderRepository(DatabaseContext context) 
        {
            _context = context;
        }
        public async Task<Order> AddOrder(Order order)
        {
            try
            {
                await _context.Order.AddAsync(order);
                await _context.SaveChangesAsync();
                return order;
            }
            catch (Exception)
            {
                throw new Exception("Error occured while placing order!");
            }
        }
        public async Task<Order> GetOrder(int id)
        {
            var order = await _context.Order.Where(x => x.Order_ID == id).FirstOrDefaultAsync();
            if (order == null) 
            {
                throw new Exception("No order found with given ID");
            }
            return order;
        }
    }
}
