import MockDate from 'mockdate'
import getAvailability from './get-availability'

const openAllDay = {
  availability: 'open',
  times: []
}

const closedAllDay = {
  availability: 'closed',
  time: []
}

const partiallyOpen = {
  availability: 'set_times',
  times: [
    { from_hour: '09', from_min: '00', to_hour: '12', to_min: '00' },
    { from_hour: '14', from_min: '30', to_hour: '20', to_min: '00' }
  ]
}

const schedule = {
  schedule_monday: openAllDay,
  schedule_tuesday: closedAllDay,
  schedule_wednesday: partiallyOpen
}

test('shows the facility is OPEN based on the availability', () => {
  MockDate.set(`March 22, 2021`) // schedule_monday

  expect(getAvailability(schedule)).toBe('open')

  MockDate.reset()
})

test('shows the facility is CLOSED based on the availability', () => {
  MockDate.set(`March 23, 2021`) // schedule_tuesday

  expect(getAvailability(schedule)).toBe('closed')

  MockDate.reset()
})

test('shows the facility is CLOSING SOON based on the set times', () => {
  const currentTime = '19:50:00'

  MockDate.set(`March 24, 2021 ${currentTime}`) // schedule_wednesday

  expect(getAvailability(schedule)).toBe('closing_soon')

  MockDate.reset()
})

test('shows the facility is OPENING SOON based on the set times', () => {
  const currentTime = '08:50:00'

  MockDate.set(`March 24, 2021 ${currentTime}`) // schedule_wednesday

  expect(getAvailability(schedule)).toBe('opening_soon')

  MockDate.reset()
})

test('shows the facility is OPEN based on the set times', () => {
  const currentTime = '09:30:00'

  MockDate.set(`March 24, 2021 ${currentTime}`)

  expect(getAvailability(schedule)).toBe('open') // schedule_wednesday

  MockDate.reset()
})

test('shows the facility is CLOSED based on the set times', () => {
  const currentTime = '13:00:00'

  MockDate.set(`March 24, 2021 ${currentTime}`) // schedule_wednesday

  expect(getAvailability(schedule)).toBe('closed')

  MockDate.reset()
})
