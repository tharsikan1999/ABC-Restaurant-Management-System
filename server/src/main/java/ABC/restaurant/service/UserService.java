package ABC.restaurant.service;

import ABC.restaurant.Response.LoginResponse;
import ABC.restaurant.dto.UserDto;
import ABC.restaurant.dto.UserLoginDto;
import ABC.restaurant.exception.UserNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public interface UserService {
    String addUser(UserDto userDto);

    LoginResponse loginUser(UserLoginDto userLoginDto, HttpServletResponse response) throws UserNotFoundException;

    void logoutUser(HttpServletResponse response);


}
