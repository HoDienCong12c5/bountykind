import styled from 'styled-components'
import { COLOR } from 'common/constants'
export const DivRadiusBase = styled.div`
  --r: 8px; /* radius */
  border-radius: var(--r);
`
export const DivRadius = styled.div`
  --r: 16px; /* radius */
  border-radius: var(--r);
`
export const DivBorder = styled.div`
  --color: ${COLOR.white2}; /* color */
  --px:1px;
  border: var(--px) solid var(--color);
`
export const DivAllBase = styled.div`
  --r: 8px; /* radius */
  --px:1px;
  --color: ${COLOR.white2}; /* color */
  border-radius: var(--r);
  border: var(--px) solid var(--color);
`
export const DivAll = styled.div`
  --r: 16px; /* radius */
  --color: ${COLOR.white2}; /* color */
  --px:1px;
  border-radius: var(--r);
  border: var(--px) solid var(--color);
`

export default () => {}
