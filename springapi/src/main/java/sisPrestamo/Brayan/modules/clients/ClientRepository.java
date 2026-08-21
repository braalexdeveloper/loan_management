package sisPrestamo.Brayan.modules.clients;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends JpaRepository<Client,Long> {
    //Page<Client> findByDniPagination(String dni, Pageable pageable);
    @Query("SELECT c FROM Client c WHERE c.dni=:dni")
    Page<Client> buscarClientePorDni(@Param("dni") String dni,Pageable pageable);
}
