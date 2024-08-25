package ABC.restaurant.service;

import ABC.restaurant.Response.RegisterResponse;
import ABC.restaurant.dto.ItemDto;
import ABC.restaurant.entity.ItemEntity;
import jakarta.validation.Valid;

import java.util.List;

public interface ItemService {
    RegisterResponse addItem(@Valid ItemDto itemDto);

    List<ItemEntity> getAllItems();
}
