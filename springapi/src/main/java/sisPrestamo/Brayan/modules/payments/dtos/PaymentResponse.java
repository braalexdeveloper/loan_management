package sisPrestamo.Brayan.modules.payments.dtos;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import sisPrestamo.Brayan.modules.payments.MethodPaymentEnum;

@Getter
@Setter
@NoArgsConstructor
public class PaymentResponse {
    private Long id;
    private BigDecimal amount;
    private Integer numberPayment;
    private LocalDateTime paymentDate;
    private MethodPaymentEnum methodPayment;
    private String imagePayment;
    private Long idLoan;
}
