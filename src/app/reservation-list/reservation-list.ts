import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Needed for *ngFor
import { ReservationService } from '../reservation.service';
import { Reservation } from '../reservation.model';

@Component({
  selector: 'app-reservation-list',
  standalone: true,                // <--- Mark as standalone
  imports: [CommonModule],         // <--- Import CommonModule for *ngFor
  templateUrl: './reservation-list.html',
  styleUrls: ['./reservation-list.css']
})
export class ReservationList implements OnInit {

  reservations: Reservation[] = [];

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.reservations = this.reservationService.getReservations();
  }

  removeReservation(index: number): void {
    this.reservationService.removeReservation(index);
  }
}
