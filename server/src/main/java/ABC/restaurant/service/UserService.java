package ABC.restaurant.service;

import ABC.restaurant.Response.LoginResponse;
import ABC.restaurant.dto.UserDto;
import ABC.restaurant.dto.UserLoginDto;
import ABC.restaurant.exception.UserNotFoundException;
import jakarta.validation.Valid;

public interface UserService {
    String addUser(UserDto userDto);

    LoginResponse loginUser(UserLoginDto userLoginDto) throws UserNotFoundException;
}
