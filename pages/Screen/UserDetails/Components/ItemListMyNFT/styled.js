import styled from 'styled-components'
import StatusBox from 'pages/Components/Marketplace/StatusBox'

import { Row } from 'antd'
export const NFTDetails = styled.div`
position: relative;
background: #1f232b;
border-radius: 6px;
display: flex;
flex-flow: column wrap;
padding: 20px 10px;
cursor: pointer;
transition: transform 0.25s ease, border 0.25s ease, box-shadow 0.25s ease;
box-sizing: border-box;
border: 2px solid;
border-image: linear-gradient(0deg, #fc5c7d, #6a82fb);
border-image-slice: 1;
width: 210px;
height: 380px;
&:hover {
  box-shadow: 0px 0px 10px 0px rgba(255, 255, 255, 0.25);
  transform: translate(0, -5px);
  animation: onHoverAnimation 1s infinite alternate ease;
}

@keyframes onHoverAnimation{
  0%{
    border: 2px solid;
    border-image: linear-gradient(0deg, #fc5c7d, #6a82fb);
    border-image-slice: 1;
  }
  10% {
    border: 2px solid;
    border-image: linear-gradient(36deg, #fc5c7d, #6a82fb);
    border-image-slice: 1;
  }
  20% {
    border: 2px solid;
    border-image: linear-gradient(72deg, #fc5c7d, #6a82fb);
    border-image-slice: 1;
  }
  30%{
    border: 2px solid;
    border-image: linear-gradient(108deg, #fc5c7d, #6a82fb);
    border-image-slice: 1;
  }
  40%{
    border: 2px solid;
    border-image: linear-gradient(144deg, #fc5c7d, #6a82fb);
    border-image-slice: 1;
  }
  50%{
    border: 2px solid;
    border-image: linear-gradient(180deg, #fc5c7d, #6a82fb);
    border-image-slice: 1;
  }
  60%{
    border: 2px solid;
    border-image: linear-gradient(216deg, #fc5c7d, #6a82fb);
    border-image-slice: 1;
  }
  70%{
    border: 2px solid;
    border-image: linear-gradient(252deg, #fc5c7d, #6a82fb);
    border-image-slice: 1;
  }
  80%{
    border: 2px solid;
    border-image: linear-gradient(288deg, #fc5c7d, #6a82fb);
    border-image-slice: 1;
  }
  90%{
    border: 2px solid;
    border-image: linear-gradient(324deg, #fc5c7d, #6a82fb);
    border-image-slice: 1;
  }
  100% {
    border: 2px solid;
    border-image: linear-gradient(360deg, #fc5c7d, #6a82fb);
    border-image-slice: 1;
  }
}
`
export const Level = styled.div`
  font-size: 16px;
  width: 100%;
  display: flex;
  justify-content: center;
`
export const AvatarNFT = styled.div`
  width: 150px;
  height: 200px;
  margin: 0px auto;
  background-image: url(${(props) => props.src});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`
export const TypeToken = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column wrap;
`
export const NameToken = styled.div`
  font-size: 16px;
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: 600;
`

export const NFTContainer = styled(Row)`
    gap:30px;
`
export const StatusBoxCustom = styled(StatusBox)`
  transform: translateX(10000%) 
`

export const StatusBoxBasic = styled.div`
    position: absolute;
    width: 50px;
    height: 28px;
    background: red;
    transform: translateX(84%) translateY(-35px);
    background: #bc4e9c;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #f80759, #bc4e9c);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #f80759, #bc4e9c); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    font-weight: bold;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    font-size: 12px;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.5);
    border: 2px solid white;
    filter: brightness(95%);
    text-transform: uppercase;
`

export default () => {}
