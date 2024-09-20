using BusinessAccessLayer.Interfaces;
using BusinessAccessLayer.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace E_CommerceStore.Controllers
{
    [ApiController]
    [Route("api")]
    public class BookController : ControllerBase
    {
        private readonly IBookService _bService;
        private readonly IReviewService _rService;
        private readonly ICustomerService _cService;
        public BookController(IBookService bService, IReviewService rService, ICustomerService cService)
        {
            _bService = bService;
            _rService = rService;
            _cService = cService;
        }
        [HttpGet("books")]
        public async Task<IActionResult> GetAllBooks()
        {
            try
            {
                var books = await _bService.AllBooks();
                return Ok(books);
            }
            catch (Exception e)
            {
                var errorResponse = new ErrorResponseDto
                {
                    Message = e.Message,
                };
                return NotFound(errorResponse);
            }
        }
        [HttpGet("books/{id}")]
        public async Task<IActionResult> GetBookById([FromRoute] string id)
        {
            try
            {
                var data = await _bService.OneBook(id);
                var reviews = await _rService.BookReviews(id);
                var customers = await _cService.AllCustomers();
                return Ok(new { data, reviews, customers });
            }
            catch (Exception e)
            {
                var errorResponse = new ErrorResponseDto
                {
                    Message = e.Message,
                };
                return NotFound(errorResponse);
            }
        }
        [HttpGet("ordered-books/{ids}")]
        public async Task<IActionResult> GetBooksById([FromRoute] string ids)
        {
            try
            {
                var data = await _bService.MoreBooks(ids);
                return Ok(data);
            }
            catch (Exception e)
            {
                var errorResponse = new ErrorResponseDto
                {
                    Message = e.Message,
                };
                return NotFound(errorResponse);
            }
        }
        [HttpGet("books/category/{category}")]
        public async Task<IActionResult> GetBooksByCategory([FromRoute] string category)
        {
            try
            {
                var data = await _bService.Categorical(category);
                return Ok(data);
            }
            catch (Exception e)
            {
                var errorResponse = new ErrorResponseDto
                {
                    Message = e.Message,
                };
                return NotFound(errorResponse);
            }
        }
        [HttpGet("books/discount")]
        public async Task<IActionResult> GetDiscountedBooks()
        {
            try
            {
                var data = await _bService.Discounted();
                return Ok(data);
            }
            catch (Exception e)
            {
                var errorResponse = new ErrorResponseDto
                {
                    Message = e.Message,
                };
                return NotFound(errorResponse);
            }
        }
        [HttpGet]
        public async Task<IActionResult> GetTopRated()
        {
            try
            {
                var data = await _bService.TopRated();
                return Ok(data);
            }
            catch (Exception e)
            {
                var errorResponse = new ErrorResponseDto
                {
                    Message = e.Message,
                };
                return NotFound(errorResponse);
            }
        }
    }
}
