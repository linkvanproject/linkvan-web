import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import BackButton from 'components/back-button'
import getServiceLabel from 'utils/get-service-label'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

const NavBar = () => {
  const router = useRouter()

  return (
    <Container>
      <BackButton />
      {!!router.query.service && (
        <Breadcrumbs aria-label="breadcrumb">
          <Link href="/">Facilities</Link>
          <label>{getServiceLabel(router.query.service)}</label>
        </Breadcrumbs>
      )}
    </Container>
  )
}

export default NavBar
