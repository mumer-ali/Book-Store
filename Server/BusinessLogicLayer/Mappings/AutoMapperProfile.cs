using AutoMapper;
using BusinessAccessLayer.DTOs.Customer;
using BusinessAccessLayer.DTOs.Order;
using BusinessAccessLayer.DTOs.Review;
using DataAccessLayer.Models;

namespace BusinessAccessLayer.Mappings
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Customer, PostLoginCustomerDto>();
            CreateMap<Review, AddReviewDto>().ReverseMap();
            CreateMap<PreSignupCustomerDto, Customer>();
            CreateMap<Customer, PostSignupCustomerDto>();
            CreateMap<AddOrderDto, Order>();
            CreateMap<AddOrderItemDto, OrderItem>();
            //CreateMap<AddOrderItemDto, OrderItem>();
            //CreateMap<IDataReader, ProductOrderDetailsDto>()
            //    .ForMember(dest => dest.PID, opt => opt.MapFrom(src => src["PID"]))
            //    .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src["Name"]))
            //    .ForMember(dest => dest.SalesQuantity, opt => opt.MapFrom(src => src["SalesQuantity"]))
            //    .ForMember(dest => dest.SalesPrice, opt => opt.MapFrom(src => src["SalesPrice"]));
        }
    }
}