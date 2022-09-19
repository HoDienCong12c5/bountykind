import styled from 'styled-components'
import MyButton from 'pages/Components/MyButton'
export const Container = styled.div`
  width: 100%;
  color: white;
  /* overflow: scroll; */
`
export const ContainerContent = styled.div`
  width: 100%;
  color: white;
  height: 100%;
 margin: 0 auto;
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
`
export const Banner = styled.div`
  width: 100%;

  background-size: cover;

  padding: 20px 0;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  text-align: center;
  opacity: 0.7;
`
export const ContentContainer = styled.div`
  /* background-image: url('https://ipfs.pantograph.app/ipfs/QmRCuDUYGLyr8UYbxKSCYwGsgu3Z7aHrJaYU4jVD9ZxCCX?filename=Frame%20592.png');
  background-size: cover;
  background-repeat: no-repeat; */
  width: 100%;
  min-height: calc(100vh - 50px);
  height: 100%;
  padding: 0px;
  position: relative;
`
export const Content = styled.div`
  width: 80%;
  height: auto;
  align-items: center;
  justify-content: center;
  display: flex;
  margin: 0 auto;
  gap: 30px;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    ${''}
  }
`
export const ListCharacterDetails = styled.div`
  padding: 12px 16px;
  margin-top: 30px;
  max-width: 1210px;
    margin: auto;
`
export const CharacterDetails = styled.div`
  display: flex;
  flex-flow: row wrap;
  min-width: 600px;
  gap:20px;;
  justify-content: center;
  width: 100%;
  @media screen and (max-width: 768px) {
    flex-flow: colum wrap;
    min-width: unset;
  }

`
export const ImgCharacter = styled.div`
  width: calc(20% - 5px);
  height: inherit;
  border: 1px solid white;
  border-radius: 16px;
  padding: 10px 5px;
  @media screen and (max-width: 768px) {
    width: 200px;
    /* height: 100px; */
  }
`
export const ImgCard = styled.div`
  background-image: url(${(props) => props.src});
  width: 100%;
  height: 100%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  margin-bottom: 20px;
  animation: rotate 4s infinite ease-in-out;
  &:hover {
    animation: none;
  }
  @keyframes rotate {
    from {
      transform: rotateY(0);
    }
    to {
      transform: rotateY(360deg);
    }
  }
  @media screen and (max-width: 768px) {
    height: 200px;
  }
`
export const InforCharacter = styled.div`
  width: calc(60% );
  border: 1px solid #fff;
  border-radius: 16px;
  padding-top: 20px;
  padding-left: 15px;
  @media screen and (max-width: 768px) {
    width: 95%;
  }
`
export const Line = styled.div`
  border-bottom: 1px solid rgba(255, 255, 255, 1);
  width:calc(90% );
  max-width: 970px;
  margin: auto;
  

  
`
export const ListCharacter = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`

export const ItemCharacter = styled.div`
  border: 1px solid white;
  border-radius: 16px;
  padding: 10px 5px;
  opacity: ${(props) => (props.opacity ? 1 : 0.5)};
`
export const ContentCharacter = styled.div`
  width: 140px;
  height: 160px;
  display: flex;
  background-image: url(${(props) => props.src});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  justify-content: end;
  flex-wrap: wrap;
  &:hover {
    cursor: pointer;
  }
  @media screen and (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
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
  font-size: 20px;
  margin-left: 20px;
  width: max-content;
`
export const InforDetail = styled.div`
  display: flex;
  align-items: flex-end;
`

export const ButtonCustom = styled.button`
  display: flex;
  align-items: flex-end;
  color: white;
  background-color: ${(props) =>
    props?.isTransparentBackground
      ? 'transparent'
      : props.isCancel
        ? '#CC3333'
        : '#0000DD'};
  margin-right: ${(props) => (props.noMarginRight ? 0 : '15px')};
  padding: 10px 25px;
  border-radius: 10px;
  opacity: ${(props) => (props.isDisable ? 1 : 0.4)};
  disabled: ${(props) => (props.isDisable ? 'true' : 'false')};
`
export const OptionSelectButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin: 12px 0;
`
export const ButtonNoThanks = styled(MyButton)``
export const ButtonSelect = styled(MyButton)`
  width: 110px;
  background: linear-gradient(90deg, #2c91c0 0%, #5bcbe4 100%);
  :focus {
    opacity: 0.8;
    color: white;
    background: linear-gradient(90deg, #2c91c0 0%, #5bcbe4 100%);
    transition: opacity 0.4s ease-out 1s;
  }
  :hover {
    background: linear-gradient(90deg, #2c91c0 0%, #5bcbe4 100%);
    color: white;
  }
  @media screen and (min-width: 768px) {
    margin-right: 30px;
  }
  &:hover {
    opacity: 1;
    cursor: 'pointer';
  }
`
export const ButtonContainer = styled.div`
  text-align: center;
  margin: 15px 0px;
  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    padding: 10px;
  }
  button {
    min-width: auto;
    font-size: 12px;
    line-height: 20px;
    height: 50px;
    letter-spacing: 0.05em;
    font-weight: 600;
    color: #ffffff;
    text-transform: uppercase;
    @media screen and (max-width: 768px) {
      width: 50%;
    }
  }
`
export default () => {}
