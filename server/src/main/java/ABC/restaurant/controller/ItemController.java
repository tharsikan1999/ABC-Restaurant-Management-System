package ABC.restaurant.controller;

import ABC.restaurant.Response.RegisterResponse;
import ABC.restaurant.dto.ItemDto;
import ABC.restaurant.entity.ItemEntity;
import ABC.restaurant.repo.ItemRepo;
import ABC.restaurant.service.ItemService;
import jakarta.validation.Valid;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/item")
public class ItemController {

    @Autowired
    ItemService itemService;


    @PostMapping("/addItem")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'STAFF')")
    public ResponseEntity<RegisterResponse> addItem(@Valid @RequestBody ItemDto itemDto) {
        RegisterResponse registerResponse = itemService.addItem(itemDto);
        return new ResponseEntity<>(registerResponse, HttpStatus.CREATED);
    }


    @GetMapping("/getItems/{userId}")
    public ResponseEntity<?> getItems(@PathVariable Long userId) {
        return ResponseEntity.ok(itemService.getItems(userId));
    }
}
