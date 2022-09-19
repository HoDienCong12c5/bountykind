
import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    background: #1f232b;
    padding-bottom: 50px; 
`
export const MainContainer = styled.div`
width:90%;
margin: 0px auto;
padding-top:50px;
`
export const BackContainer = styled.div`
  width: 98%;
  margin: auto auto;
  padding-top: 40px;
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
    img {
      width: 8px;
      margin-right: 10px;
    }
  }
  @media (max-width: 768px) {
    width: 90%;
  }
`
export default () => {}
