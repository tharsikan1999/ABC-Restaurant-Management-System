package ABC.restaurant.service;

import ABC.restaurant.entity.RefreshToken;

public interface RefreshTokenService {
     RefreshToken createRefreshToken(String userEmail);
}
