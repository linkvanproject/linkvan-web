import React, { useCallback, useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '400px'
}

const Map = ({ lat, lng }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  })

  const [map, setMap] = useState(null)

  const onLoad = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds()
    map.fitBounds(bounds)
    setMap(map)
  }, [])

  const onUnmount = useCallback((map) => setMap(null), [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat, lng }}
      zoom={13}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker position={{ lat, lng }} />
    </GoogleMap>
  ) : null
}

export default Map
