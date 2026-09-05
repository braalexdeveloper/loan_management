package sisPrestamo.Brayan.modules.auth.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.net.http.HttpRequest;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;

    public JwtAuthenticationFilter(
            JwtService jwtService,
            CustomUserDetailsService userDetailsService
    ) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException{
        String authHeader=request.getHeader("Authorization");

        if(authHeader == null || !authHeader.startsWith("Bearer ")){
            System.out.println("NO HAY TOKEN");
         filterChain.doFilter(request,response);
         return;
        }

        String token=authHeader.substring(7);
        System.out.println("TOKEN RECIBIDO");

        String email = jwtService.extractUsername(token);

        UserDetails userDetails=userDetailsService.loadUserByUsername(email);
        if (jwtService.isTokenValid(token, userDetails)) {

            System.out.println("TOKEN VALIDO");

            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );

            authentication.setDetails(
                    new WebAuthenticationDetailsSource()
                            .buildDetails(request)
            );

            SecurityContextHolder
                    .getContext()
                    .setAuthentication(authentication);

            System.out.println("AUTHENTICATION CREADA");

        } else {

            System.out.println("TOKEN INVALIDO");
        }

        filterChain.doFilter(request, response);
    }
}
