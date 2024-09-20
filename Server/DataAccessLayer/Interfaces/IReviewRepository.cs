using DataAccessLayer.Models;

namespace DataAccessLayer.Interfaces
{
    public interface IReviewRepository
    {
        Task<List<Review>> FindReviewsByBook(string book_id);
        Task<Boolean> AddReview(Review review);
    }
}
