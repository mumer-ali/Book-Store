using DataAccessLayer.Data;
using DataAccessLayer.Interfaces;
using DataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Repositories
{
    public class OrderItemRepository : IOrderItemRepository
    {
        private readonly DatabaseContext _context;
        public OrderItemRepository(DatabaseContext context) 
        { 
            _context = context;
        }
        public async Task<List<OrderItem>> AddItems(List<OrderItem> items)
        {
            if (items == null)
            {
                throw new Exception("No items to be inserted!");
            }
            await _context.OrderItem.AddRangeAsync(items);
            await _context.SaveChangesAsync();
            return items;
        }
        public async Task<List<OrderItem>> GetItems(int id)
        {
            var orders = await _context.OrderItem.Where(x => x.Order_ID == id).ToListAsync();
            if (orders == null)
            {
                throw new Exception("No orders found with given ID");
            }
            return orders;
        }
    }
}
