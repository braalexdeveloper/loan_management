package sisPrestamo.Brayan.modules.auth;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sisPrestamo.Brayan.modules.auth.dtos.LoginRequest;
import sisPrestamo.Brayan.modules.auth.dtos.LoginResponse;
import sisPrestamo.Brayan.modules.auth.dtos.RegisterRequest;
import sisPrestamo.Brayan.modules.auth.dtos.RegisterResponse;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService){
        this.authService=authService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request){
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@Valid @RequestBody RegisterRequest request){
        return ResponseEntity.ok(authService.register(request));

    }
}
