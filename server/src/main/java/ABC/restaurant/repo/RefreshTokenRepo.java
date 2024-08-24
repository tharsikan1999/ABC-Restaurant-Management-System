package ABC.restaurant.repo;

import ABC.restaurant.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepo extends JpaRepository<RefreshToken, Long> {

    Optional<RefreshToken> findByToken(String token);
    Optional <RefreshToken> findByUserId(Long id);
    void  deleteByToken(String token);

}
