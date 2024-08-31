package ABC.restaurant.controller;

import ABC.restaurant.Response.RegisterResponse;
import ABC.restaurant.dto.ItemDto;
import ABC.restaurant.entity.ItemEntity;
import ABC.restaurant.repo.ItemRepo;
import ABC.restaurant.service.ItemService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.Valid;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/item")
public class ItemController {

    @Autowired
    ItemService itemService;



    @PostMapping("/addItem")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'STAFF')")
    public ResponseEntity<RegisterResponse> addItem(
            @RequestParam("item") String itemDtoJson,
            @RequestParam("image") MultipartFile file) throws IOException {

        ObjectMapper objectMapper = new ObjectMapper();
        ItemDto itemDto = objectMapper.readValue(itemDtoJson, ItemDto.class);

        String uploadImagePath = itemService.uploadImage(file);

        RegisterResponse registerResponse = itemService.addItem(itemDto, uploadImagePath);

        return new ResponseEntity<>(registerResponse, HttpStatus.CREATED);
    }


    @GetMapping("/getAllItems")
    public List<ItemEntity> getAllItems() {
        System.out.println("Get all items" + itemService.getAllItems());
        return itemService.getAllItems();
    }

    @GetMapping("/getItemsByUserId/{userId}")
    @PreAuthorize("hasAnyAuthority('USER' )")
    public List<ItemEntity> getItemsByUserId(@PathVariable long userId) {
        return itemService.findByUserId(userId);
    }


}
