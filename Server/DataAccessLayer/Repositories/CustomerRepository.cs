using DataAccessLayer.Data;
using DataAccessLayer.Interfaces;
using DataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Repositories
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly DatabaseContext _context;
        public CustomerRepository(DatabaseContext context) 
        {
            _context = context;
        }

        public async Task<Customer> AddOne(Customer customer)
        {
            var response = await _context.Set<Customer>().Where(x => x.Email == customer.Email).FirstOrDefaultAsync();
            if (response == null)
            {
                await _context.Set<Customer>().AddAsync(customer);
                await _context.SaveChangesAsync();
                return customer;
            }
            throw new Exception("Customer with this email already exists!");
        }

        public async Task<List<Customer>> FindAll()
        {
            var customers = await _context.Set<Customer>().ToListAsync();
            if (customers == null)
            {
                throw new Exception("No customers found!");
            }
            return customers;
        }

        public async Task<Customer> FindById(string email, string password)
        {
            var customer = await _context.Set<Customer>().Where(x => x.Email == email && x.Password == password).FirstOrDefaultAsync();
            if (customer == null)
            {
                throw new Exception("Incorrect username or password!");
            }
            return customer;
        }
    }
}
