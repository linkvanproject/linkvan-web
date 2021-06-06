const getAvailability = (schedule) => {
  const sortedSchedules = [
    'schedule_sunday',
    'schedule_monday',
    'schedule_tuesday',
    'schedule_wednesday',
    'schedule_thursday',
    'schedule_friday',
    'schedule_saturday'
  ]
  const presentDay = new Date()
  const presentSchedule = schedule[sortedSchedules[presentDay.getDay()]]

  // if facility is open 24hrs then return OPEN
  if (presentSchedule.availability === 'open') return 'open'

  // if facility is closed 24hrs then return CLOSED
  if (presentSchedule.availability === 'closed') return 'closed'

  // Otherwise calculate availability from time intervals
  const { times } = presentSchedule

  // convert time now to minutes
  const timeNow = presentDay.getHours() * 60 + presentDay.getMinutes()

  let status = 'closed'
  times.map((time) => {
    // convert opening and closing times to minutes
    const openTime = Number(time.from_hour) * 60 + Number(time.from_min)
    const closeTime = Number(time.to_hour) * 60 + Number(time.to_min)

    const thirtyMinBeforeOpen = openTime - 30
    const thirtyMinBeforeClose = closeTime - 30

    if (thirtyMinBeforeOpen <= timeNow && timeNow < openTime) {
      status = 'opening_soon'
    } else if (thirtyMinBeforeClose <= timeNow && timeNow < closeTime) {
      status = 'closing_soon'
    } else if (openTime <= timeNow && timeNow < closeTime) {
      status = 'open'
    }
  })
  return status
}

export default getAvailability
