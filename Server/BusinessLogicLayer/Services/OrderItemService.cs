using BusinessAccessLayer.Interfaces;
using DataAccessLayer.Interfaces;
using DataAccessLayer.Models;

namespace BusinessAccessLayer.Services
{
    public class OrderItemService : IOrderItemService
    {
		private readonly IOrderItemRepository _repository;
		public OrderItemService(IOrderItemRepository repository) 
		{
			_repository = repository;
		}
        public async Task<List<OrderItem>> AddOrderItem(List<OrderItem> items)
        {
			try
			{
				return await _repository.AddItems(items);
			}
			catch (Exception e)
			{
				throw new Exception(e.Message);
			}
        }
        public async Task<List<OrderItem>> GetOrderItems(int id)
        {
            try
            {
                return await _repository.GetItems(id);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }
    }
}
