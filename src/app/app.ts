import { Component } from '@angular/core';
import { ReservationForm } from './reservation-form/reservation-form';
import { ReservationList } from './reservation-list/reservation-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReservationForm, ReservationList],
  template: `
    <div class="app-container">
      <header>
        <h1>Reservation System</h1>
      </header>

      <main>
        <section class="card">
          <h2>Make a Reservation</h2>
          <app-reservation-form></app-reservation-form>
        </section>

        <section class="card">
          <h2>Your Reservations</h2>
          <app-reservation-list></app-reservation-list>
        </section>
      </main>
    </div>
  `,
  styleUrls: ['./app.css']
})
export class App {}
