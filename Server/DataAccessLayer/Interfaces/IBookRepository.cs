using DataAccessLayer.Models;

namespace DataAccessLayer.Interfaces
{
    public interface IBookRepository
    {
        Task<List<Book>> FindAll();
        Task<Book> FindOne(string ID);
        Task<List<Book>> FindMore(string ids);
        Task<List<Book>> FindCategory(string category);
        Task<List<Book>> FindDiscounted();
        Task<List<Book>> FindTopRated();
    }
}
