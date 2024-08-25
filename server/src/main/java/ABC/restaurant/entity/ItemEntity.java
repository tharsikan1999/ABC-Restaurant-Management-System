package ABC.restaurant.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "item")
@Data
@AllArgsConstructor(staticName = "build")
@NoArgsConstructor
public class ItemEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    @Size(min = 3, max = 50, message = "Name must be between 3 and 50 characters")
    @NotNull(message = "Name cannot be null or empty")
    private String name;

    @Column(name = "price", nullable = false)
    @NotBlank(message = "Price cannot be null or empty")
    private String price;

    @Column(name = "isAvailable", nullable = false)
    private Boolean isAvailable;

    // Many items belong to one user
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private UserEntity user;
}
