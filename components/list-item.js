import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { useTheme } from '@mui/material/styles'
import {
  ChevronRight,
  OverdosePrevention,
  Shelter,
  Food,
  Medical,
  Hygiene,
  Technology,
  Legal,
  Learning,
  Phone
} from 'components/icons'
import HR from 'components/hr'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import distanceInWords from 'utils/distance-in-words'
import getAvailability from 'utils/get-availability'

const StyledIcon = styled('div')`
  margin: 0 5px;
`

const getWalkingDistance = (distanceMeters) => {
  if (!distanceMeters) return ''

  const distanceMinutes = (distanceMeters / 1000) * 12.2 // average 12.2 min/km walking
  return distanceInWords(distanceMinutes)
}

const formatPhone = (phone) => `+1${phone.replace(/\D/g, '')}`

const ColumnArrow = styled(Grid)`
  text-align: right;
  align-self: center;
`

const ListItem = ({ data, filter, location }) => {
  const theme = useTheme()
  const router = useRouter()

  const ColumnOne = styled(Grid)`
    ${theme.breakpoints.up('md')} {
      text-align: left;
    }
  `

  const ColumnTwo = styled(Grid)`
    ${theme.breakpoints.up('md')} {
      text-align: right;
    }
  `

  const TagSuccess = styled.span`
    font-weight: bold;
    color: ${theme.palette.success.main};
  `

  const TagError = styled.span`
    font-weight: bold;
    color: ${theme.palette.error.main};
  `

  const TagWarning = styled.span`
    font-weight: bold;
    color: ${theme.palette.warning.main};
  `

  const getIcon = (icon) => {
    const serviceIcons = {
      shelter: Shelter,
      food: Food,
      medical: Medical,
      hygiene: Hygiene,
      technology: Technology,
      legal: Legal,
      learning: Learning,
      overdose_prevention: OverdosePrevention,
      phone: Phone
    }

    const Icon = serviceIcons[icon.key] || null

    if (!Icon) return null

    return <Icon key={icon.key} size={24} />
  }

  const availability = getAvailability(data.schedule)

  const availabilityLabels = {
    open: <TagSuccess>OPEN</TagSuccess>,
    closed: <TagError>CLOSED</TagError>,
    opening_soon: <TagSuccess>OPENING SOON</TagSuccess>,
    closing_soon: <TagWarning>CLOSING SOON</TagWarning>
  }

  if (filter === 'open' && availability !== 'open') return null

  const walkingDistance = getWalkingDistance(data.distance)

  const goTo = (route) => () => router.push(route)

  const sortByServices = (a, b) => {
    const nameA = a.key.toLowerCase()
    const nameB = b.key.toLowerCase()
    const order = [
      'overdose_prevention',
      'shelter',
      'food',
      'medical',
      'hygiene',
      'technology',
      'legal',
      'learning',
      'phone'
    ]

    if (!order.includes(nameA)) return 1

    return order.indexOf(nameA) < order.indexOf(nameB) ? -1 : 1
  }

  return (
    <>
      <ButtonBase onClick={goTo(`/facilities/${data.id}`)}>
        <Grid container>
          <Grid item xs={11}>
            <Grid container>
              <ColumnOne item xs={12} md={8}>
                <Box fontSize="body1.fontSize" fontWeight="fontWeightBold">
                  {data.name}
                </Box>
                <Box
                  fontSize="body2.fontSize"
                  display="flex"
                  alignItems="center"
                  marginTop={1}
                >
                  <Box marginRight={1}>{availabilityLabels[availability]} </Box>
                  {data.services.sort(sortByServices).map((icon) => (
                    <StyledIcon key={icon.key}>{getIcon(icon)}</StyledIcon>
                  ))}
                </Box>
              </ColumnOne>
              <ColumnTwo item xs={12} md={4}>
                <Box fontSize="body2.fontSize">
                  {data.phone && (
                    <Link href={`tel:${formatPhone(data.phone)}`}>
                      Call: {data.phone}
                    </Link>
                  )}
                </Box>
                <Box fontSize="body2.fontSize">{walkingDistance}</Box>
              </ColumnTwo>
            </Grid>
          </Grid>
          <ColumnArrow item xs={1}>
            <ChevronRight size={20} />
          </ColumnArrow>
        </Grid>
      </ButtonBase>
      <HR />
    </>
  )
}

export default ListItem
