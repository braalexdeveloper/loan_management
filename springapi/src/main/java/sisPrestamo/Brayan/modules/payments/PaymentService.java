package sisPrestamo.Brayan.modules.payments;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import java.nio.file.Path;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import sisPrestamo.Brayan.Errors.BusinessException;
import sisPrestamo.Brayan.Errors.ResourceNotFoundException;
import sisPrestamo.Brayan.modules.loans.Loan;
import sisPrestamo.Brayan.modules.loans.LoanRepository;
import sisPrestamo.Brayan.modules.loans.LoanStatus;
import sisPrestamo.Brayan.modules.payments.dtos.PaymentRequest;
import sisPrestamo.Brayan.modules.payments.dtos.PaymentResponse;

@Service
public class PaymentService {
    private final PaymentRepository paymentRepository;
    private final LoanRepository loanRepository;
    private static final String UPLOAD_DIR = "uploads/payments/";

    public PaymentService(PaymentRepository paymentRepository, LoanRepository loanRepository) {
        this.paymentRepository = paymentRepository;
        this.loanRepository = loanRepository;
    }

    public List<PaymentResponse> getPayments() {
        return paymentRepository.findAll().stream().map(this::convertToPaymentResponse).toList();
    }

    @Transactional
    public PaymentResponse createPayment(PaymentRequest request) {
        Loan loanFound = loanRepository.findById(request.getLoanId())
                .orElseThrow(() -> new ResourceNotFoundException("Prestamo no encontrado"));

        if (loanFound.getInstallments().equals(loanFound.getPaidInstallments())) {
            throw new BusinessException("El prestamo ya esta cancelado");
        }

        Payment createdPayment = paymentRepository.save(convertToPayment(new Payment(), request, loanFound));

        BigDecimal newRemainingBalance = loanFound.getRemainingBalance().subtract(createdPayment.getAmount());

        loanFound.setRemainingBalance(newRemainingBalance);
        loanFound.setPaidInstallments(loanFound.getPaidInstallments() + 1);
        if (loanFound.getRemainingBalance().compareTo(BigDecimal.ZERO) == 0) {
            loanFound.setStatus(LoanStatus.PAGADO);
        }

        loanRepository.save(loanFound);

        return convertToPaymentResponse(createdPayment);
    }

    public String deletePayment(Long id) {

        Payment paymentFound = paymentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pago no encontrado"));

        paymentRepository.deleteById(id);
        if (paymentFound.getImagePayment() != null && !paymentFound.getImagePayment().isEmpty()) {
            deleteImage(paymentFound.getImagePayment());
        }

        return "Pago eliminado";
    }

    private Payment convertToPayment(Payment payment, PaymentRequest request, Loan loan) {
        payment.setAmount(loan.getInstallmentAmount());
        payment.setNumberInstallment(loan.getPaidInstallments() + 1);
        payment.setPaymentDate(request.getPaymentDate());
        payment.setMethodPayment(request.getMethodPayment());
        if (request.getImagePayment() != null && !request.getImagePayment().isEmpty()) {
            payment.setImagePayment(saveImage(request.getImagePayment()));
        }

        payment.setLoan(loan);

        return payment;

    }

    private PaymentResponse convertToPaymentResponse(Payment payment) {
        PaymentResponse response = new PaymentResponse();
        response.setId(payment.getId());
        response.setAmount(payment.getAmount());
        response.setNumberPayment(payment.getNumberInstallment());
        response.setPaymentDate(payment.getPaymentDate());
        response.setMethodPayment(payment.getMethodPayment());
        response.setImagePayment(payment.getImagePayment());
        response.setIdLoan(payment.getLoan().getId());
        return response;
    }

    private String saveImage(MultipartFile imageFile) {
        try {
            String imageName = System.currentTimeMillis() + "_" + imageFile.getOriginalFilename();
            Path uploadPath = Paths.get(UPLOAD_DIR);
            Files.createDirectories(uploadPath);
            Path imagePath = uploadPath.resolve(imageName);
            Files.write(imagePath, imageFile.getBytes());
            return imageName;
        } catch (IOException e) {
            throw new RuntimeException("Error al guardar comprobante de pago", e);
        }

    }

    private void deleteImage(String image) {
        try {
            Path path = Paths.get(UPLOAD_DIR + image);

            if (Files.exists(path)) {
                Files.delete(path);
                System.out.println("Imagen eliminado " + path.toString());
            } else {
                System.out.println("Imagen no existe " + path.toString());
            }

        } catch (IOException e) {
            throw new RuntimeException("Error al eliminar comprobante de pago", e);
        }
    }
}

/*
 * {
 * "amount": 250.00,
 * "paymentDate": "2026-08-23T15:30:00",
 * "methodPayment": "YAPE",
 * "loanId": 10
 * }
 */