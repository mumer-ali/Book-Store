using DataAccessLayer.Data;
using DataAccessLayer.Interfaces;
using DataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Repositories
{
    public class ReviewRepository : IReviewRepository
    {
        private readonly DatabaseContext _context;
        public ReviewRepository(DatabaseContext context) 
        {
            _context = context;
        }

        public async Task<bool> AddReview(Review review)
        {
            try
            {
                await _context.Review.AddAsync(review);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<List<Review>> FindReviewsByBook(string book_id)
        {
            var reviews = await _context.Set<Review>().Where(x => x.Book_ID == book_id).ToListAsync();
            if (reviews == null)
            {
                throw new Exception("No reviews found for the given ID");
            }
            return reviews;
        }
    }
}
