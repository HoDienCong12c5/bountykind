import styled from 'styled-components'

export const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  padding-top: 50px;
  background: rgba(0, 0, 0, 1);
  padding-bottom: 50px;
`

export const DetailsContainer = styled.div`
  width: 85%;
  display: flex;
  justify-content: space-between;; 
  padding: 30px;
  flex-flow: row wrap;
  margin: auto auto;
  @media (max-width: 768px) {
    width: 90%;
    flex-flow: column wrap;
  }
`

export const LeftDetailsContainer = styled.div`
  width: 48%;
  display: flex;
  flex-flow: column wrap;
  @media (max-width: 768px) {
    width: 100%;
  }
`

export const RightDetailsContainer = styled.div`
  width: 47%;
  display: flex;
  flex-flow: column;
  background: #1c1f25;
  border: 1px solid #282c34;
  padding: 30px; 
  height: 10%;
  max-height: 100%;
  border-radius: 10px;
  @media (max-width: 768px) {
    width: 100%;
    margin-top:15px;
  }
`

export const BackContainer = styled.div`
  width: 80%;
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

export const ImageWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border : 1px solid #282c34;
  border-radius: 15px;
  img {
    max-width: 95%;
    max-height: 95%;
  } 
  padding:10px;
  // animation: twirl 1s alternate infinite ease; 
  @keyframes twirl{
    from{ 
      box-shadow: 0px ;
    }
    to{ 
      box-shadow: 0px 5px 50px 5px #999999;
    }
  }
`

export const NftName = styled.div`
  width: 100%;
  font-weight: bold;
  font-size: 16px;
  color: white;
  padding-bottom: 10px; 
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`

export const OptionToken = styled.div`
  width: 100%;
  font-weight: bold;
  font-size: 16px;
  color: white;
  padding-bottom: 10px; 
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`

export const TypeToken = styled.div`
  width: 100%;
  font-weight: bold;
  font-size: 24px;
  color: white;
  display: flex;
  text-align: center;
  align-items: center;
  margin-bottom: 20px;
`

export const MyButton = styled.button`
  width: 100%;
  min-width: 100px;
  border: none;
  margin-top:10px;
  margin-right:10px;
  outline: none;
  background: #1877F2;
  color: white;
  font-weight: bold;
  font-size: 15px;
  border-radius: 6px;
  padding-top: 15px;
  padding-bottom: 15px;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.25s ease;
  &:hover {
    opacity: 1;
  }
  // animation: flicker 1s ease infinite alternate;
  @keyframes flicker{
    from{
      background: #1877F2;
      box-shadow: 0px ;
    }
    to{
      background:#0B0838;
      box-shadow: 0px 2px 50px 2px #999999;
    }
  }
`
export const ButtonEx = styled.button`
  width: 100%; 
  min-width: 100px;
  border: none;
  margin-top:10px;
  margin-right:10px;
  outline: none;
  background: #1877F2;
  color: white;
  font-weight: bold;
  font-size: 15px;
  border-radius: 6px;
  padding-top: 15px;
  padding-bottom: 15px;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.25s ease;
  &:hover {
    opacity: 1;
  }
`

export const OptionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-description: row wrap;
  word-wrap: break-word;
  word-break: break-all;
  @media (max-width: 1025px) {
    display:unset;
    margin-right:20px;
  }
`
export const PropsDetails = styled.div`
  font-size: 18px;
  color: white;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`
export const Line = styled.div`
border-bottom: 1px solid rgba(255, 255, 255, 0.2);
margin-bottom: ${(props => props.marginBottom || '0px')};
`

export const TextContent = styled.span`
  font-size: 16px;
  color: white;  

`
export const BigTitle = styled.div`
  margin: 15px 0px; 
  font-size: 18px;
  font-weight: 600;
  color: white;

`
export const InputPrice = styled.input`

`
export const InputWrapper = styled.div`
  width: 100%;
  @media screen and (max-width: 768px) {
    width: 100%;
    margin-top: 10px;
  }
  .ant-row{
    padding: 0px;
    margin:0px;
  }
  .ant-input-affix-wrapper{
    &:hover {
      background-color: #192234;
    }
  }
  .ant-input-affix-wrapper-focused{
    box-shadow: 0 0 0 1px rgb(24 119 242 / 20%);
  }
  .input {
    max-width: 100%;
    border: none;
    border-radius: unset;
    box-shadow: 0 0 0 2px rgb(24 119 242 / 20%);
    @media screen and (max-width: 768px) {
      max-width: none;
    } 
    background: transparent;
    .ant-input {
      background: transparent; 
      font-weight: bold;
      font-size: 18px;
      color: #ffffff; 
    }
    .ant-input-suffix {
      margin: 0 5px;
    }
  }
`
export const ContainerToken = styled.div`
margin-top: 20px;
margin-bottom: 20px;
  
`
export const ImgToken = styled.img`

  &:hover{
    cursor: pointer;
    transform: translate(0, -5px);
  }
  
`

export default () => {}
