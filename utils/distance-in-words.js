const distanceInWords = (minutes) => {
  const locales = {
    seconds: 'less than a minute',
    minute: 'about a minute',
    minutes: '%d minutes',
    hour: 'about an hour',
    hours: 'about %d hours',
    day: 'a day',
    days: '%d days',
    month: 'about a month',
    months: '%d months',
    year: 'about a year',
    years: '%d years'
  }

  const seconds = Math.round(minutes) * 60

  let words = ' '
  let interval = 0
  const intervals = {
    year: seconds / 31536000,
    month: seconds / 2592000,
    day: seconds / 86400,
    hour: seconds / 3600,
    minute: seconds / 60
  }

  let distance = locales.seconds

  for (const key in intervals) {
    interval = Math.floor(intervals[key])

    if (interval > 1) {
      distance = locales[key + 's']
      break
    } else if (interval === 1) {
      distance = locales[key]
      break
    }
  }

  distance = distance.replace(/%d/i, interval)
  words += distance

  return words.trim()
}

export default distanceInWords
