package ABC.restaurant.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor(staticName = "build")
@NoArgsConstructor
public class UserDto {

        @NotBlank(message = "Name cannot be null or empty")
        @Size(min = 3, max = 50, message = "Name must be between 3 and 50 characters")
        private String name;

        @NotBlank(message = "Email cannot be null or empty")
        @Email(message = "Email should be valid")
        private String email;

        @Column(name = "phone", nullable = false)
        @NotBlank(message = "Phone cannot be null or empty")
        @Pattern(regexp = "\\d{10}", message = "Phone number must be 10 digits")
        private String phone;

        @NotBlank(message = "Password cannot be null or empty")
        @Size(min = 6, max = 50, message = "Password must be between 6 and 50 characters")
        private String password;

}
