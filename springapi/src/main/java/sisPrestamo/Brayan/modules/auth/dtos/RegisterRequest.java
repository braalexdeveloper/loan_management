package sisPrestamo.Brayan.modules.auth.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class RegisterRequest {
    @NotBlank(message = "Email es requerido")
    private String email;

    @NotBlank(message = "Password requerido")
    private String password;
}
