package ABC.restaurant.service;

import ABC.restaurant.Response.RegisterResponse;
import ABC.restaurant.dto.OrderDto;
import ABC.restaurant.entity.ItemEntity;
import ABC.restaurant.entity.OrderEntity;
import ABC.restaurant.entity.UserEntity;
import ABC.restaurant.repo.ItemRepo;
import ABC.restaurant.repo.OrderRepo;
import ABC.restaurant.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class OrderServiceIMPL implements OrderService{
    @Autowired
    OrderRepo orderRepo;

    @Autowired
    ItemRepo  itemRepo;

    @Autowired
    UserRepo userRepo;

    @Override
    public RegisterResponse placeOrder(OrderDto orderDto) {
        UserEntity userEntity = userRepo.findById(orderDto.getUserId().longValue());
        ItemEntity itemEntity = itemRepo.findById(orderDto.getItemId().longValue());
        Date date = new Date();
        OrderEntity orderEntity = OrderEntity.build(
                0L,
                orderDto.getAddress(),
                date,
                userEntity,
                itemEntity
        );
        orderRepo.save(orderEntity);
        return RegisterResponse.build("Order Placed successfully");
    }

    @Override
    public List<OrderEntity> getAllOrders() {
        return orderRepo.findAll();
    }

    @Override
    public List<OrderEntity> findByUserId(long userId) {
        return orderRepo.findByUserId(userId);
    }

}
