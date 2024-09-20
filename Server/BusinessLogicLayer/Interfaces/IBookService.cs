using DataAccessLayer.Repositories;
using DataAccessLayer.Models;

namespace BusinessAccessLayer.Interfaces
{
    public interface IBookService
    {
        Task<List<Book>> AllBooks();
        Task<Book> OneBook(string ID);
        Task<List<Book>> MoreBooks(string ids);
        Task<List<Book>> Categorical(string category);
        Task<List<Book>> Discounted();
        Task<List<Book>> TopRated();
    }
}
