import styled, { css } from 'styled-components'

const DropdownLang = styled.a`
  height: 56px;
  display: inline-block;
  position: relative;
  top: 0;
  padding-left: 15px;
  @media screen and (min-width: 769px) {
    height: 66px;
    top: 0;
  }
`

const LangItem = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  transition: 0.3s all;
  &:hover {
    color: #FFF;
    text-decoration: underline;
  }
  ${props => css`
    color: ${props.isSelected ? `#FFF` : '#FFF'};
  `}
  opacity: ${props => props.isSelected ? 1 : 0.6};
  .flags {
    width: 20px;
  }
`

export { DropdownLang, LangItem }

export default () => {}
