using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace DataAccessLayer.Models
{
    public class Order
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Range(100000, 999999)]
        public int Order_ID { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required] 
        public string PhoneNumber { get; set; }
        [Required]
        public string Address { get; set; }
        [Required] 
        public string City { get; set; }
        [Required] 
        public string Country { get; set; }
        [Required] 
        public string PostalCode { get; set; }
        [Required] 
        public string Status { get; set; }
        [Required]
        public int Amount { get; set; }
        [Required]
        public DateTime DateTime { get; set; }
    }
}