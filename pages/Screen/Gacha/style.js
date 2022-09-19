import styled from 'styled-components'
import { TitleText } from 'pages/components/TextSize'
export const Container = styled.div`
  width: 100%;
  background: rgba(0, 0, 0, 0.9);
  height: 100%;
  // animation: circle 1s linear;  
  position: relative;

  @keyframes circle {
    from {
      opacity: 0;
      transform: scale(0);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
  }
`

export const MainContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-flow: column wrap;
  max-width: 1550px;
  z-index: 2;
  position: relative;
  margin: 0 auto;  
  @media screen and (max-width: 1700px) {
    max-width: 1350px;
    width: 100%;
    padding: 0 50px;
  }
  @media screen and (max-width: 768px) {
    max-width: none;
    width: 100%;
    padding: 0 20px;
    display: flex;
  }

`

export const Title = styled(TitleText)`
  font-weight: bold;
  font-size: 30px;
  margin-top: 50px;
  margin-bottom: 40px;
  @media screen and (max-width: 768px) {
    padding-left: 0px;
    text-align: center;
  }
`

export const MachinesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  gap: 20px;
  @media screen and (max-width: 768px) {
    padding-left: 0px;

    align-items: center;
    justify-content: center;
  }
`

export const Machine = styled.div`
  width: 280px;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  overflow: hidden;
  border-radius: 16px;
  padding: 26px;
  border: 1px solid #ffff;

`

export const MachineHeader = styled.div`
  width: 100%;
  height: 30px;
  font-weight: bold;
  color: white;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-end;
  align-items: center;
`

export const ImageContainer = styled.div`
    background-image: url("${(props) => props.image}");
    height: 200px;
    width: 98%;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
`

export const Name = styled.div`
  width: 100%;
  color: white;
  font-weight: bold;
  font-size: 14px;
  margin-top: 26px;
  transform:uppercase;
`

export const SelectButton = styled.button`
  width: 100%;
  height: 40px;
  color: white;
  font-weight: bold;
  background: #1877f2;
  border: none;
  outline: none;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;
  font-size: 14px;
  filter: brightness(60%);
  margin-bottom: 10px;
  transition: filter 0.25s ease;
  &:disabled {
    background: rgba(255, 255, 255, 0.25);
    filter: brightness(100%);
    cursor: not-allowed;
    &:hover {
      filter: brightness(100%);
    }
  }
  &:hover {
    filter: brightness(100%);
  }
`

export default () => {}
