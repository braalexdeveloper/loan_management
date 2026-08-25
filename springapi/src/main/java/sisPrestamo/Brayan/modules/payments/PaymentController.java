package sisPrestamo.Brayan.modules.payments;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import sisPrestamo.Brayan.modules.payments.dtos.PaymentRequest;
import sisPrestamo.Brayan.modules.payments.dtos.PaymentResponse;
import sisPrestamo.Brayan.shared.ResponseBuilder;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {
    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService){
this.paymentService=paymentService;
    }

    @GetMapping
    public ResponseEntity<Map<String,Object>> getPayments(){
        
        return ResponseEntity.ok(new ResponseBuilder().add("payments", paymentService.getPayments()).build());
    }

    @PostMapping
    public ResponseEntity<Map<String,Object>> createPayment(@Valid @ModelAttribute PaymentRequest payment){
         PaymentResponse paymentCreate=paymentService.createPayment(payment);
         return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseBuilder().msg("Pago creado correctamente").add("payment", paymentCreate).build());
    }
    
}
