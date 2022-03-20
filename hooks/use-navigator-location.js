import { useState, useEffect } from 'react'

const useNavigatorLocation = () => {
  const [location, setLocation] = useState(null)

  /* Request location */
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
    })
  }, [])

  return location
}

export default useNavigatorLocation
