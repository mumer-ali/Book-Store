using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccessLayer.Models
{
    public class Book
    {
        [Key]
        public string Book_ID { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Category { get; set; }
        [Required]
        public string Author { get; set; } 
        [Required]
        public string URL { get; set; } 
        [Required]
        [Range(0, int.MaxValue)]
        public int Price { get; set; } 
        [Required]
        [Range(0, int.MaxValue)]
        public int Quantity { get; set; } 
        [Range(0, 100)]
        public int Discount { get; set; }
        public List<Review> Reviews { get; set; }
    }
}
