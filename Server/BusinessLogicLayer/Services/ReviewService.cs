using BusinessAccessLayer.Interfaces;
using DataAccessLayer.Interfaces;
using DataAccessLayer.Models;

namespace BusinessAccessLayer.Services
{
    public class ReviewService : IReviewService
    {
        private readonly IReviewRepository _repository;
        public ReviewService(IReviewRepository repository)
        {
            _repository = repository;
        }

        public async Task<Boolean> AddOneReview(Review review)
        {
            try
            {
                return await _repository.AddReview(review);
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<List<Review>> BookReviews(string book_id)
        {
            try
            {
                return await _repository.FindReviewsByBook(book_id);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }
    }
}
