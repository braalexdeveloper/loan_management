package sisPrestamo.Brayan.modules.clients;

import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sisPrestamo.Brayan.modules.clients.dtos.ClientRequest;
import sisPrestamo.Brayan.modules.clients.dtos.ClientResponse;
import sisPrestamo.Brayan.shared.ResponseBuilder;

import java.util.Map;

@RestController
@RequestMapping("/api/clients")
public class ClientController {

    private final ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getClients(
            @RequestParam(defaultValue = "0") int page,@RequestParam(defaultValue = "4") int size,@RequestParam(defaultValue = "id") String sortBy,@RequestParam(defaultValue = "") String dni
    ) {
        Page<ClientResponse> clients=clientService.getClients(page,size,sortBy,dni);
        return ResponseEntity.ok(new ResponseBuilder()
                .status("success")
                .add("clients",clients.getContent())
                        .add("page",clients.getNumber())
                        .add("size",clients.getSize())
                .add("totalElements", clients.getTotalElements())
                .add("totalPages", clients.getTotalPages())
                .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String,Object>> getClient(@PathVariable Long id){
        return ResponseEntity.ok(new ResponseBuilder().add("client",clientService.getClient(id)).build());
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createClient(@Valid @RequestBody ClientRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseBuilder()
                .status("success")
                .msg("Cliente creado correctamente")
                .add("client", clientService.createClient(request))
                .build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateClient(
            @PathVariable Long id,
            @Valid @RequestBody ClientRequest request) {
        return ResponseEntity.ok(new ResponseBuilder()
                .status("success")
                .msg("Cliente actualizado correctamente")
                .add("data", clientService.updateClient(request, id))
                .build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteClient(@PathVariable Long id) {
        
        return ResponseEntity.ok(new ResponseBuilder()
                .status("success")
                .msg(clientService.deleteClient(id))
                .build());
    }
}
