import React, { useRef, useState } from 'react'
import useSWR from 'swr'
import fetcher from 'utils/fetcher'
import styled from '@emotion/styled'
import useNavigatorLocation from 'hooks/use-navigator-location'
import { useRouter } from 'next/router'
import Head from 'next/head'
import {
  GoogleMap,
  useJsApiLoader,
  DirectionsService,
  DirectionsRenderer
} from '@react-google-maps/api'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Layout from 'components/layout'
import { Walking, Transit, Bicycle, Car, Loading } from 'components/icons'

const TravelModes = styled(ButtonGroup)`
  position: absolute;
  bottom: 10px;
  left: 50%;
  margin-left: -114px;
  background-color: white;
`

const mapContainerStyle = { height: '75%' }

const Directions = () => {
  const userLocation = useNavigatorLocation()

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  })

  const [travelMode, setTravelMode] = useState('walking')

  const [serviceData, setServiceData] = useState({})
  const requested = useRef(false)

  const router = useRouter()
  const { data, error } = useSWR(`/api/facilities/${router.query.id}`, fetcher)

  const handleService = (response) => {
    if (response?.status === 'OK' && !requested.current) {
      requested.current = true
      setServiceData(response)
    }
  }

  const handleTravelMode = (option) => {
    requested.current = false
    setTravelMode(option)
  }

  const getTravelOption = (option) => {
    const icons = {
      walking: Walking,
      transit: Transit,
      bicycling: Bicycle,
      driving: Car
    }

    const Icon = icons[option]

    const isSelected = travelMode === option
    const styleOptions = isSelected
      ? {
          variant: 'contained',
          color: 'primary'
        }
      : {}

    return (
      <Button onClick={() => handleTravelMode(option)} {...styleOptions}>
        <Icon size={26} fill={isSelected ? 'white' : 'black'} />
      </Button>
    )
  }

  const lat = Number(data?.facility.lat)
  const lng = Number(data?.facility.long)
  const center = { lat, lng }

  const serviceOptions = {
    destination: { lat, lng },
    origin: userLocation,
    travelMode: travelMode.toUpperCase()
  }

  const renderedOptions = {
    directions: serviceData
  }

  return (
    <Layout stats={data?.site_stats} headerStyle={{ marginBottom: 0 }}>
      <Head>
        <title>Linkvan | Facilities | {data?.facility?.name} | Directions</title>
      </Head>
      {error && (
        <Box textAlign="center" flexGrow={1}>
          failed to load
        </Box>
      )}
      {!data && (
        <Box textAlign="center" flexGrow={1}>
          <Loading />
        </Box>
      )}
      {data && !data?.facility && <div>Facility not found.</div>}
      {isLoaded && data ? (
        <GoogleMap
          key={travelMode}
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={13}
        >
          {!!userLocation && (
            <DirectionsService
              options={serviceOptions}
              callback={handleService}
            />
          )}
          <DirectionsRenderer key={travelMode} options={renderedOptions} />
          <TravelModes
            color="primary"
            aria-label="outlined primary button group"
          >
            {getTravelOption('walking')}
            {getTravelOption('transit')}
            {getTravelOption('bicycling')}
            {getTravelOption('driving')}
          </TravelModes>
        </GoogleMap>
      ) : null}
    </Layout>
  )
}

export default Directions
