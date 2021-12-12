import convertTo12Hour from './convert-to-12-hour'

test('convert time format from 24hrs to 12hours (am/pm)', () => {
  expect(convertTo12Hour('00:00')).toBe('00:00am')
  expect(convertTo12Hour('06:30')).toBe('06:30am')
  expect(convertTo12Hour('11:59')).toBe('11:59am')
  expect(convertTo12Hour('12:00')).toBe('00:00am')
  expect(convertTo12Hour('18:00')).toBe('06:00pm')
  expect(convertTo12Hour('23:59')).toBe('11:59pm')
})
