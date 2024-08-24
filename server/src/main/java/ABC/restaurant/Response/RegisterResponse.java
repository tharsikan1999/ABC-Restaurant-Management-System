package ABC.restaurant.Response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor(staticName = "build")
public class  RegisterResponse {
    private String message;
}
