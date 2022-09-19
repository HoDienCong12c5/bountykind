import styled from 'styled-components'
import { MediumText, TitleText, NormalText } from 'pages/Components/TextSize'
import ButtonFilter from 'pages/Components/ButtonFilter'
import { DivAll } from 'pages/Components/DivBasic'
export const NftContainerMode1 = styled(DivAll)`
  position: relative;
  background: transparent;
  align-self: stretch;
  display: flex;
  flex-flow: column wrap;
  cursor: pointer;
  transition: transform 0.25s ease, border 0.25s ease, box-shadow 0.25s ease;
  box-sizing: border-box;
  border-image-slice: 1;
  border-radius: 16px;
  width: 100%;
  padding: 12px 16px;
  &.not-nft {
    --r: 16px; /* radius */
    --b: 2px; /* border width */
    background: linear-gradient(
      0deg,
      rgba(221, 94, 228, 0.8),
      rgba(32, 231, 249, 0.8)
    );
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    border-radius: var(--r);

    position: relative;
    z-index: 0;
    text-decoration: none;
    min-width: 80px;
    border: none !important;

    &::before {
      content: "";
      position: absolute;
      z-index: -1;
      inset: 0;
      border: 2px solid transparent;
      border-radius: var(--r);
      background: inherit;
      background-origin: border-box;
      background-clip: border-box;
      -webkit-mask: linear-gradient(#fff 0 0) padding-box,
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      -webkit-mask-repeat: no-repeat;
    }
  }
  &:hover {
  }

  @keyframes onHoverAnimation {
    0% {
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
    30% {
      border: 2px solid;
      border-image: linear-gradient(108deg, #fc5c7d, #6a82fb);
      border-image-slice: 1;
    }
    40% {
      border: 2px solid;
      border-image: linear-gradient(144deg, #fc5c7d, #6a82fb);
      border-image-slice: 1;
    }
    50% {
      border: 2px solid;
      border-image: linear-gradient(180deg, #fc5c7d, #6a82fb);
      border-image-slice: 1;
    }
    60% {
      border: 2px solid;
      border-image: linear-gradient(216deg, #fc5c7d, #6a82fb);
      border-image-slice: 1;
    }
    70% {
      border: 2px solid;
      border-image: linear-gradient(252deg, #fc5c7d, #6a82fb);
      border-image-slice: 1;
    }
    80% {
      border: 2px solid;
      border-image: linear-gradient(288deg, #fc5c7d, #6a82fb);
      border-image-slice: 1;
    }
    90% {
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
  @media screen and (max-width: 768px) {
    padding: 16px;
  }
`

export const NftContainerMode2 = styled(NftContainerMode1)`
  position: relative;
  width: 95%;
  margin-left: 20px;
  height: 125px;
  flex-flow: row wrap;
  @media (max-width: 768px) {
    margin: auto auto;
    width: 100%;
  }
`

export const TopMode1 = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  pointer-events: none;
`

export const TopMode2 = styled(TopMode1)`
  width: 20%;
  justify-content: center;
`

export const TopInfo = styled.div`
  width: 100%;
  padding-left: 10px;
  color: white;
  pointer-events: none;
  font-weight: bold;
`

export const ImageWrapperMode1 = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  height: 160px;
  margin-top: 26px;
  background-image: url(${(props) => props.image});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  /* @media (max-width: 1699px) {
   height: 140px;
    margin:0px auto;
    margin-top:20px;
  }
  @media (max-width: 1350px) {
   height: 140px;
    margin:0px auto;
    margin-top:20px;
    margin-bottom:6px
  }
   @media (max-width: 768px) {
   height: 130px;
    margin:0px auto;
    margin-top:20px;
    margin-bottom:12px
  } */
  @media (max-width: 1699px) {
   height: 130px;
  }

`

export const ImageWrapperMode2 = styled(ImageWrapperMode1)`
  width: 1%;
  justify-content: flex-start;
  margin: auto auto;
  height: 100%;
  background-image: url(${(props) => props.image});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`

export const BottomMode1 = styled(TitleText)`
  width: 100%;
  pointer-events: none;
`

export const BottomMode2 = styled(BottomMode1)`
  flex: 1;
  height: 100%;
  display: flex;
`

export const PriceHolderMode1 = styled(TitleText)`
  width: 100%;
  display: flex;
  font-weight: bold;
  color: white;
  pointer-events: none;
  letter-spacing: 0.5px;
  line-height: 1.5;
`

export const PriceHolderMode2 = styled(PriceHolderMode1)`
  justify-content: flex-end;
  padding-right: 10px;
`
export const ContainerStatus = styled.div`
  position: absolute;
  top: -10px;
  textalign: "center" !important;
  width: "100%";
  left: 0;
  justifycontent: "center";
  alignitems: "center";
  display: "flex";
`
export const ContentStatus = styled.div`
  width: 'max-content';
   text-align: 'center';
   padding: 0px 5px 0px 5px;
 background: #bc4e9c;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right,rgba(221, 94, 228, 1), rgba(32, 231, 249, 1));  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right,rgba(221, 94, 228, 1), rgba(32, 231, 249, 1))  !important; /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
   font-weight: bold;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.5);
    filter: brightness(85%);
`
export const IdNft = styled(MediumText)`
  position: absolute;
  color: #c4a5f8;
  top: 10px;
  left: 12px;
`
export const DescriptionNft = styled(ButtonFilter)`
  margin: auto;
`
export const NameNft = styled(NormalText)`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
export default () => {}
