import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  background: rgba(0, 0, 0, 0.9);
  color: white;
`
export const Banner = styled.div`
  width: 100%;
  height: calc(100vh - 50px);
  background-size: cover;
  background-image: url("${(props) => props.src}");  
  padding: 20px 0;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  text-align: center;
  opacity: 0.7;
`
export const ContentContainer = styled.div`
  background-image: url('https://images4.alphacoders.com/103/1033507.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  margin: auto;
  display: flex;
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: absolute;
  align-self: center;
  top: 0;
`
export const Content = styled.div`
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  height: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: row;
  padding: 20px;
`
export const Right = styled.div`
  width: 600px;
  max-width: 70%;
  color: white;
  align-items: center;
  justify-content: center;
  text-align: center;
  word-wrap: break-word;
  work-break: break-all;
`
export const Left = styled.div` 
  text-align: start;
  width:300px;
`
export const ItemCharacter = styled.div`
  width: 150px;
  height: 150px; 
  display: flex;
  background-image: url(${(props) => props.src});
  background-size: contain;
  background-position: center;
  border-radius: 5px;
  background-repeat: no-repeat;
  margin: 5px;
  border: 1px solid #9b9292;
  &:hover {
    cursor: pointer;
  }
`
export const ImgCharacter = styled.div`
  background-image: url(${(props) => props.src});
  width: 200px;
  height: 200px;
`
export const LeftContent = styled.div``
export const TitleInfor = styled.div`
  font-size: 20px;
  font-weight: 800;
  display: flex;

  margin-left: 20px;
  width: 80px;
`
export const ContentInfor = styled.div`
  font-size: 16px;
  margin-left: 20px;
`
export const InforDetail = styled.div`
  display: flex;
  align-items: flex-end;
`

export const ImgCard = styled.div`
  background-image: url(${(props) => props.src});
  width: 300px;
  height: 300px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  margin-bottom: 20px;
  animation: rotate 4s infinite ease-in-out;
  &:hover{
    animation: none;
  }
  @keyframes rotate {
    from {
      transform: rotateY(0);
    }
    to{
      transform: rotateY(360deg);
    }
  }
`
export const ButtonCustom = styled.button`
  display: flex;
  align-items: flex-end;
  color: white;
  background-color: ${(props) => props.isCancel ? '#CC3333' : '#0000DD'};
  margin-right:15px;
  padding: 10px 25px;
  border-radius: 10px;
  opacity: ${(props) => props.isDisable ? 1 : 0.4};
  disabled: ${(props) => props.isDisable ? 'true' : 'false'};
`

export default () => {}
