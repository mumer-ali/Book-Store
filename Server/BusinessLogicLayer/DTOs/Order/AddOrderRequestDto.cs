namespace BusinessAccessLayer.DTOs.Order
{
    public class AddOrderRequestDto
    {
        public AddOrderDto AddOrder { get; set; }
        public List<AddOrderItemDto> AddOrderItems { get; set; }
    }
}
