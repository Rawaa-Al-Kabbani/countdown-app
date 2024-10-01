import moment from 'moment'

export const getTomorrowsDate = (): moment.Moment => {
  return moment().add(1, 'day').startOf('day')
}

export const formatDate = (date: moment.Moment) => {
  return date.format('yyyy-MM-DD')
}
