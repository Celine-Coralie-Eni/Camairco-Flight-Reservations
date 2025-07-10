package com.adorsys_GIS.demo;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/reservations")
@RequiredArgsConstructor
public class FlightReservationController {

    private final FlightReservationService reservationService;

    @PostMapping
    public ResponseEntity<FlightReservation> createReservation(@RequestBody FlightReservation reservation) {
        FlightReservation saved = reservationService.createReservation(reservation);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public ResponseEntity<List<FlightReservation>> getReservations(
            @RequestParam Optional<LocalDateTime> flightDateTime,
            @RequestParam Optional<String> destinationAddress,
            @RequestParam Optional<String> kickoffAddress) {
        List<FlightReservation> results = reservationService.searchReservations(
            flightDateTime,
            destinationAddress,
            kickoffAddress
        );
        return ResponseEntity.ok(results);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FlightReservation> getReservationById(@PathVariable Long id) {
        Optional<FlightReservation> reservation = reservationService.getReservationById(id);
        return reservation.map(ResponseEntity::ok)
                          .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReservation(@PathVariable Long id) {
        reservationService.deleteReservation(id);
        return ResponseEntity.noContent().build();
    }
}
