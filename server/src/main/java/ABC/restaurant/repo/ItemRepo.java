package ABC.restaurant.repo;

import ABC.restaurant.entity.ItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepo extends JpaRepository<ItemEntity, Long> {
    ItemEntity findById(long id);
}
