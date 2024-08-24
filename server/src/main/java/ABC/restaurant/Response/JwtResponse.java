package ABC.restaurant.Response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor(staticName = "build")
@NoArgsConstructor
@Builder
public class JwtResponse {
    private String message;
    private String accessToken;
    private String refreshToken;
}
