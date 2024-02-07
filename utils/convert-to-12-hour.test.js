import convertTo12Hour from './convert-to-12-hour'

test('convert time format from 24hrs to 12hours (am/pm)', () => {
  expect(convertTo12Hour(0, 0)).toBe('Midnight')  // 00:00
  expect(convertTo12Hour(0, 10)).toBe('12:10am')  // 00:10
  expect(convertTo12Hour(6, 30)).toBe('6:30am')   // 06:30
  expect(convertTo12Hour(11, 59)).toBe('11:59am') // 11:59
  expect(convertTo12Hour(12, 0)).toBe('Noon')     // 12:00
  expect(convertTo12Hour(18, 0)).toBe('6:00pm')   // 18:00
  expect(convertTo12Hour(23, 59)).toBe('11:59pm') // 23:59
})
