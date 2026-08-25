package sisPrestamo.Brayan.Errors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<?> handleNotFound(ResourceNotFoundException ex){
     return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
             "status",404,
             "message",ex.getMessage()
     ));
    }

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<?> handleBusinnesError(BusinessException ex){
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of(
        "status",400,
        "message",ex.getMessage()
      ));
    }
}
