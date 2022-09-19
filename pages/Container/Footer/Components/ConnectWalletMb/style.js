import styled from 'styled-components'

export const ConnectContainer = styled.div``

export const ConnectHeader = styled.div`
  display: flex;
  padding: 9px 0;
`

export const ConnectTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 0;
  margin-left: 9px;
`

export const ConnectBody = styled.div`
  display: flex;
  flex-direction: column;
`

export const ConnectUsing = styled.p`
  font-size: 15px;
  color: #817E7E;
  margin-top: 10px;
  margin-bottom: 24px;
`

export const ConnectContent = styled.div`
  display: flex;
  justify-content: space-between;
`

export const ConnectProvider = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 0 10px;
  img {
    height: 36px;
  }
  p {
    font-size: 10px;
    font-weight: bold;
    line-height: 150%;
    color: #000;
    margin-top: 12px;
    margin-bottom: 0;
  }
`

export default () => {}
