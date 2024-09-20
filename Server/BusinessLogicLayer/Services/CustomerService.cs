using BusinessAccessLayer.Interfaces;
using DataAccessLayer.Interfaces;
using DataAccessLayer.Models;

namespace BusinessAccessLayer.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly ICustomerRepository _repository;
        public CustomerService(ICustomerRepository repository) 
        {
            _repository = repository;
        }

        public async Task<Customer> AddCustomer(Customer customer)
        {
            try
            {
                return await _repository.AddOne(customer);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }
        public async Task<List<Customer>> AllCustomers()
        {
            try
            {
                return await _repository.FindAll();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public async Task<Customer> OneCustomer(string email, string password)
        {
            try
            {
                return await _repository.FindById(email, password);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }
    }
}
