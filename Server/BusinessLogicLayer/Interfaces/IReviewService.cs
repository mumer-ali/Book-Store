using DataAccessLayer.Models;

namespace BusinessAccessLayer.Interfaces
{
    public interface IReviewService
    {
        Task<List<Review>> BookReviews(string book_id);
        Task<Boolean> AddOneReview(Review review);
    }
}
