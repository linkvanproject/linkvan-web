import distanceInWords from './distance-in-words'

test('shows correct walking distance based on distance in minutes', () => {
  expect(distanceInWords(0.5)).toBe('less than a minute')
  expect(distanceInWords(1)).toBe('about a minute')
  expect(distanceInWords(12)).toBe('12 minutes')
  expect(distanceInWords(60)).toBe('about an hour')
  expect(distanceInWords(120)).toBe('about 2 hours')
  expect(distanceInWords(60 * 24)).toBe('a day')
  expect(distanceInWords(60 * 24 * 3)).toBe('3 days')
  expect(distanceInWords(60 * 24 * 31)).toBe('about a month')
  expect(distanceInWords(60 * 24 * 31 * 4)).toBe('4 months')
  expect(distanceInWords(60 * 24 * 31 * 12)).toBe('about a year')
  expect(distanceInWords(60 * 24 * 31 * 24)).toBe('2 years')
})
