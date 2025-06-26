import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { App } from './app';
import { ReservationForm } from './reservation-form/reservation-form';
import { ReservationList } from './reservation-list/reservation-list';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    App,              // Import standalone components here
    ReservationForm,
    ReservationList
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule { }
