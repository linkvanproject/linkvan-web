const convertTo12Hour = (h, m) => {
  if (m === 0){
    if (h === 0) return 'Midnight'
    if (h === 12) return 'Noon'
  }
 
  const ampm = h >= 12 & h <= 23 ? 'pm' : 'am'
  const hour = (h % 12 === 0) ? '12' : String(h % 12)
  const min = String(m).padStart(2, '0')
  return `${hour}:${min}${ampm}`
}

export default convertTo12Hour
