using DataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Data
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {
        }
        public DbSet<Admin> Admin { get; set; }
        public DbSet<Customer> Customer { get; set; }
        public DbSet<Book> Book { get; set; }
        public DbSet<Order> Order { get; set; }
        public DbSet<Review> Review { get; set; }
        public DbSet<OrderItem> OrderItem { get; set; }
    }
}
