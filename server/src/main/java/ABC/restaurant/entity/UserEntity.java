package ABC.restaurant.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user")
@Data
@AllArgsConstructor(staticName = "build")
@NoArgsConstructor
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    @Size(min = 3, max = 50, message = "Name must be between 3 and 50 characters")
    @NotNull (message = "Name cannot be null or empty")
    private String name;

    @Column(name = "email", nullable = false, unique = true)
    @NotNull(message = "Email cannot be null or empty")
    @Email(message = "Email should be valid")
    private String email;

    @Column(name = "phone", nullable = false)
    @NotBlank(message = "Phone cannot be null or empty")
    @Pattern(regexp = "\\d{10}", message = "Phone number must be 10 digits")
    private String phone;

    @Column(name = "password", nullable = false)
    @NotNull(message = "Password cannot be null or empty")
    @JsonIgnore
    private String password;

    @Column(name = "role", nullable = false)

    private String role;
}
