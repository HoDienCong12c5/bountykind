import styled from 'styled-components'
export const BannerContainer = styled.div`
    width: 100%;
  height: ${props => props.height ? `${props.height}px` : '100vh'};
    background-size: cover;
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    justify-content: center;
    background-image: url("${(props) => props.src}");
    text-align: center;
    @media screen and (max-width: 768px) {
        height: auto;
        justify-content: flex-end;
        background-size: contain;
    }
`
export const BannerContainerMobile = styled.div`
  width: 100%;
  height: ${(props) => `${props.height}px`};
`
export const BannerContent = styled.div`
  text-align: left;
  margin-right: 350px;
  padding: 0px;
  @media screen and (max-width: 768px) {
    margin: auto;
    max-width: 100%;
    width: unset;
  }
  @media screen and (max-width: 568px) {
    width: 90%;
  }
`
export const BannerContentMobile = styled.div`
  width: 90%;
  margin: auto;
  height: ${(props) => `${props.height}px`};
  margin-top: ${(props) => `${props.marginTop}px`};
`
export const BannerBigImg = styled.img`
  width: ${props => props.height ? `${props.height}px` : '450px'};;
  position: relative;
  @media screen and (max-width: 768px) {
    height: 50%;
    width: 50%;
  }
`
export const BannerBGMobile = styled.img`
  width: 100%;
  position: absolute;
`
export const BtnTest = styled.div`
    --r:16px; /* radius */
    --b:1px; /* border width */
    background: linear-gradient(to right, red 0%, green 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
    border-radius: var(--r);
    display: flex;
    align-items: center;
    justify-content: center;
    font: 13px URW DIN Arabic;

    position: relative;
    z-index:0;
    text-decoration: none;
    min-width: 80px;
    padding: 5px 10px;
  &::before {
    content:"";
    position:absolute;
    z-index:-1;
    inset: 0;
    border: var(--b) solid transparent;
    border-radius: var(--r);
    background: inherit;
    background-origin: border-box;
    background-clip: border-box;
    -webkit-mask:
      linear-gradient(#fff 0 0) padding-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
            mask-composite: exclude;
    -webkit-mask-repeat: no-repeat;
  }
  &:hover {
    color: #fff;
    -webkit-text-fill-color: #fff;
    -webkit-background-clip: border-box;
    background-clip: border-box;
    cursor: pointer;
  }
  &.isSelected{
    color: #fff;
    -webkit-text-fill-color: #fff;
    -webkit-background-clip: border-box;
    background-clip: border-box;
    cursor: pointer;
  }
  
  &:hover::before {
    -webkit-mask:none;
  }
`
export const BtnTestChild = styled.div`
  width: 100%;
  height: 100%;
  background-color: #191a28;
  border-radius: inherit;
  text-transform: uppercase;
  // background: linear-gradient(to right, #30cfd0 0%, #330867 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font: {
    size: 20vw;
    family: $font;
  }
`
export const ImgBackground = styled.img`
  width: 100%;
  position: absolute;
  
`

export default () => {}
