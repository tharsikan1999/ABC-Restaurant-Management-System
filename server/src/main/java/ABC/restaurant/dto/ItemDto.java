package ABC.restaurant.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor(staticName = "build")
@NoArgsConstructor
public class ItemDto {

    @NotBlank(message = "Name cannot be null or empty")
    @Size(min = 3, max = 50, message = "Name must be between 3 and 50 characters")
    private String name;

    @NotBlank(message = "Email cannot be null or empty")
    private String price;

    private Boolean  isAvailable;

    @NotNull(message = "User Id cannot be null or empty")
    private Long userId;

}
