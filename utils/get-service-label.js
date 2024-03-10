const getServiceLabel = (label) => {
  const labels = {
    male: 'Male',
    female: 'Female',
    transgender: 'Transgender',
    children: 'Children',
    youth: 'Youth',
    adult: 'Adult',
    senior: 'Senior',
    shelter: 'Shelter',
    food: 'Food',
    medical: 'Medical',
    hygiene: 'Hygiene',
    technology: 'Technology',
    legal: 'Legal',
    learning: 'Learning',
    overdose_prevention: 'Overdose Prevention',
    phone: 'Phone',
    water_fountain: 'Water Fountains'
  }

  return labels[label] || ''
}

export default getServiceLabel
