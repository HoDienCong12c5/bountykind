import styled from 'styled-components'
export const TitleText = styled.div`
  font-size: ${(props) => `${props.size ?? 24}px`};
  color: ${(props) => props.color ?? '#FFFFFF'};
  font-weight: ${(props) => props.fontWeight ?? 'bold'};
  text-transform: ${(props) => (props.textTransform ? 'uppercase' : 'none')};
  @media screen and (max-width: 768px) {
    font-size: ${(props) => `${props.size ?? 24}px`};
  }
`
export const MediumText = styled.div`
  font-size: ${(props) => `${props.size ?? 16}px`};
  color: ${(props) => props.color ?? '#FFFFFF'};
  font-weight: ${(props) => props.fontWeight ?? 300};
  text-transform: ${(props) => (props.textTransform ? 'uppercase' : 'none')};
  @media screen and (max-width: 768px) {
    font-size: ${(props) => `${props.size ?? 16}px`};
  }
`
export const NormalText = styled.div`
  font-size: ${(props) => `${props.size ?? 13}px`};
  color: ${(props) => props.color ?? '#FFFFFF'};
  font-weight: ${(props) => props.fontWeight ?? 300};
  text-transform: ${(props) => (props.textTransform ? 'uppercase' : 'none')};
  @media screen and (max-width: 768px) {
    font-size: ${(props) => `${props.size ?? 12}px`};
  }
  opacity: ${(props) => (props.opacity ? 0.7 : props.opacitySize ?? 1)};
`

export default () => {}
