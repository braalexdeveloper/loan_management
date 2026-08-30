package sisPrestamo.Brayan.modules.loans;


import java.math.BigDecimal;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface LoanRepository extends JpaRepository<Loan,Long>{
    
    Page<Loan> findByClientDni(String dni,Pageable pageable);
    Long countByStatus(LoanStatus status);

    @Query("SELECT COALESCE(SUM(l.amount), 0) FROM Loan l")
BigDecimal sumTotalAmount();

}
