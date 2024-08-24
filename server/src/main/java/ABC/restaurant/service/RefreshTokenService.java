package ABC.restaurant.service;

import ABC.restaurant.Response.LoginResponse;
import ABC.restaurant.entity.RefreshToken;
import jakarta.servlet.http.HttpServletResponse;

import java.util.Optional;

public interface RefreshTokenService {

     RefreshToken createRefreshToken(String userEmail, Long userId,HttpServletResponse response);

     Optional<RefreshToken> findByToken(String token);

     RefreshToken verifyExpiration(RefreshToken token);
}
