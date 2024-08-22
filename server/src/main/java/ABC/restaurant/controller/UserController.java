package ABC.restaurant.controller;

import ABC.restaurant.Response.LoginResponse;
import ABC.restaurant.Response.LogoutResponse;
import ABC.restaurant.dto.UserDto;
import ABC.restaurant.dto.UserLoginDto;
import ABC.restaurant.exception.UserNotFoundException;
import ABC.restaurant.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> addUser(@Valid @RequestBody UserDto userDto) {
        return new ResponseEntity<>(userService.addUser(userDto), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> loginUser(@Valid @RequestBody UserLoginDto userLoginDto, HttpServletResponse response) throws UserNotFoundException {
        LoginResponse loginResponse = userService.loginUser(userLoginDto, response);
        return new ResponseEntity<>(loginResponse, HttpStatus.OK);
    }

    @PostMapping("/logout")
    public ResponseEntity<LogoutResponse> logoutUser(HttpServletResponse response) {
        userService.logoutUser(response);
        LogoutResponse logoutResponse = LogoutResponse.build("User logged out");
        return new ResponseEntity<>(logoutResponse, HttpStatus.OK);
    }
}
