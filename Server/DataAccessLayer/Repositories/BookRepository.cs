using DataAccessLayer.Data;
using DataAccessLayer.Interfaces;
using DataAccessLayer.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Data;

namespace DataAccessLayer.Repositories
{
    public class BookRepository : IBookRepository
    {
        private readonly DatabaseContext _context;
        private readonly IConfiguration _configuration;
        public BookRepository(DatabaseContext context, IConfiguration configuration) 
        {
            _context = context;
            _configuration = configuration;
        }
        public async Task<List<Book>> FindAll()
        {
            var books = await _context.Set<Book>().ToListAsync();
            if (books == null)
            {
                throw new Exception("No books found");
            }
            return books;
        }
        public async Task<List<Book>> FindCategory(string category)
        {
            var books = await _context.Set<Book>().Where(x => x.Category == category).ToListAsync();
            if (books == null)
            {
                throw new Exception("No books found for the given category!");
            }
            return books;
        }
        public async Task<List<Book>> FindDiscounted()
        {
            var books = await _context.Set<Book>().Where(x => x.Discount != 0).ToListAsync();
            if (books == null)
            {
                throw new Exception("No discounted books!");
            }
            return books;
        }
        public async Task<List<Book>> FindMore(string ids)
        {
            string[] idsArray = ids.Split(", ");
            var books = await _context.Book.Where(e => idsArray.Contains(e.Book_ID)).ToListAsync();
            if (books == null)
            {
                throw new Exception("No books found for the given ID");
            }
            return books;
        }
        public async Task<Book> FindOne(string ID)
        {
            var book = await _context.Set<Book>().Where(x => x.Book_ID == ID).FirstOrDefaultAsync();
            if (book == null)
            {
                throw new Exception("No book found for the given ID");
            }
            return book;
        }
        public async Task<List<Book>> FindTopRated()
        {
            var connectionString = _configuration.GetConnectionString("DefaultConnection");
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                using (SqlCommand command = new SqlCommand("GetTopRatedBooks", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    await connection.OpenAsync();
                    using (SqlDataReader reader = await command.ExecuteReaderAsync())
                    {
                        List<Book> topRatedBooks = new List<Book>();

                        while (await reader.ReadAsync())
                        {
                            Book book = new Book
                            {
                                Book_ID = reader.GetString(0),
                                Name = reader.GetString(1),
                                Category = reader.GetString(2),
                                Author = reader.GetString(3),
                                URL = reader.GetString(4),
                                Price = reader.GetInt32(5),
                                Quantity = reader.GetInt32(6),
                                Discount = reader.GetInt32(7)
                            };
                            topRatedBooks.Add(book);
                        }
                        await connection.CloseAsync();
                        return topRatedBooks;
                    }
                }
            }
        }
    }
}
