package ABC.restaurant.controller;

import ABC.restaurant.Response.RegisterResponse;
import ABC.restaurant.dto.OrderDto;
import ABC.restaurant.entity.ItemEntity;
import ABC.restaurant.entity.OrderEntity;
import ABC.restaurant.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/getAllOrders")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'STAFF')")
    public List<OrderEntity> getAllOrders() {
        System.out.println("Get all orders" + orderService.getAllOrders());
        return orderService.getAllOrders();
    }

    @GetMapping("/getOrdersByUserId/{userId}")
    @PreAuthorize("hasAnyAuthority('USER' )")
    public List<OrderEntity> getOrdersByUserId(@PathVariable long userId) {
        return orderService.findByUserId(userId);
    }

}
