package sisPrestamo.Brayan.modules.loans;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sisPrestamo.Brayan.Errors.ResourceNotFoundException;
import sisPrestamo.Brayan.modules.clients.Client;
import sisPrestamo.Brayan.modules.clients.ClientRepository;
import sisPrestamo.Brayan.modules.loans.dtos.LoanDetailDto;
import sisPrestamo.Brayan.modules.loans.dtos.LoanRequest;
import sisPrestamo.Brayan.modules.loans.dtos.LoanResponse;
import sisPrestamo.Brayan.modules.payments.dtos.PaymentResponse;

@Service
public class LoanService {
    private final LoanRepository loanRepository;
    private final ClientRepository clientRepository;

    public LoanService(LoanRepository loanRepository, ClientRepository clientRepository) {
        this.loanRepository = loanRepository;
        this.clientRepository = clientRepository;
    }


    public Page<LoanResponse> getLoans(int page, int size, String sortBy, String dni) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, sortBy));
        Page<Loan> loans;
        if (!dni.isEmpty() && dni != null) {
            loans = loanRepository.findByClientDni(dni, pageable);
        } else {
            loans = loanRepository.findAll(pageable);
        }

        return loans.map(this::convertToLoanResponse);
    }

    @Transactional(readOnly = true)
    public LoanDetailDto getLoanByID(Long id){
       Loan loanFound=loanRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Prestamo no encontrado"));

       LoanDetailDto loanDetail=new LoanDetailDto();
       loanDetail.setId(loanFound.getId());
        loanDetail.setAmount(loanFound.getAmount());
        loanDetail.setTotalLoan(loanFound.getTotalLoan());
        loanDetail.setInterestRate(loanFound.getInterestRate());
        loanDetail.setInstallments(loanFound.getInstallments());
        loanDetail.setInstallmentAmount(loanFound.getInstallmentAmount());
        loanDetail.setRemainingBalance(loanFound.getRemainingBalance());
        loanDetail.setPaidInstallments(loanFound.getPaidInstallments());
        loanDetail.setStartDate(loanFound.getStartDate());
        loanDetail.setEndDate(loanFound.getEndDate());
        loanDetail.setStatus(loanFound.getStatus());
        loanDetail.setClientName(loanFound.getClient().getName() + " "+loanFound.getClient().getLastName());

       Set<PaymentResponse> paymentsSet=loanFound.getPayments().stream().map((el)->{
         PaymentResponse payment=new PaymentResponse();
         payment.setId(el.getId());
         payment.setAmount(el.getAmount());
         payment.setNumberPayment(el.getNumberInstallment());
         payment.setMethodPayment(el.getMethodPayment());
         payment.setPaymentDate(el.getPaymentDate());
         payment.setImagePayment(el.getImagePayment());
         payment.setIdLoan(el.getLoan().getId());
         return payment;
       }).collect(Collectors.toSet());

       loanDetail.setPayments(paymentsSet);
       return loanDetail;
    }

    public LoanResponse createLoan(LoanRequest request) {

        Client clientFound = clientRepository.findById(request.getClientId())
                .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado"));

        Loan loan = convertToLoan(new Loan(), request, clientFound);

        Loan newLoan = loanRepository.save(loan);

        return convertToLoanResponse(newLoan);
    }

    private LoanResponse convertToLoanResponse(Loan loan) {
        LoanResponse response = new LoanResponse();
        response.setId(loan.getId());
        response.setAmount(loan.getAmount());
        response.setTotalLoan(loan.getTotalLoan());
        response.setInterestRate(loan.getInterestRate());
        response.setInstallments(loan.getInstallments());
        response.setInstallmentAmount(loan.getInstallmentAmount());
        response.setRemainingBalance(loan.getRemainingBalance());
        response.setPaidInstallments(loan.getPaidInstallments());
        response.setStartDate(loan.getStartDate());
        response.setEndDate(loan.getEndDate());
        response.setStatus(loan.getStatus());
        response.setClientName(loan.getClient().getName() + " "+loan.getClient().getLastName());
        
        return response;
    }

    private Loan convertToLoan(Loan loan, LoanRequest request, Client client) {
        loan.setAmount(request.getAmount());
        loan.setInterestRate(request.getInterestRate());
        loan.setInstallments(request.getInstallments());

        BigDecimal totalLoan = request.getAmount()
                .add(
                        request.getAmount()
                                .multiply(request.getInterestRate())
                                .divide(BigDecimal.valueOf(100)));
        loan.setTotalLoan(totalLoan);

        BigDecimal installmentAmount = totalLoan
                .divide(BigDecimal.valueOf(request.getInstallments()), 2, RoundingMode.HALF_UP);

        loan.setInstallmentAmount(installmentAmount);
        loan.setRemainingBalance(totalLoan);
        loan.setPaidInstallments(0);
        loan.setStartDate(request.getStartDate());
        loan.setEndDate(
                LocalDate.now().plusMonths(request.getInstallments()));
        loan.setStatus(LoanStatus.PENDING);
        loan.setClient(client);
        return loan;
    }
}
