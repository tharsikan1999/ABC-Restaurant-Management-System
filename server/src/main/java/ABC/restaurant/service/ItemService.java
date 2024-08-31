package ABC.restaurant.service;

import ABC.restaurant.Response.RegisterResponse;
import ABC.restaurant.dto.ItemDto;
import ABC.restaurant.entity.ItemEntity;
import jakarta.validation.Valid;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ItemService {
    RegisterResponse addItem(@Valid ItemDto itemDto,String imagePat);

    List<ItemEntity> getAllItems();

    String uploadImage(MultipartFile file) throws IOException;

    List<ItemEntity> findByUserId(long userId);
}
