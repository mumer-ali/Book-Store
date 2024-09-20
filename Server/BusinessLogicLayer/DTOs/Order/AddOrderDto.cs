using DataAccessLayer.Models;
using System.ComponentModel.DataAnnotations;

namespace BusinessAccessLayer.DTOs.Order
{
    public class AddOrderDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string PostalCode { get; set; }
        public string Status { get; set; }
        public int Amount { get; set; }
        public DateTime DateTime { get; set; }
    }
}
