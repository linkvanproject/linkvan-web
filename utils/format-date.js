const formatDate = (date) => {
  let parsedDate = new Date(date)
  if (isNaN(parsedDate)) return ''
  parsedDate = parsedDate.toDateString().split(' ')
  parsedDate = `${parsedDate[1]} ${parsedDate[2]}, ${parsedDate[3]}`
  return parsedDate
}

export default formatDate
