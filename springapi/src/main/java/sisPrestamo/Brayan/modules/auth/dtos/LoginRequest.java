package sisPrestamo.Brayan.modules.auth.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LoginRequest {

    @NotBlank(message = "El email es necesario")
    private String email;

    @NotBlank(message = "La clave es necesario")
    private String password;
}
