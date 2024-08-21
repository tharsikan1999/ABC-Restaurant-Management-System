package ABC.restaurant.controller;

import ABC.restaurant.dto.UserDto;
import ABC.restaurant.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class UserController {
    @Autowired
    UserService userService;

    @PostMapping("/register/user")
    public ResponseEntity<String> addUser(@Valid @RequestBody UserDto userDto){
        return new ResponseEntity(userService.addUser(userDto), HttpStatus.CREATED);
    }
}
