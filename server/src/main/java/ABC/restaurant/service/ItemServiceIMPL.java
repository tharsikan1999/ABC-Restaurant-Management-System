package ABC.restaurant.service;

import ABC.restaurant.Response.RegisterResponse;
import ABC.restaurant.dto.ItemDto;
import ABC.restaurant.entity.ItemEntity;
import ABC.restaurant.entity.UserEntity;
import ABC.restaurant.repo.ItemRepo;
import ABC.restaurant.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;
import java.io.IOException;

@Service
public class ItemServiceIMPL implements  ItemService{
    @Autowired
    ItemRepo itemRepo;



    @Autowired
    UserRepo userRepo;

    private final String FOLDER_PATH="/home/tharsikan/Desktop/ABC-Restaurant-Management-System/client/public/Images";

    @Override
    public RegisterResponse addItem(ItemDto itemDto,String imagePath) {
        UserEntity userEntity = userRepo.findById(itemDto.getUserId().longValue());
        ItemEntity itemEntity = ItemEntity.build(
                0L,
                itemDto.getName(),
                itemDto.getPrice(),
                imagePath,
                itemDto.getIsAvailable(),
                userEntity

        );
        itemRepo.save(itemEntity);
        return RegisterResponse.build("Item added successfully");
    }

    public List<ItemEntity> getAllItems() {
        return  itemRepo.findAll();
    }

    @Override
    public String uploadImage(MultipartFile file) throws IOException {
        String relativePath = "/Images/" + file.getOriginalFilename();
        String filePath = FOLDER_PATH + File.separator + file.getOriginalFilename();

        File fileToSave = new File(filePath);

        fileToSave.getParentFile().mkdirs();

        file.transferTo(fileToSave);

        return relativePath;
    }

    @Override
    public List<ItemEntity> findByUserId(long userId) {
        return itemRepo.findByUserId(userId);
    }


}