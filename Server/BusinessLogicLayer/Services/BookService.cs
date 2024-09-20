using DataAccessLayer.Models;
using BusinessAccessLayer.Interfaces;
using DataAccessLayer.Interfaces;

namespace BusinessAccessLayer.Services
{
    public class BookService : IBookService
    {
        private readonly IBookRepository _repository;
        public BookService(IBookRepository repository) 
        {
            _repository = repository;
        }
        public async Task<List<Book>> AllBooks()
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
        public async Task<List<Book>> Categorical(string category)
        {
            try
            {
                return await _repository.FindCategory(category);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }
        public async Task<List<Book>> Discounted()
        {
            try
            {
                return await _repository.FindDiscounted();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }
        public async Task<List<Book>> MoreBooks(string ids)
        {
            try
            {
                return await _repository.FindMore(ids);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }
        public async Task<Book> OneBook(string ID)
        {
            try
            {
                return await _repository.FindOne(ID);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public async Task<List<Book>> TopRated()
        {
            try
            {
                return await _repository.FindTopRated();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }
    }
}
