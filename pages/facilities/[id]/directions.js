import React, { useRef, useState } from 'react'
import useSWR from 'swr'
import fetcher from 'utils/fetcher'
import { useRouter } from 'next/router'
import Head from 'next/head'
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsService,
  DirectionsRenderer
} from '@react-google-maps/api'
import Box from '@material-ui/core/Box'
import Layout from 'components/layout'

const mapContainerStyle = { height: '100%' }

const Directions = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  })

  const [serviceData, setServiceData] = useState({})
  const requested = useRef(false)

  const router = useRouter()
  const { data, error } = useSWR(`/api/facilities/${router.query.id}`, fetcher)

  const handleService = (response) => {
    console.log({ response, requested, serviceData })
    if (response?.status === 'OK' && !requested.current) {
      requested.current = true
      setServiceData(response)
    }
  }

  const lat = Number(data?.facility.lat)
  const lng = Number(data?.facility.long)
  const center = { lat, lng }

  const serviceOptions = {
    destination: { lat, lng },
    origin: 'burnaby, bc',
    travelMode: 'WALKING'
  }

  const renderedOptions = {
    directions: serviceData
  }

  return (
    <Layout stats={data?.site_stats} headerStyle={{ marginBottom: 0 }}>
      <Head>
        <title>Linkvan</title>
      </Head>
      {error && <Box textAlign="center">failed to load</Box>}
      {!data && <Box textAlign="center">loading...</Box>}
      {!data?.facility && <div>Facility not found.</div>}
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={13}
        >
          {/* <Marker position={{ lat, lng }} /> */}
          <DirectionsService
            options={serviceOptions}
            callback={handleService}
          />
          <DirectionsRenderer options={renderedOptions} />
        </GoogleMap>
      ) : null}
    </Layout>
  )
}

export default Directions
