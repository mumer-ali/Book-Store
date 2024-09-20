namespace BusinessAccessLayer.DTOs.Review
{
    public class AddReviewDto
    {
        public string Email { get; set; }
        public string Book_ID { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; }
        public DateTime DateTime { get; set; }
    }
}
