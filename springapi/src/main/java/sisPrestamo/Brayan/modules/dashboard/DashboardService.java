package sisPrestamo.Brayan.modules.dashboard;

import java.math.BigDecimal;

import org.springframework.stereotype.Service;

import sisPrestamo.Brayan.modules.clients.ClientRepository;
import sisPrestamo.Brayan.modules.dashboard.dtos.DashboardResponse;
import sisPrestamo.Brayan.modules.loans.LoanRepository;
import sisPrestamo.Brayan.modules.loans.LoanStatus;
import sisPrestamo.Brayan.modules.payments.PaymentRepository;

@Service
public class DashboardService {
    private final ClientRepository clientRepository;
    private final LoanRepository loanRepository;
    private final PaymentRepository paymentRepository;

    public DashboardService(ClientRepository clientRepository, LoanRepository loanRepository,
            PaymentRepository paymentRepository) {
        this.clientRepository = clientRepository;
        this.loanRepository = loanRepository;
        this.paymentRepository = paymentRepository;
    }

    public DashboardResponse getDashboard(){
        Long cantClients=clientRepository.count();
        Long cantLoans=loanRepository.count();
        Long cantLoansPayment=loanRepository.countByStatus(LoanStatus.PAGADO);
        Long cantLoansActive=loanRepository.countByStatus(LoanStatus.ACTIVO);

        BigDecimal totalAmountLoans=loanRepository.sumTotalAmount();
        BigDecimal totalSaldoGeneral=loanRepository.sumTotalRemainingBalance();
        BigDecimal totalAmountPayments=paymentRepository.sumTotalAmountPayments();

        DashboardResponse response=new DashboardResponse();
        response.setCantClients(cantClients);
        response.setCantLoans(cantLoans);
        response.setCantLoansActive(cantLoansActive);
        response.setCantLoansPayment(cantLoansPayment);
        response.setTotalLoansAmount(totalAmountLoans);
        response.setTotalLoansRemainingBalance(totalSaldoGeneral);
        response.setTotalPagadoGeneral(totalAmountPayments);
        return response;

    }

   
    
    
}
