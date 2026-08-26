package sisPrestamo.Brayan.modules.loans;

import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import sisPrestamo.Brayan.modules.loans.dtos.LoanDetailDto;
import sisPrestamo.Brayan.modules.loans.dtos.LoanRequest;
import sisPrestamo.Brayan.modules.loans.dtos.LoanResponse;
import sisPrestamo.Brayan.shared.ResponseBuilder;

@RestController
@RequestMapping("/api/loans")
public class LoanController {

    private final LoanService loanService;
    public LoanController(LoanService loanService) {
        this.loanService=loanService;
    }

    @GetMapping
    public ResponseEntity<Map<String,Object>> getLoans(@RequestParam(defaultValue = "0") int page,@RequestParam(defaultValue = "4") int size,@RequestParam(defaultValue = "id") String sortBy,@RequestParam(defaultValue = "") String dni){
  
        Page<LoanResponse> loans=loanService.getLoans(page, size, sortBy,dni);

        return ResponseEntity.ok(new ResponseBuilder().add("currentPage",loans.getNumber())
        .add("totalPages", loans.getTotalPages())
        .add("totalElements", loans.getTotalElements())
        .add("data", loans.getContent())
        .build());

    }

    @GetMapping("/{id}")
    public ResponseEntity<LoanDetailDto> getLoan(@PathVariable Long id){
       LoanDetailDto loan=loanService.getLoanByID(id);
       return ResponseEntity.ok(loan);
    }

    @PostMapping
    public ResponseEntity<Map<String,Object>> createLoan(@Valid @RequestBody LoanRequest request){

        LoanResponse loan=loanService.createLoan(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(
            new ResponseBuilder()
            .msg("Prestamo creado correctamente")
            .add("loan", loan)
            .build()
        );
    }
    
}
