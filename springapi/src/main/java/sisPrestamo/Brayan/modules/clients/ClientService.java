package sisPrestamo.Brayan.modules.clients;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import sisPrestamo.Brayan.Errors.ResourceNotFoundException;
import sisPrestamo.Brayan.modules.clients.dtos.ClientRequest;
import sisPrestamo.Brayan.modules.clients.dtos.ClientResponse;

import java.util.List;

@Service
public class ClientService {
    private final ClientRepository clientRepository;

    public ClientService(ClientRepository clientRepository){
        this.clientRepository=clientRepository;
    }

    public Page<ClientResponse> getClients(int page,int size,String sortBy,String dni){
        Pageable pageable= PageRequest.of(page,size,Sort.by(Sort.Direction.DESC,sortBy));
        Page<Client> clientsPage;

        if (!dni.isBlank()) {
            clientsPage = clientRepository.buscarClientePorDni(dni, pageable);
        } else {
            clientsPage = clientRepository.findAll(pageable);
        }

        return clientsPage.map(this::covertToClientResponse);

    }

    public ClientResponse getClient(Long id){
        Client client=clientRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Cliente no encontrado"));
        return covertToClientResponse(client);
    }

    public ClientResponse createClient(ClientRequest request){
        Client newClient=convertToClient(new Client(),request);

        return covertToClientResponse(clientRepository.save(newClient));
    }

    public ClientResponse updateClient(ClientRequest request,Long id){
      Client clientFound=clientRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Cliente no encontrado"));
      Client clientUpdated=clientRepository.save(convertToClient(clientFound, request));
      return covertToClientResponse(clientUpdated);

    }

    public String deleteClient(Long id){
        Client clientFound = clientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado"));
        clientRepository.delete(clientFound);
        return "Cliente eliminado";
    }



    private ClientResponse covertToClientResponse(Client client){
        ClientResponse response=new ClientResponse();
        response.setId(client.getId());
        response.setName(client.getName());
        response.setLastName(client.getLastName());
        response.setDni(client.getDni());
        response.setEmail(client.getEmail());
        response.setPhone(client.getPhone());
        response.setAddress(client.getAddress());
        return response;
    }

    private Client convertToClient(Client client,ClientRequest request){
        client.setName(request.getName());
        client.setLastName(request.getLastName());
        client.setDni(request.getDni());
        client.setEmail(request.getEmail());
        client.setPhone(request.getPhone());
        client.setAddress(request.getAddress());
        return  client;
    }
}
