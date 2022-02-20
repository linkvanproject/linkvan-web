import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '400px'
}

const Map = ({ lat, lng, mapContainerStyle }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  })

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ ...containerStyle, ...mapContainerStyle }}
      center={{ lat, lng }}
      zoom={13}
    >
      <Marker position={{ lat, lng }} />
    </GoogleMap>
  ) : null
}

Map.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number,
  mapContainerStyle: PropTypes.object
}

Map.defaultProps = {
  lat: 0,
  lng: 0,
  mapContainerStyle: {}
}

export default Map
