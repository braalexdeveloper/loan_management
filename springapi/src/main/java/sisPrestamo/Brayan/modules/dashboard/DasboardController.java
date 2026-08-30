package sisPrestamo.Brayan.modules.dashboard;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sisPrestamo.Brayan.modules.dashboard.dtos.DashboardResponse;

@RestController
@RequestMapping("/api/dashboard")
public class DasboardController {
    private final DashboardService dashboardService;

    public DasboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping
    public ResponseEntity<DashboardResponse> getDashboard(){
        return ResponseEntity.ok(dashboardService.getDashboard());
    } 

}
