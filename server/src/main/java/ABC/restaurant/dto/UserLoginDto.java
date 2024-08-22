package ABC.restaurant.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor(staticName = "build")
@NoArgsConstructor
public class UserLoginDto {

    @NotBlank(message = "Email cannot be null or empty")
    @Email(message = "Email should be valid")
    private String email;

    @NotBlank(message = "Password cannot be null or empty")
    @Size(min = 6, max = 50, message = "Password must be between 6 and 50 characters")
    private String password;

}
