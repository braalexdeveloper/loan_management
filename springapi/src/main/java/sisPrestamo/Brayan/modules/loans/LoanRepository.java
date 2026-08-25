package sisPrestamo.Brayan.modules.loans;

import java.util.List;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

@Repository
public interface LoanRepository extends JpaRepository<Loan,Long>{
    
    Page<Loan> findByClientDni(String dni,Pageable pageable);

}
