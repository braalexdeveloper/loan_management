package sisPrestamo.Brayan.modules.clients.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ClientResponse {
    private Long id;
    private String name;
    private String lastName;
    private String dni;
    private String email;
    private String phone;
    private String address;
}
