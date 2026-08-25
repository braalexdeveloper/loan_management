package sisPrestamo.Brayan.modules.loans.dtos;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import sisPrestamo.Brayan.modules.loans.LoanStatus;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class LoanResponse {

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
    
}
