package ABC.restaurant.service;

import ABC.restaurant.Response.RegisterResponse;
import ABC.restaurant.dto.OrderDto;
import ABC.restaurant.entity.ItemEntity;
import ABC.restaurant.entity.OrderEntity;
import jakarta.validation.Valid;

import java.util.List;

public interface OrderService {
    RegisterResponse placeOrder(@Valid OrderDto orderDto);

    List<OrderEntity> getAllOrders();

    List<OrderEntity> findByUserId(long userId);
}
