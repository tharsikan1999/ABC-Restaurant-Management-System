package ABC.restaurant.service;

import ABC.restaurant.Response.RegisterResponse;
import ABC.restaurant.dto.OrderDto;
import jakarta.validation.Valid;

public interface OrderService {
    RegisterResponse placeOrder(@Valid OrderDto orderDto);
}
