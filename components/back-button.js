import styled from 'styled-components'
import Link from '@material-ui/core/Link'
import { useTheme } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import { ChevronLeft } from 'components/icons'

const BackButton = () => {
  const router = useRouter()
  const theme = useTheme()

  const { typography } = theme

  const Label = styled.label`
    padding-left: 4px;
    font-size: ${typography.body1};
  `

  return (
    <Link href="#" onClick={() => router.back()}>
      <ChevronLeft fill={theme.palette.info.main} size={14} />
      <Label>Back</Label>
    </Link>
  )
}

export default BackButton
