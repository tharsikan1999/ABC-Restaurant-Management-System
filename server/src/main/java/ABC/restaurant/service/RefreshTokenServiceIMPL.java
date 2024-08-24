package ABC.restaurant.service;

import ABC.restaurant.entity.RefreshToken;
import ABC.restaurant.exception.InvalidTokenException;
import ABC.restaurant.repo.RefreshTokenRepo;
import ABC.restaurant.repo.UserRepo;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
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
    public RefreshToken createRefreshToken(String userEmail, Long userId, HttpServletResponse response) {

        Optional<RefreshToken> existingToken = refreshTokenRepo.findByUserId(userId);

        existingToken.ifPresent(token -> refreshTokenRepo.deleteByToken(token.getToken()));

        RefreshToken refreshToken = RefreshToken.builder()
                .token(UUID.randomUUID().toString())
                .expiryDate(Instant.now().plusSeconds(7 * 24 * 60 * 60)) // 7 days
                .user(userRepo.findByEmail(userEmail).orElseThrow(() -> new RuntimeException("User not found")))
                .build();

        String refreshTokenString = refreshToken.getToken();

        Cookie cookie = new Cookie("authToken", refreshTokenString);
        cookie.setHttpOnly(false);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setMaxAge(30 * 24 * 60 * 7); // 7 days

        response.addCookie(cookie);

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
