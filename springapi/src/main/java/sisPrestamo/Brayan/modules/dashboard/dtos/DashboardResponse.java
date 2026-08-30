package sisPrestamo.Brayan.modules.dashboard.dtos;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class DashboardResponse {
    private Long cantClients;
    private Long cantLoans;
    private Long cantLoansPayment;
    private Long cantLoansActive;
    private BigDecimal totalLoansAmount;
}
