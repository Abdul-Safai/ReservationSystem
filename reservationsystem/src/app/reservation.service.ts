import { Injectable } from '@angular/core';
import { Reservation } from './reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservations: Reservation[] = [];

  constructor() {}

  // Return the list of reservations
  getReservations(): Reservation[] {
    return this.reservations;
  }

  // Add a new reservation to the list
  addReservation(reservation: Reservation): void {
    this.reservations.push(reservation);
  }

  // Remove a reservation by its index
  removeReservation(index: number): void {
    this.reservations.splice(index, 1);
  }
}
