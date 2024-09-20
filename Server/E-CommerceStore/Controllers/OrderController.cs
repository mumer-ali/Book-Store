using BusinessAccessLayer.DTOs;
using BusinessAccessLayer.Interfaces;
using Microsoft.AspNetCore.Mvc;
using BusinessAccessLayer.DTOs.Order;
using AutoMapper;
using DataAccessLayer.Models;

namespace E_CommerceStore.Controllers
{
    [ApiController]
    [Route("api")]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _oService;
        private readonly IMapper _mapper;
        private readonly IOrderItemService _oIService;
        public OrderController(IOrderService oService, IMapper mapper, IOrderItemService oIService) 
        {
            _oService = oService;
            _mapper = mapper;
            _oIService = oIService;
        }
        [HttpPost("checkout")]
        public async Task<IActionResult> AddAOrder([FromBody] AddOrderRequestDto requestDto)
        {
            try
            {
                AddOrderDto orderInfo = requestDto.AddOrder;
                List<AddOrderItemDto> orderItems = requestDto.AddOrderItems;
                var order = _mapper.Map<AddOrderDto, Order>(orderInfo);
                var response = await _oService.AddOneOrder(order);
                var orderID = response.Order_ID;
                orderItems.ForEach(item => item.Order_ID = orderID);
                List<OrderItem> finalItems = _mapper.Map<List<AddOrderItemDto>, List<OrderItem>>(orderItems);
                var addedItems = await _oIService.AddOrderItem(finalItems);
                return Ok(addedItems);

            }
            catch (Exception e)
            {
                var errorResponse = new ErrorResponseDto
                {
                    Message = e.Message,
                };
                return BadRequest(errorResponse);
            }
        }
        [HttpGet("order/{id}")]
        public async Task<IActionResult> GetAOrder([FromRoute] int id)
        {
            try 
            {
                var order = await _oService.GetOneOrder(id);
                var items = await _oIService.GetOrderItems(id);
                return Ok(new { order, items });
            }
            catch (Exception e)
            {
                var errorResponse = new ErrorResponseDto
                {
                    Message = e.Message,
                };
                return BadRequest(errorResponse);
            }
        }
    }
}
