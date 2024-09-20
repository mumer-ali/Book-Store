using BusinessAccessLayer.DTOs;
using BusinessAccessLayer.Interfaces;
using Microsoft.AspNetCore.Mvc;
using BusinessAccessLayer.DTOs.Customer;
using BusinessAccessLayer.DTOs.Review;
using AutoMapper;
using DataAccessLayer.Models;

namespace E_CommerceStore.Controllers
{
    [ApiController]
    [Route("api")]
    public class ReviewController : ControllerBase
    {
        private readonly IReviewService _service;
        private readonly IMapper _mapper;
        public ReviewController(IReviewService service, IMapper mapper) 
        {
            _service = service;
            _mapper = mapper;
        }
        [HttpPost("books/{id}")]
        public async Task<IActionResult> AddAReview([FromBody] AddReviewDto addReviewDto)
        {
            try
            {
                var review =  _mapper.Map<AddReviewDto, Review>(addReviewDto);
                var response = await _service.AddOneReview(review);
                return Ok(response);
            }
            catch (Exception e)
            {
                var errorResponse = new ErrorResponseDto
                {
                    Message = "Internal Server Error"
                };
                return NotFound(errorResponse);
            }
        }
    }
}
