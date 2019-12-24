import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';
import { CustomCalendarComponent } from './custom-calendar.component';
import { EditEventComponent } from '../edit-event/edit-event.component';

export function momentAdapterFactory() {
  return adapterFactory(moment);
}

@NgModule({
  declarations: [ CustomCalendarComponent ],
  entryComponents: [EditEventComponent],
  imports: [
    BrowserModule,
    NgbModalModule,
    CommonModule,
    FormsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: momentAdapterFactory })
  ],
  exports: [CustomCalendarComponent],
  providers: [],
  bootstrap: [CustomCalendarComponent],
})
export class CustomCalendarModule { }
