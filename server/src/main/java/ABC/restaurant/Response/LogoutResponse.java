package ABC.restaurant.Response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor(staticName = "build")
public class LogoutResponse {
    private String message;
}
