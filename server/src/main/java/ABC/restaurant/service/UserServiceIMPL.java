package ABC.restaurant.service;

import org.springframework.web.server.ResponseStatusException;
import ABC.restaurant.dto.UserDto;
import ABC.restaurant.entity.UserEntity;
import ABC.restaurant.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.util.Optional;
import org.springframework.http.HttpStatus;

@Service
public class UserServiceIMPL implements UserService {

    @Autowired
    private UserRepo userRepo;

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
}
