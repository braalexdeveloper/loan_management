package sisPrestamo.Brayan.modules.payments;

import java.math.BigDecimal;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends JpaRepository<Payment,Long>{
@Query("SELECT COALESCE(SUM(p.amount),0) FROM Payment p")
BigDecimal sumTotalAmountPayments();
    
} 
