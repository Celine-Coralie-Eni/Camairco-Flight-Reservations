package com.adorsys_GIS.demo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface FlightReservationRepository extends JpaRepository<FlightReservation, Long> {
    List<FlightReservation> findByFlightDateTime(LocalDateTime flightDateTime);
    List<FlightReservation> findByDestinationAddressIgnoreCase(String destinationAddress);
    List<FlightReservation> findByKickoffAddressIgnoreCase(String kickoffAddress);
    List<FlightReservation> findByFlightDateTimeAndDestinationAddressIgnoreCaseAndKickoffAddressIgnoreCase(
            LocalDateTime flightDateTime, String destinationAddress, String kickoffAddress);
} 