package sisPrestamo.Brayan.modules.loans.dtos;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import sisPrestamo.Brayan.modules.loans.LoanStatus;
import sisPrestamo.Brayan.modules.payments.dtos.PaymentResponse;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Set;



@Getter
@Setter
@NoArgsConstructor
public class LoanDetailDto{
    private Long id;
    private BigDecimal amount;
    private BigDecimal totalLoan;
    private BigDecimal interestRate;
    private Integer installments;
    private BigDecimal installmentAmount;
    private BigDecimal remainingBalance;
    private Integer paidInstallments;
    private LocalDate startDate;
    private LocalDate endDate;
    private LoanStatus status;
    private String clientName;
    private Set<PaymentResponse> payments;
        
}
