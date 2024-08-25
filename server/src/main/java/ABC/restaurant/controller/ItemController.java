package ABC.restaurant.controller;

import ABC.restaurant.Response.RegisterResponse;
import ABC.restaurant.dto.ItemDto;
import ABC.restaurant.dto.UserDto;
import ABC.restaurant.service.ItemService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/item")
public class ItemController {

    @Autowired
    ItemService itemService;

    @PostMapping("/addItem")
    public ResponseEntity<RegisterResponse> addItem(@Valid @RequestBody ItemDto itemDto) {
        RegisterResponse registerResponse = itemService.addItem(itemDto);

        return new ResponseEntity<>(registerResponse, HttpStatus.CREATED);
    }
}
