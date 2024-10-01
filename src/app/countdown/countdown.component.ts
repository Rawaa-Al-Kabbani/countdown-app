import { Component, OnInit, OnDestroy } from '@angular/core'
import { ScaledTextComponent } from '../scaled-text/scaled-text.component'
import { EventFormComponent } from '../event-form/event-form.component'
import moment from 'moment'
import { CountdownService } from './countdown.service'

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [ScaledTextComponent, EventFormComponent],
  providers: [CountdownService],
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
})
export class CountdownComponent implements OnInit, OnDestroy {
  constructor(private service: CountdownService) {}

  eventTitlePrefix: string = 'Time to '

  eventTitle?: string
  eventDate?: moment.Moment

  countdownInterval?: NodeJS.Timeout
  countdownText?: string

  loadEventTitle(): void {
    this.eventTitle = localStorage.getItem('eventTitle') ?? 'Midsummer Eve'
  }

  loadEventDate(): void {
    const date = localStorage.getItem('eventDate')
    if (date) {
      const parsedDate = moment(date)
      if (parsedDate.isValid()) {
        this.eventDate = parsedDate
      }
    } else if (date === null) {
      this.eventDate = moment('2024-06-21')
    }
  }

  ngOnInit(): void {
    this.loadEventTitle()
    this.loadEventDate()
    this.startInterval()
  }

  ngOnDestroy(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval)
    }
  }

  onTitleChange(newTitle: string): void {
    localStorage.setItem('eventTitle', newTitle)
    this.eventTitle = newTitle
  }

  onDateChange(newDate: string): void {
    localStorage.setItem('eventDate', newDate)
    if (newDate) {
      this.eventDate = moment(newDate)
      this.startInterval()
    } else {
      this.eventDate = undefined
      this.updateCountdownText()
    }
  }

  startInterval() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval)
    }

    this.updateCountdownText()
    this.countdownInterval = setInterval(() => this.updateCountdownText(), 1000)
  }

  updateCountdownText(): void {
    if (!this.eventDate) {
      this.countdownText = undefined
      return
    }

    this.countdownText = this.service.getCountdownString(this.eventDate)
  }
}
