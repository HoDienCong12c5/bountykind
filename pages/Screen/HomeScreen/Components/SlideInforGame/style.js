import styled from 'styled-components'
import { NormalText } from 'pages/Components/TextSize'
export const ContainerSlide = styled.div`
    width: 100%; 
    background-color: black;
    z-index: 1000;
    // transform: translateY(-180px);
    position: relative;
    top:-20px;NormalText
`
export const ImageBanner = styled.div`
    background-image: url(${props => props.src});
    background-color:black;
    background-size: contain;
    // height: calc(100vh - 50px);
    width: 80%;
    text-align:center;
    margin:auto;
    animation: show 4s infinite alternate ease ;
    @media screen and (max-width: 1399px) {
        width: 90%;
    }
    @keyframes show {
        from{
            opacity:0;
        }
        to{
            opacity:1
        }
    }

`
export const ImageBannerS = styled.img`
    width: 80%;
    height: calc(100vh - 50px);
    margin:auto;
    animation: show 4s infinite alternate ease ;
    animation-delay:${props => props.timeStartAnimation ?? 0}s;
    @media screen and (max-width: 1399px) {
        width: 90%;
    }
    @media screen and (max-width: 768px) {
        height: calc(60vh - 50px);
    }
    @keyframes show {
        from{
            opacity:0;
        }
        to{
            opacity:1
        }
}

`
export const TitleBanner = styled(NormalText)`
    color: white;
    width: 100%; 
    margin: auto;
    opacity: 0;
    top:75% ;
    position: absolute;
    animation: dich_chuyen 4s ease alternate infinite;  ;
    animation-delay: 1s;
    text-align: center;
    @keyframes dich_chuyen {
        0%{
            opacity: 0;
        }
        100%{
            opacity: 1;
        }
    }
    @media screen and (max-width: 768px) {
        font-size: 14px;
        top:65% ;
    }
`
export const PositionBanner = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    background-color: transparent;
    position: relative;
    transform: translateY(-80px);
`
export const Position = styled.div`
    height: 3px;
    width: 30px;
    background-color: white;
    opacity: 0.2;
    margin-right: 5px;
    &.isSelected{
        opacity: 1;
    }
`
export const IconManagerSlide = styled.div`
   background-image: url("${(props) => props.src}");
    height: 40px;
    width: 40px;
    background-size: contain;
    text-align:right;
`
export default () => {}
