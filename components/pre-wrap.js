import React from 'react'
import styled from '@emotion/styled'

const StyledPreWrap = styled.div`
  white-space: pre-wrap;
`

const PreWrap = ({ children }) => <StyledPreWrap>{children}</StyledPreWrap>

export default PreWrap
