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

      // Saving here so we can get it in the "fetcher" function
      sessionStorage.setItem('userLocation', JSON.stringify({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }))
    })
  }, [])

  return location
}

export default useNavigatorLocation
