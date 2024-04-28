import getServiceLabel from './get-service-label'

test('return service label based on label key', () => {
  expect(getServiceLabel('female')).toBe('Female')
  expect(getServiceLabel('transgender')).toBe('Transgender')
  expect(getServiceLabel('senior')).toBe('Senior')
  expect(getServiceLabel('shelter')).toBe('Shelter')
  expect(getServiceLabel('overdose_prevention')).toBe('Overdose Prevention')
  expect(getServiceLabel('water_fountain')).toBe('Water Fountains')
})
