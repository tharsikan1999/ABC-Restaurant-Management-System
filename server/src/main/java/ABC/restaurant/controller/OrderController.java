package ABC.restaurant.controller;

import ABC.restaurant.Response.RegisterResponse;
import ABC.restaurant.dto.ItemDto;
import ABC.restaurant.dto.OrderDto;
import ABC.restaurant.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    OrderService orderService;

    @PostMapping("/placeOrder")
    public ResponseEntity<RegisterResponse> placeOrder(@Valid @RequestBody OrderDto orderDto) {
        RegisterResponse registerResponse = orderService.placeOrder(orderDto);

        return new ResponseEntity<>(registerResponse, HttpStatus.CREATED);
    }

}