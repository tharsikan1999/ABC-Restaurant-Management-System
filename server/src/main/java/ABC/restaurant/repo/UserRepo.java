package ABC.restaurant.repo;

import ABC.restaurant.Projection.UserWithoutPasswordProjection;
import ABC.restaurant.entity.UserEntity;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<UserEntity,Long> {

    Optional<UserEntity> findByEmail(String email);
    UserEntity findById(long id);

    @Query("SELECT u.id as id, u.name as name, u.email as email, u.phone as phone, u.role as role FROM UserEntity u WHERE u.role IN :roles")
    List<UserWithoutPasswordProjection> findAllByRoleIn(@Param("roles") List<String> roles);

}
