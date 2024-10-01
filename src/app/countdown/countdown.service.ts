import { Injectable } from '@angular/core'
import moment from 'moment'

@Injectable()
export class CountdownService {
  getCountdownString(endDate: moment.Moment): string {
    const currentDate = moment()

    let difference = endDate.diff(currentDate) / 1000

    if (difference < 0) {
      return 'Event is already finished'
    }

    const days = Math.floor(difference / (3600 * 24))
    difference -= days * 3600 * 24

    const hours = Math.floor(difference / 3600) % 24
    difference -= hours * 3600

    const minutes = Math.floor(difference / 60) % 60
    difference -= minutes * 60

    const seconds = Math.floor(difference % 60)

    return `${days} days, ${hours} h, ${minutes}m, ${seconds}s`
  }
}
