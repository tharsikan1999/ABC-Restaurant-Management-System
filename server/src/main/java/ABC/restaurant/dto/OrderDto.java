package ABC.restaurant.dto;


import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor(staticName = "build")
@NoArgsConstructor
public class OrderDto {

    @NotNull(message = "Item Id cannot be null or empty")
    private Long itemId;

    @NotNull(message = "User Id cannot be null or empty")
    private Long userId;

    @NotNull(message = "Quantity cannot be null or empty")
    @Size(min = 3, max = 100, message = "Name must be between 3 and 100 characters")
    private String address;
}
