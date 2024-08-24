package ABC.restaurant.service;

import ABC.restaurant.entity.RefreshToken;
import ABC.restaurant.entity.UserEntity;
import ABC.restaurant.exception.InvalidTokenException;
import ABC.restaurant.repo.RefreshTokenRepo;
import ABC.restaurant.repo.UserRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
public class RefreshTokenServiceIMPL implements RefreshTokenService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private RefreshTokenRepo refreshTokenRepo;

    @Override
    @Transactional
    public RefreshToken createRefreshToken(String userEmail, Long userId) {

        Optional<RefreshToken> existingToken = refreshTokenRepo.findByUserId(userId);

        existingToken.ifPresent(token -> refreshTokenRepo.deleteByToken(token.getToken()));

        RefreshToken refreshToken = RefreshToken.builder()
                .token(UUID.randomUUID().toString())
                .expiryDate(Instant.now().plusMillis(10_000))
                .user(userRepo.findByEmail(userEmail).orElseThrow(() -> new RuntimeException("User not found")))
                .build();

        return refreshTokenRepo.save(refreshToken);
    }

    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepo.findByToken(token);
    }

    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
            refreshTokenRepo.delete(token);
            throw new InvalidTokenException(token.getToken() + " Refresh token was expired. Please make a new signin request");
        }
        return token;
    }


}
