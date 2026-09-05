package sisPrestamo.Brayan.modules.auth;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import sisPrestamo.Brayan.Errors.ResourceNotFoundException;
import sisPrestamo.Brayan.modules.auth.dtos.LoginRequest;
import sisPrestamo.Brayan.modules.auth.dtos.LoginResponse;
import sisPrestamo.Brayan.modules.auth.dtos.RegisterRequest;
import sisPrestamo.Brayan.modules.auth.dtos.RegisterResponse;
import sisPrestamo.Brayan.modules.auth.security.JwtService;
import sisPrestamo.Brayan.modules.roles.Role;
import sisPrestamo.Brayan.modules.roles.RoleRepository;
import sisPrestamo.Brayan.modules.users.User;
import sisPrestamo.Brayan.modules.users.UserRepository;

@Service
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(
            AuthenticationManager authenticationManager,
            JwtService jwtService,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            RoleRepository roleRepository
    ) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.userRepository=userRepository;
        this.passwordEncoder=passwordEncoder;
        this.roleRepository=roleRepository;
    }

    public LoginResponse login(LoginRequest request){
        Authentication authentication=authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        User user=(User) authentication.getPrincipal();
        String token=jwtService.generateToken(user);

        return new LoginResponse(token,user.getEmail(),user.getRole().getName());
    }

    public RegisterResponse register(RegisterRequest request){
        Role role=roleRepository.findByName("User").orElseThrow(()->new ResourceNotFoundException("Rol no encontrado"));
        User user=new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(role);

        User userSaved=userRepository.save(user);
        String token=jwtService.generateToken(userSaved);

        return new RegisterResponse(userSaved.getEmail(),userSaved.getRole().getName(),token);
    }
}
