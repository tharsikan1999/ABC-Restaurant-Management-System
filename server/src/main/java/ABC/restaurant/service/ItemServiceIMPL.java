package ABC.restaurant.service;

import ABC.restaurant.Response.RegisterResponse;
import ABC.restaurant.dto.ItemDto;
import ABC.restaurant.entity.ItemEntity;
import ABC.restaurant.entity.UserEntity;
import ABC.restaurant.repo.ItemRepo;
import ABC.restaurant.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemServiceIMPL implements  ItemService{
    @Autowired
    ItemRepo itemRepo;

    @Autowired
    UserRepo userRepo;

    @Override
    public RegisterResponse addItem(ItemDto itemDto) {
        UserEntity userEntity = userRepo.findById(itemDto.getUserId().longValue());
        ItemEntity itemEntity = ItemEntity.build(
                0L,
                itemDto.getName(),
                itemDto.getPrice(),
                itemDto.getIsAvailable(),
                userEntity

        );
        itemRepo.save(itemEntity);
        return RegisterResponse.build("Item added successfully");
    }

    @Override
    public Object getItems(Long userId) {
        System.out.println("userId: "+userId);
        List<ItemEntity> itemEntities = itemRepo.findByUser_Id(userId);
        System.out.println("itemEntities: "+itemEntities);
        return itemEntities;
    }


}