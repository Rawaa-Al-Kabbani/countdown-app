import moment from 'moment'
import { CountdownService } from './countdown.service'

describe('CountdownService', () => {
  let service: CountdownService

  beforeEach(() => {
    service = new CountdownService()
  })

  afterEach(() => {
    jasmine.clock().uninstall()
  })

  describe('#getCountdown', () => {
    it('should return the correct string if the end date is in the future', () => {
      const tomorrow = moment().add(1, 'day').startOf('day')
      jasmine
        .clock()
        .mockDate(
          tomorrow
            .clone()
            .subtract(25, 'hours')
            .subtract(10, 'minutes')
            .subtract(30, 'seconds')
            .toDate(),
        )
      expect(service.getCountdownString(tomorrow)).toBe('1 days, 1 h, 10m, 30s')
    })

    it('should return the correct string if the end date is in the past', () => {
      const endDate = moment()
      jasmine.clock().mockDate(endDate.clone().add(1, 'second').toDate())
      expect(service.getCountdownString(endDate)).toBe('Event is already finished')
    })
  })
})
