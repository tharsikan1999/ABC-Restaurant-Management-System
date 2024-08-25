package ABC.restaurant.controller;

import ABC.restaurant.Response.JwtResponse;
import ABC.restaurant.Response.LoginResponse;
import ABC.restaurant.Response.LogoutResponse;
import ABC.restaurant.Response.RegisterResponse;
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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<RegisterResponse> addUser(@Valid @RequestBody UserDto userDto) {
        RegisterResponse registerResponse = userService.addUser(userDto);

        if ("User already exists".equals(registerResponse.getMessage())) {

            return new ResponseEntity<>(registerResponse, HttpStatus.CONFLICT);
        }

        return new ResponseEntity<>(registerResponse, HttpStatus.CREATED);
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
                            userInfo.getId(),
                            userInfo.getPhone()
                    );

                    return JwtResponse.builder()
                            .message("Refresh Token Generated Successfully")
                            .accessToken(accessToken)
                            .refreshToken(refreshTokenDto.getToken())
                            .build();
                }).orElseThrow(() -> new TokenExpireException("Token Expired"));


        return ResponseEntity.ok(jwtResponse);
    }

    @PostMapping("/addStaff")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<RegisterResponse> addStaff(@Valid @RequestBody UserDto userDto) {
        RegisterResponse registerResponse = userService.addStaff(userDto);

        if ("User already exists".equals(registerResponse.getMessage())) {

            return new ResponseEntity<>(registerResponse, HttpStatus.CONFLICT);
        }

        return new ResponseEntity<>(registerResponse, HttpStatus.CREATED);
    }


    @GetMapping("/getStaff")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> getStaff() {
        return ResponseEntity.ok(userService.getStaff());
    }

}
