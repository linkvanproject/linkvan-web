import styled from 'styled-components'
import { useTheme } from '@material-ui/core/styles'
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
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import distanceInWords from 'utils/distance-in-words'
import getAvailability from 'utils/get-availability'

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

    const Icon = serviceIcons[icon]
    const StyledIcon = styled(Icon)`
      margin: 0 5px;
    `
    return <StyledIcon key={icon} size={24} />
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

  return (
    <>
      <Grid container>
        <Grid item xs={11}>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Box fontSize="body1.fontSize" fontWeight="fontWeightBold">
                {data.name}
              </Box>
              <div>
                {availabilityLabels[availability]} {data.services.map(getIcon)}
              </div>
            </Grid>
            <ColumnTwo item xs={12} md={6}>
              <div>
                {data.phone && (
                  <Link href={`tel:${formatPhone(data.phone)}`}>
                    Call: {data.phone}
                  </Link>
                )}
              </div>
              <div>{walkingDistance}</div>
            </ColumnTwo>
          </Grid>
        </Grid>
        <ColumnArrow item xs={1}>
          <ChevronRight size={20} />
        </ColumnArrow>
      </Grid>
      <HR />
    </>
  )
}

export default ListItem
