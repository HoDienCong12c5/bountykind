import styled from 'styled-components'

export const Container = styled.div`
  text-align: center;
`

export const ConnectProvider = styled.div`
  padding: 32px 25px;
  cursor: pointer;
  &:not(:first-child) {
    border-top: 1px solid rgba(195, 195, 195, 0.14);
  }
`

export const ConnectProviderTitle = styled.h3`
  font-weight: bold;
  font-size: 24px;
  margin-top: 0.5em;
  color: white;
`

export const ConnectProviderDesc = styled.p`
  font-size: 18px;
  margin: 0.333em 0px;
  color: rgb(169, 169, 188);
`

export default () => { }
