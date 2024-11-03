import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import fetcher from 'utils/fetcher'
import useNavigatorLocation from 'hooks/use-navigator-location'
import haversine from 'haversine-distance'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Layout from 'components/layout'
import HR from 'components/hr'
import NavBar from 'components/nav-bar'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Box from '@mui/material/Box'
import ListItem from 'components/list-item'
import { Loading } from 'components/icons'
import Stack from 'components/stack'
import styles from './styles.module.css'

const addDistance = (list = [], location) => {
  if (!location) return list

  const startPoint = { latitude: location.lat, longitude: location.lng }

  const formattedList = list.map((item) => ({
    ...item,
    distance: haversine(startPoint, {
      latitude: Number(item.lat),
      longitude: Number(item.long)
    })
  }))

  return formattedList
}

const sortList = (sort, data) =>
  sort === 'near' ? sortNear(data) : sortAlphabetic(data)

const sortNear = (list) => {
  const sortedList = [...list].sort((a, b) => {
    const distanceA = a.distance
    const distanceB = b.distance
    if (distanceA < distanceB) return -1
    if (distanceA > distanceB) return 1
    return 0
  })

  return sortedList
}

const sortAlphabetic = (list = []) => {
  const sortedList = [...list].sort((a, b) => {
    const nameA = a.name.toUpperCase()
    const nameB = b.name.toUpperCase()
    if (nameA < nameB) return -1
    if (nameA > nameB) return 1
    return 0
  })

  return sortedList
}

const Facilities = () => {
  const userLocation = useNavigatorLocation()
  const router = useRouter()
  const [listSort, setListSort] = useState('near')
  const [listFilter, setListFilter] = useState('open')
  const [facilities, setFacilities] = useState([])

  /* Fetch facilities */
  let apiKey = '/api/facilities'
  if (router.query.service) {
    apiKey = `/api/facilities?service=${router.query.service}`
  } else if (router.query.search) {
    apiKey = `/api/facilities?search=${router.query.search}`
  }
  const { data, error } = useSWR(apiKey, fetcher)

  /* Handle subsequent data sorting */
  const handleSorting = (sort) => {
    if (sort) {
      setListSort(sort)
      setFacilities(sortList(sort, facilities))
    }
  }
  /* Handle initial data sorting */
  useEffect(() => {
    const formattedFacilities = addDistance(data?.facilities, userLocation)
    setFacilities(sortList(listSort, formattedFacilities))
  }, [data, userLocation])

  const getContent = () => {
    if (error)
      return (
        <Box textAlign="center" flexGrow={1}>
          failed to load
        </Box>
      )

    if (!data)
      return (
        <Box textAlign="center" flexGrow={1}>
          <Loading />
        </Box>
      )

    if (data.facilities.length <= 0) return <div>No facilities found.</div>

    return (
      <>
        <Grid item xs={12}>
          <div className={styles.filterBar}>
            <ToggleButtonGroup
              value={listSort}
              exclusive
              onChange={(_, value) => handleSorting(value)}
            >
              <ToggleButton className={styles.filterOption} value="near" aria-label="near">
                Near
              </ToggleButton>
              <ToggleButton className={styles.filterOption} value="alphabetic" aria-label="alphabetic">
                A-Z
              </ToggleButton>
            </ToggleButtonGroup>
            <ToggleButtonGroup
              value={listFilter}
              exclusive
              onChange={(_, value) => value && setListFilter(value)}
            >
              <ToggleButton className={styles.filterOption} value="open" aria-label="open">
                Open
              </ToggleButton>
              <ToggleButton className={styles.filterOption} value="all" aria-label="all">
                All
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Stack gridGap={2}>
            <HR />
            {facilities?.map((facility) => (
              <ListItem
                key={facility.id}
                data={facility}
                filter={listFilter}
                location={userLocation}
              />
            ))}
          </Stack>
        </Grid>
      </>
    )
  }

  return (
    <Layout stats={data?.site_stats}>
      <Head>
        <title>Linkvan | Facilities</title>
      </Head>
      <Container maxWidth="md">
        <Grid container>
          <Grid item xs={12}>
            <NavBar />
          </Grid>
          {getContent()}
        </Grid>
      </Container>
    </Layout>
  )
}

export default Facilities
