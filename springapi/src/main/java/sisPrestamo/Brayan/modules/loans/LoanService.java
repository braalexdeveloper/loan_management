package sisPrestamo.Brayan.modules.loans;

import java.io.ByteArrayOutputStream;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lowagie.text.Cell;
import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Element;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Table;
import com.lowagie.text.pdf.PdfWriter;
import com.lowagie.text.alignment.HorizontalAlignment;

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

    
public byte[] generatePdfCronograma(Long id) {

        // 1. Buscar préstamo
        Loan loanFound = loanRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Préstamo no encontrado")
                );

        try {

            // 2. Crear memoria donde se almacenará el PDF
            ByteArrayOutputStream outputStream =
                    new ByteArrayOutputStream();

            // 3. Crear documento
            Document document = new Document();

            // 4. Asociar el documento con el OutputStream
            PdfWriter.getInstance(document, outputStream);

            // 5. Abrir documento
            document.open();


            // =====================================================
            // TÍTULO
            // =====================================================

            Font titleFont = FontFactory.getFont(
                    FontFactory.HELVETICA_BOLD,
                    18
            );

            Paragraph title = new Paragraph(
                    "CRONOGRAMA DE PAGOS",
                    titleFont
            );

            title.setAlignment(Element.ALIGN_CENTER);

            document.add(title);


            // Espacio
            document.add(new Paragraph(" "));


            // =====================================================
            // INFORMACIÓN DEL PRÉSTAMO
            // =====================================================

            Font normalFont = FontFactory.getFont(
                    FontFactory.HELVETICA,
                    11
            );

            Font boldFont = FontFactory.getFont(
                    FontFactory.HELVETICA_BOLD,
                    11
            );


            document.add(new Paragraph(
                    "Cliente: " +
                    loanFound.getClient().getName() + " "+loanFound.getClient().getLastName(),
                    normalFont
            ));

            document.add(new Paragraph(
                "Dni: "+loanFound.getClient().getDni(),
                normalFont
            ));

            document.add(new Paragraph(
                    "Monto del préstamo: S/ " +
                    loanFound.getAmount(),
                    normalFont
            ));

            document.add(new Paragraph(
                    "Tasa de interés: " +
                    loanFound.getInterestRate() +
                    "%",
                    normalFont
            ));

            document.add(new Paragraph(
                    "Total del préstamo: S/ " +
                    loanFound.getTotalLoan(),
                    normalFont
            ));

            document.add(new Paragraph(
                    "Número de cuotas: " +
                    loanFound.getInstallments(),
                    normalFont
            ));

            document.add(new Paragraph(
                    "Cuota mensual: S/ " +
                    loanFound.getInstallmentAmount(),
                    normalFont
            ));

            document.add(new Paragraph(
                    "Fecha de inicio: " +
                    loanFound.getStartDate(),
                    normalFont
            ));


            // Espacio
            document.add(new Paragraph(" "));


            // =====================================================
            // TABLA DEL CRONOGRAMA
            // =====================================================

            Table table = new Table(4);

            table.setWidth(100);


            // Encabezados

            Cell header1 = new Cell(
                    new Paragraph("Cuota", boldFont)
            );

            Cell header2 = new Cell(
                    new Paragraph("Fecha de vencimiento", boldFont)
            );

            Cell header3 = new Cell(
                    new Paragraph("Monto", boldFont)
            );

            Cell header4 = new Cell(
                    new Paragraph("Estado", boldFont)
            );


            header1.setHorizontalAlignment(HorizontalAlignment.CENTER);
            header2.setHorizontalAlignment(HorizontalAlignment.CENTER);
            header3.setHorizontalAlignment(HorizontalAlignment.CENTER);
            header4.setHorizontalAlignment(HorizontalAlignment.CENTER);


            table.addCell(header1);
            table.addCell(header2);
            table.addCell(header3);
            table.addCell(header4);


            // =====================================================
            // GENERAR CUOTAS
            // =====================================================

            LocalDate dueDate = loanFound.getStartDate();

            DateTimeFormatter formatter =
                    DateTimeFormatter.ofPattern("dd/MM/yyyy");


            for (
                    int installment = 1;
                    installment <= loanFound.getInstallments();
                    installment++
            ) {

                // Primera cuota = un mes después
                dueDate = dueDate.plusMonths(1);


                // ---------------------------------------------
                // Número de cuota
                // ---------------------------------------------

                Cell installmentCell = new Cell(
                        new Paragraph(
                                String.valueOf(installment),
                                normalFont
                        )
                );

                installmentCell.setHorizontalAlignment(
                        HorizontalAlignment.CENTER
                );


                // ---------------------------------------------
                // Fecha
                // ---------------------------------------------

                Cell dateCell = new Cell(
                        new Paragraph(
                                dueDate.format(formatter),
                                normalFont
                        )
                );

                dateCell.setHorizontalAlignment(
                        HorizontalAlignment.CENTER
                );


                // ---------------------------------------------
                // Monto
                // ---------------------------------------------

                Cell amountCell = new Cell(
                        new Paragraph(
                                "S/ " +
                                loanFound.getInstallmentAmount(),
                                normalFont
                        )
                );

                amountCell.setHorizontalAlignment(
                        HorizontalAlignment.RIGHT
                );


                // ---------------------------------------------
                // Estado
                // ---------------------------------------------

                String status =
                        installment <= loanFound.getPaidInstallments()
                                ? "Pagado"
                                : "Pendiente";


                Cell statusCell = new Cell(
                        new Paragraph(
                                status,
                                normalFont
                        )
                );

                statusCell.setHorizontalAlignment(
                        HorizontalAlignment.CENTER
                );


                // Agregar fila

                table.addCell(installmentCell);
                table.addCell(dateCell);
                table.addCell(amountCell);
                table.addCell(statusCell);
            }


            // Agregar tabla al documento

            document.add(table);


            // =====================================================
            // CERRAR DOCUMENTO
            // =====================================================

            document.close();


            // =====================================================
            // DEVOLVER PDF
            // =====================================================

            return outputStream.toByteArray();


        } catch (DocumentException e) {

            throw new RuntimeException(
                    "Error al generar el PDF del cronograma",
                    e
            );
        }
    }
        

    @Transactional(readOnly = true)
    public LoanDetailDto getLoanByID(Long id) {
        Loan loanFound = loanRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Prestamo no encontrado"));

        LoanDetailDto loanDetail = new LoanDetailDto();
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
        loanDetail.setClientName(loanFound.getClient().getName() + " " + loanFound.getClient().getLastName());

        Set<PaymentResponse> paymentsSet = loanFound.getPayments().stream().map((el) -> {
            PaymentResponse payment = new PaymentResponse();
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
        response.setClientName(loan.getClient().getName() + " " + loan.getClient().getLastName());

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
        loan.setStatus(LoanStatus.ACTIVO);
        loan.setClient(client);
        return loan;
    }
}
