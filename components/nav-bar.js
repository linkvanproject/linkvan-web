import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import BackButton from 'components/back-button'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

const Current = styled.label`
  text-transform: capitalize;
`

const NavBar = () => {
  const router = useRouter()

  return (
    <Container>
      <BackButton />
      {!!router.query.service && (
        <Breadcrumbs aria-label="breadcrumb">
          <Link href="/">Facilities</Link>
          <Current>{router.query.service}</Current>
        </Breadcrumbs>
      )}
    </Container>
  )
}

export default NavBar
