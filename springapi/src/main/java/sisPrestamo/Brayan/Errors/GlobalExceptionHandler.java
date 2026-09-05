package sisPrestamo.Brayan.Errors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
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

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidationErrors(MethodArgumentNotValidException ex){
        Map<String,Object> errors=new HashMap<>();

        for(FieldError error: ex.getBindingResult().getFieldErrors()){
            errors.put(error.getField(),error.getDefaultMessage());
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                Map.of("errorName","ErrorValidation","errors",errors)
        );
    }
//Si la fecha no tiene el formato Y-M-D
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<?> handleJsonError(HttpMessageNotReadableException ex) {

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                Map.of(
                        "status", 400,
                        "message", "La fecha debe tener el formato yyyy-MM-dd"
                )
        );
    }
}
