package ABC.restaurant.service;

import ABC.restaurant.Response.RegisterResponse;
import ABC.restaurant.dto.ItemDto;
import jakarta.validation.Valid;

public interface ItemService {
    RegisterResponse addItem(@Valid ItemDto itemDto);
}
