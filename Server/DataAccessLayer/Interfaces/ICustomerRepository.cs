using DataAccessLayer.Models;

namespace DataAccessLayer.Interfaces
{
    public interface ICustomerRepository
    {
        Task<List<Customer>> FindAll();
        Task<Customer> FindById(string email, string password);
        Task<Customer> AddOne(Customer customer);
    }
}
