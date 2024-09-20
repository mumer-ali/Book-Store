using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccessLayer.Models
{
    public class Review
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Review_ID { get; set; }
        [Required]
        [ForeignKey("Customer")]
        [Column("Reviewer")]
        public string Email { get; set; }
        public Customer Customer { get; set; }
        [Required]
        [ForeignKey("Book")]
        public string Book_ID { get; set; }
        public Book Book { get; set; }
        [Required]
        public int Rating { get; set; }
        public string Comment { get; set; } 
        [Required]
        public DateTime DateTime { get; set; } 
    }
}
