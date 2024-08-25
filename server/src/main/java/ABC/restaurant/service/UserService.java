package ABC.restaurant.service;

import ABC.restaurant.Response.LoginResponse;
import ABC.restaurant.Response.RegisterResponse;
import ABC.restaurant.dto.UserDto;
import ABC.restaurant.dto.UserLoginDto;
import ABC.restaurant.exception.UserNotFoundException;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

public interface UserService {
    RegisterResponse addUser(UserDto userDto);

    LoginResponse loginUser(UserLoginDto userLoginDto, HttpServletResponse response) throws UserNotFoundException;

    void logoutUser(HttpServletResponse response);

    RegisterResponse addStaff(@Valid UserDto userDto);

    Object getStaff();
}
