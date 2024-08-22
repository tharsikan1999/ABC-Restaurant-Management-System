package ABC.restaurant.service;

import ABC.restaurant.dto.UserLoginDto;
import ABC.restaurant.exception.InvalidCredentialsException;
import ABC.restaurant.exception.UserNotFoundException;
import ABC.restaurant.dto.UserDto;
import ABC.restaurant.entity.UserEntity;
import ABC.restaurant.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.util.Optional;

@Service
public class UserServiceIMPL implements UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private JwtService jwtService;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public String addUser(UserDto userDto) {

        Optional<UserEntity> existingUser = userRepo.findByEmail(userDto.getEmail());
        if (existingUser.isPresent()) {
            return  "User already exists";
        }

        UserEntity user = UserEntity.build(
                0L,
                userDto.getName(),
                userDto.getEmail(),
                passwordEncoder.encode(userDto.getPassword()),
                "USER"
        );

        userRepo.save(user);

        return "User Added";
    }

    @Override
    public String loginUser(UserLoginDto userLoginDto) throws UserNotFoundException {
        Optional<UserEntity> existingUser = userRepo.findByEmail(userLoginDto.getEmail());
        if (existingUser.isEmpty()) {
            throw new UserNotFoundException("User not found");
        }

        UserEntity user = existingUser.get();
        if (!passwordEncoder.matches(userLoginDto.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException();
        }

        String token = jwtService.generateToken(user.getName(), user.getEmail(), user.getRole());

        return "Login Successful";
    }
}
