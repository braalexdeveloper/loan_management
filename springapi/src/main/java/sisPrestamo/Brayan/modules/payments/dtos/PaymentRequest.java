package sisPrestamo.Brayan.modules.payments.dtos;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import sisPrestamo.Brayan.modules.payments.MethodPaymentEnum;

@Getter
@Setter
@NoArgsConstructor
public class PaymentRequest {
   
    @NotNull(message = "La fecha de pago es obligatoria")
    private LocalDateTime paymentDate;

    @NotNull(message = "El método de pago es obligatorio")
    private MethodPaymentEnum methodPayment;

    private MultipartFile imagePayment;

    @NotNull(message = "El préstamo es obligatorio")
    private Long loanId;
}
