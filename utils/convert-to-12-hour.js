const convertTo12Hour = (time) => {
  let result = time.split(':')
  const ampm = Number(result[0]) <= 12 ? 'am' : 'pm'
  result[0] = String(Number(result[0]) % 12)
  return `${result.join(':')}${ampm}`
}

export default convertTo12Hour
