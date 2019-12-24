import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  ChangeDetectorRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import { EditEventComponent } from '../edit-event/edit-event.component';

interface ICalendarDay {
  date: Date;
  day: number;
  isPast: boolean;
  isToday: boolean;
  isFuture: boolean;
  isWeekend: boolean;
  inMonth: boolean;
  events: CalendarEvent[];
  badgeTotal: number;
}

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-custom-calendar',
  templateUrl: './custom-calendar.component.html',
  styleUrls: ['./custom-calendar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomCalendarComponent implements OnInit {
  public CalendarView = CalendarView;
  public view = this.CalendarView.Month;
  public viewDate = new Date();
  public activeDayIsOpen = false;
  public refresh = new Subject<any>();
  public actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-edit"></i>',
      a11yLabel: 'Edit',
      onClick: ({event, sourceEvent}: {event: CalendarEvent, sourceEvent: MouseEvent | KeyboardEvent}): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fas fa-fw fa-trash"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event, sourceEvent }: { event: CalendarEvent, sourceEvent: MouseEvent | KeyboardEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];
  public events: CalendarEvent[] = [
    {
      start: new Date('2019-12-26'),
      end: new Date('2019-12-26'),
      title: 'Christmas Day!',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }];

  constructor(
    private cd: ChangeDetectorRef,
    private modal: NgbModal) { }

  ngOnInit() {
  }

  public dayClicked(day: ICalendarDay) {
    if (day.inMonth) {
      if (day.date.getDate() === this.viewDate.getDate() && this.activeDayIsOpen === true || this.events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = day.date;
    }
    this.cd.markForCheck();
  }

  public handleEvent(action: string, e: CalendarEvent): void {
    console.log('EVENT');
    console.log(action);
    console.log(e);
    if (action === 'Edited') {
      const m = this.modal.open(EditEventComponent);
      m.result.then(() => {
        console.log('closed');
      });
    }
  }

  public eventTimesChanged(e: CalendarEventTimesChangedEvent) {
    this.events = this.events.map((iEvent) => {
      if (iEvent === e.event) {
        return {
          ...e.event,
          start: e.newStart,
          end: e.newEnd,
          allDay: e.allDay
        };
      }
      return iEvent;
    });
    this.activeDayIsOpen = false;
    this.cd.markForCheck();
  }
}
