import styled from 'styled-components'

import { NormalText } from 'pages/Components/TextSize'
export const ButtonContent = styled.div`
  -moz-user-select: none !important;
  -webkit-touch-callout: none !important;
  -webkit-user-select: none !important;
  -khtml-user-select: none !important;
  -moz-user-select: none !important;
  -ms-user-select: none !important;
  user-select: none !important;
  --r: 16px; /* radius */
  --b: 1px; /* border width */
  background: ${(props) => props.backgroundColor};
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
  z-index: 0;
  text-decoration: none;
  width: fit-content;
  padding: 6px 12px;
  &::before {
    content: "";
    position: absolute;
    z-index: -1;
    inset: 0;
    border: var(--b) solid transparent;
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

  &.isSelected {
    color: ${(props) =>
    props.backgroundColor === 'white' ? 'black' : 'white'};
    -webkit-text-fill-color: ${(props) =>
    props.backgroundColor === 'white' || props.backgroundColor === 'Yellow'
      ? 'black'
      : 'white'};
    -webkit-background-clip: border-box;
    background-clip: border-box;
    cursor: pointer;
  }
  &.hasHover {
    &:hover {
      color: ${(props) =>
    props.backgroundColor === 'white' || props.backgroundColor === 'Yellow'
      ? 'black'
      : 'white'};
      -webkit-text-fill-color: ${(props) =>
    props.backgroundColor === 'white' || props.backgroundColor === 'Yellow'
      ? 'black'
      : 'white'};
      cursor: pointer;
      .icon-button {
        background-image: url(${(props) => props.iconHover ?? ''});
      }
    }
    &:hover::before {
      -webkit-mask: none;
      opacity: 0.7;
    }
  }
  opacity: ${(props) => props.opacity};
`
export const Title = styled(NormalText)`
  font-family: URW DIN Arabic;
  text-transform: ${(props) =>
    props.textTransform ? 'uppercase' : 'capitalize'};
`

export const IconButtonCustom = styled.div`
  height: 15px;
  width: 15px;
  background-image: url(${(props) => props.urlIcon});
  background-size: contain;
  margin-right: 5px;
`
export default () => {}
