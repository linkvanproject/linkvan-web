import { useRouter } from 'next/router'
import styled from 'styled-components'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'
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
