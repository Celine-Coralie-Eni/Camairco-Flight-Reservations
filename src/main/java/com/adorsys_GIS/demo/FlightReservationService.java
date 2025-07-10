package com.adorsys_GIS.demo;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FlightReservationService {
    private final FlightReservationRepository reservationRepository;

    public FlightReservation createReservation(FlightReservation reservation) {
        return reservationRepository.save(reservation);
    }

    public List<FlightReservation> searchReservations(Optional<LocalDateTime> flightDateTime, Optional<String> destinationAddress, Optional<String> kickoffAddress) {
        if (flightDateTime.isPresent() && destinationAddress.isPresent() && kickoffAddress.isPresent()) {
            return reservationRepository.findByFlightDateTimeAndDestinationAddressIgnoreCaseAndKickoffAddressIgnoreCase(
                    flightDateTime.get(), destinationAddress.get(), kickoffAddress.get());
        } else if (flightDateTime.isPresent()) {
            return reservationRepository.findByFlightDateTime(flightDateTime.get());
        } else if (destinationAddress.isPresent()) {
            return reservationRepository.findByDestinationAddressIgnoreCase(destinationAddress.get());
        } else if (kickoffAddress.isPresent()) {
            return reservationRepository.findByKickoffAddressIgnoreCase(kickoffAddress.get());
        } else {
            return reservationRepository.findAll();
        }
    }

    public void deleteReservation(Long id) {
        reservationRepository.deleteById(id);
    }

    public Optional<FlightReservation> getReservationById(Long id) {
        return reservationRepository.findById(id);
    }
} 