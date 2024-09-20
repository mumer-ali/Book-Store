namespace BusinessAccessLayer.DTOs.Order
{
    public class AddOrderItemDto
    {
        public int Order_ID { get; set; }
        public string Book_ID { get; set; }
        public int Quantity { get; set; }
    }
}
