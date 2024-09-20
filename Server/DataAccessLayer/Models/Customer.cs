using System.ComponentModel.DataAnnotations;

namespace DataAccessLayer.Models
{
    public class Customer
    {
        [Key]
        public string Email { get; set; } 
        [Required]
        public string Password { get; set; } 
        [Required]
        public string FirstName { get; set; } 
        [Required]
        public string LastName { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        public List<Review> Reviews { get; set; }
        public List<Order> Orders { get; set; }
    }
}
