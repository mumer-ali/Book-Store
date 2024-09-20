using DataAccessLayer.Models;

namespace BusinessAccessLayer.Interfaces
{
    public interface ICustomerService
    {
        Task<List<Customer>> AllCustomers();
        Task<Customer> OneCustomer(string email, string password);
        Task<Customer> AddCustomer(Customer customer);
    }
}
