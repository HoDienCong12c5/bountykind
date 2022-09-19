import styled from 'styled-components'
export const EarthContainer = styled.div`
  width: 100%;
  display: flex;
  @media screen and (max-width: 768px) {
    display: unset;
  }
`

export const EarthImage = styled.div`
  background-image: url(${(props) => props.src});
  background-size: contain;
  height: ${(props) => `${props.size}px`};
  width: ${(props) => `${props.size}px`};
  opacity: ${(props) => `${props.opacity ?? 0}px`};
  animation: ${(props) => `${props.isAnimation ? 'rotates' : ''}`} 9s infinite
    linear;
  @keyframes rotates {
    form {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  background-size: contain;
  margin: ${(props) => props.margin ? 'auto' : 'unset'};
`
export const AnimationRoutePage = styled.div`
  opacity: ${(props) => `${props.opacity ?? 1}`};
  animation: ${(props) => `${props.opacity ? 'show' : ''}`} 2s;
  @keyframes show {
    100% {
      opacity: 1;
    }
  }
  width: fit-content;
`
export const RoutePageContainer = styled.div`
  transform: translateY(
      ${(props) => (props.translateY ? `${props.translateY}px` : '0px')}
    )
    translateX(
      ${(props) => (props.translateX ? `${props.translateX}px` : '0px')}
    )
    translateZ(
      ${(props) => (props.translateZ ? `${props.translateZ}px` : '0px')}
    );
    width: fit-content;
    max-width: 100px;
`
export const TitleRoutePage = styled.div`
white-space: nowrap;
  font-size: 13px;
  font-weight: 400;
  color: white;
  text-transform: uppercase;
  transform: translateX(
    ${(props) => (props.XTitlePage ? `${props.XTitlePage}px` : '0px')}
  );
  @media screen and (max-width: 768px) {
    font-size: 12px;
    max-width: 100px;
  }
`
export const TitleRoutePageEspecially = styled.div`
  white-space: nowrap;
  font-size: 12px;
  font-weight: 400;
  color: white;
  text-transform: uppercase;
  transform: translateX(
    ${(props) => (props.XTitlePage ? `${props.XTitlePage}px` : '0px')}
  );
  max-width: 100px;
`
export const LineRoutePage = styled.img`
  height: 90px;
  width: 90px;
  @media screen and (max-width: 568px) {
    height: 45px;
    width: 45px;
  }
`
export const PotionRoutePage = styled.div`
  background-image: url(${(props) => props.src});
  height: 40px;
  width: 40px;
  background-size: contain;
  transform: translateY(
      ${(props) =>
    props.translateYChild ? `${props.translateYChild}px` : '0px'}
    )
    translateX(
      ${(props) =>
    props.translateXChild ? `${props.translateXChild}px` : '0px'}
    )
    translateZ(
      ${(props) =>
    props.translateZChild ? `${props.translateZChild}px` : '0px'}
    );
  &:hover {
    cursor: pointer;
  }
  animation: flash 1s infinite alternate ease;
  @keyframes flash {
    from {
      opacity: 0.2; 
    }
    to {
      opacity: 1;
    }
  }
  @media screen and (max-width: 568px) {
    height: 30px;
    width: 30px;
  }
`

export const Earth2 = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row wrap;
  @media screen and (max-width: 768px) {
    transform: translateY(${(props) =>
    props.translateY ?? 100}px); translateX(50px);
  }
`
export const Tornado = styled.div`
  transform: 
    translateY(${(props) => props.translateY ?? 220}px);
    translateX(${(props) =>
    props.translateX ? `${props.translateX}px` : '0px'})
    translateZ(${(props) =>
    props.translateZ ? `${props.translateZ}px` : '0px'});
  ;
  opacity: ${(props) => `${props.opacity ?? 0}px`};
  src: ${(props) => props.src};
`
export const Earth1 = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row wrap;
  transform: translateY(${(props) => props.translateY ?? 200}px);
  @media screen and(max-width: 768px) {
    transform: translateY(150px);
    flex-flow: column wrap;
  }
`
export const EarthMobile = styled.div`
  width: 100%;
  background-image: url(${(props) => props.src});
  background-size: contain;
`
export const UniverseContainer = styled.div`
background-image: url("${(props) => props.src}");
  min-height: ${(props) => `${props.sizeMin}px`};
`
export default () => {}
