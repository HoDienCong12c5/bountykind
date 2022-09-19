
import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  background: transparent ;
  height: 100%;
  color: white;
  min-height: 100vh;
`
export const MainContainer = styled.div`

    width: 100%;
  display: flex;
  flex-flow: column wrap;
  max-width: 1550px;
  margin:0 auto;
   @media screen and (max-width: 1700px) {
    max-width: 1350px;

    padding: 0 50px;
   }
   @media screen and (max-width: 768px) {
    padding: 0 20px;
   }
`
export const BackContainer = styled.div`
  width: 100%;
  margin: auto auto;
  padding-top: 60px;
  padding-bottom: 20px;
  display: flex;
  align-items: center;
  button {
    background: none;
    border: none;
    outline: none;
    color: white;
    font-weight: bold;
    font-size: 15px;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding-left:0px;
    img {
      margin-right: 10px;
    }
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`
export const PaginationContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 40px;
  padding-bottom: 40px;
`
export default () => { }
