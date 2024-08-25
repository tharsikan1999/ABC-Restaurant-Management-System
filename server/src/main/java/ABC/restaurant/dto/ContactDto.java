package ABC.restaurant.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor(staticName = "build")
@NoArgsConstructor
public class ContactDto {

    @NotBlank(message = "Name cannot be null or empty")
    @Size(min = 3, max = 50, message = "Name must be between 3 and 50 characters")
    private String name;

    @NotBlank(message = "Email cannot be null or empty")
    @Email(message = "Email should be valid")
    private String email;

    @NotBlank(message = "subject cannot be null or empty")
    @Size(min = 3, max = 150, message = "subject must be between 3 and 150 characters")
    private String subject;

    @NotBlank(message = "message cannot be null or empty")
    @Size(min = 3, max = 1000, message = "message must be between 3 and 1000 characters")
    private String message;

}
