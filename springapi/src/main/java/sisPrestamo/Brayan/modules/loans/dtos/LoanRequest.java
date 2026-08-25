package sisPrestamo.Brayan.modules.loans.dtos;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import sisPrestamo.Brayan.modules.loans.LoanStatus;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class LoanRequest {

    @NotNull(message = "El monto es obligatorio")
    @DecimalMin(value = "0.01", message = "El monto debe ser mayor a 0")
    private BigDecimal amount;

    @NotNull(message = "La tasa de interés es obligatoria")
    @DecimalMin(value = "0.0", message = "La tasa de interés no puede ser negativa")
    private BigDecimal interestRate;

    @NotNull(message = "El número de cuotas es obligatorio")
    @Min(value = 1, message = "Debe tener al menos una cuota")
    private Integer installments;

    /*@NotNull(message = "El monto de la cuota es obligatorio")
    @DecimalMin(value = "0.01", message = "El monto de la cuota debe ser mayor a 0")
    private BigDecimal installmentAmount;

    @NotNull(message = "El saldo restante es obligatorio")
    @DecimalMin(value = "0.00", message = "El saldo restante no puede ser negativo")
    private BigDecimal remainingBalance;

    @NotNull(message = "Las cuotas pagadas son obligatorias")
    @Min(value = 0, message = "Las cuotas pagadas no pueden ser negativas")
    private Integer paidInstallments;*/

    @NotNull(message = "La fecha de inicio es obligatoria")
    private LocalDate startDate;
/* 
    @NotNull(message = "La fecha de finalización es obligatoria")
    private LocalDate endDate;

    @NotNull(message = "El estado es obligatorio")
    private LoanStatus status;*/

    @NotNull(message = "El cliente es obligatorio")
    @Min(value = 1, message = "El identificador del cliente debe ser válido")
    private Long clientId;
}
