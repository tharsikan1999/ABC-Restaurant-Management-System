package ABC.restaurant.service;

import ABC.restaurant.dto.UserDto;
import ABC.restaurant.dto.UserLoginDto;
import ABC.restaurant.exception.UserNotFoundException;
import jakarta.validation.Valid;

public interface UserService {
    String addUser(UserDto userDto);

    String loginUser(UserLoginDto userLoginDto) throws UserNotFoundException;
}
