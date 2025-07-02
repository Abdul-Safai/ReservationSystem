import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // For *ngFor
import { FormsModule } from '@angular/forms';    // For [(ngModel)]
import { ReservationService } from '../reservation.service';
import { Reservation } from '../reservation.model';

@Component({
  selector: 'app-reservation-form',
  standalone: true,                 // <--- Mark as standalone
  imports: [CommonModule, FormsModule],  // <--- Import CommonModule & FormsModule
  templateUrl: './reservation-form.html',
  styleUrls: ['./reservation-form.css']
})
export class ReservationForm {

  areas: string[] = ['North Conservation Area', 'South Conservation Area', 'East Conservation Area', 'West Conservation Area'];
  timeSlots: string[] = [
    '9:00 AM - 12:00 PM',
    '12:00 PM - 3:00 PM',
    '3:00 PM - 6:00 PM'
  ];

  selectedArea = '';
  selectedTimeSlot = '';

  constructor(private reservationService: ReservationService) {}

  addReservation(): void {
    if (this.selectedArea && this.selectedTimeSlot) {
      const newReservation: Reservation = {
        area: this.selectedArea,
        timeSlot: this.selectedTimeSlot
      };
      this.reservationService.addReservation(newReservation);
      this.selectedArea = '';
      this.selectedTimeSlot = '';
    }
  }
}
