using BusinessAccessLayer.DTOs;
using BusinessAccessLayer.Interfaces;
using Microsoft.AspNetCore.Mvc;
using BusinessAccessLayer.DTOs.Customer;
using AutoMapper;
using DataAccessLayer.Models;

namespace E_CommerceStore.Controllers
{
    [ApiController]
    [Route("api")]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerService _service;
        private readonly IMapper _mapper;
        public CustomerController(ICustomerService service, IMapper mapper) 
        {
            _service = service;
            _mapper = mapper;
        }
        [HttpPost("login")]
        public async Task<IActionResult> LoginCustomer([FromBody] PreLoginCustomerDto loginDto)
        {
            try
            {
                var customer = await _service.OneCustomer(loginDto.Email, loginDto.Password);
                return Ok(_mapper.Map<Customer, PostLoginCustomerDto>(customer));
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
        [HttpPost("signup")]
        public async Task<IActionResult> SignupCustomer([FromBody] PreSignupCustomerDto signupDto)
        {
            try
            {
                var customer = _mapper.Map<PreSignupCustomerDto, Customer>(signupDto);
                await _service.AddCustomer(customer);
                return Ok(_mapper.Map<Customer, PostSignupCustomerDto>(customer));
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
