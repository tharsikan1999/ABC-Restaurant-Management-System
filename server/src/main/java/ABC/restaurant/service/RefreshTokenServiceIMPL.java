package ABC.restaurant.service;

import ABC.restaurant.entity.RefreshToken;
import ABC.restaurant.repo.RefreshTokenRepo;
import ABC.restaurant.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
public class RefreshTokenServiceIMPL implements RefreshTokenService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private RefreshTokenRepo refreshTokenRepo;

    @Override
    public RefreshToken createRefreshToken(String userEmail) {
        RefreshToken refreshToken = RefreshToken.builder()
                .userInfo(userRepo.findByEmail(userEmail).get())
                .token(UUID.randomUUID().toString())
                .expiryDate(Instant.now().plusMillis(600000))//10
                .build();
        return refreshTokenRepo.save(refreshToken);
    }
}
