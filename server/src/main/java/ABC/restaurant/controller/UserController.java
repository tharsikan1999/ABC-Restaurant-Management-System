package ABC.restaurant.controller;

import ABC.restaurant.Response.JwtResponse;
import ABC.restaurant.Response.LoginResponse;
import ABC.restaurant.Response.LogoutResponse;
import ABC.restaurant.dto.RefreshTokenDto;
import ABC.restaurant.dto.UserDto;
import ABC.restaurant.dto.UserLoginDto;
import ABC.restaurant.entity.RefreshToken;
import ABC.restaurant.exception.TokenExpireException;
import ABC.restaurant.exception.UserNotFoundException;
import ABC.restaurant.service.JwtService;
import ABC.restaurant.service.RefreshTokenService;
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

    @Autowired
    JwtService jwtService;
    @Autowired
    RefreshTokenService refreshTokenService;

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

    @PostMapping("/refreshToken")
    public ResponseEntity<JwtResponse> refreshToken(@RequestBody RefreshTokenDto refreshTokenDto) throws TokenExpireException {
        JwtResponse jwtResponse = refreshTokenService.findByToken(refreshTokenDto.getToken())
                .map(refreshTokenService::verifyExpiration)
                .map(RefreshToken::getUser)
                .map(userInfo -> {

                    String accessToken = jwtService.generateAccessToken(
                            userInfo.getName(),
                            userInfo.getEmail(),
                            userInfo.getRole(),
                            userInfo.getId()
                    );

                    return JwtResponse.builder()
                            .message("Refresh Token Generated Successfully")
                            .accessToken(accessToken)
                            .refreshToken(refreshTokenDto.getToken())
                            .build();
                }).orElseThrow(() -> new TokenExpireException("Token Expired"));


        return ResponseEntity.ok(jwtResponse);
    }






}
