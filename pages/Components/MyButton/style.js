import styled from 'styled-components'

export const Button = styled.div`
  border-radius: 5px;
  padding: 5px 15px;
  margin-right: 10px;
  color: black;
  cursor: pointer;
  font-size: 13px;
  font-weight: bold;
  background: #c9d6ff; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #e2e2e2,
    #c9d6ff
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #e2e2e2,
    #c9d6ff
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  &:hover{
    box-shadow: -3px -3px 5px 0px rgba(255, 255, 255, 0.55);
    animation: shadowAnimation 0.6s ease infinite;
    filter: brightness(105%);
  }
  @keyframes shadowAnimation {
      0% {
        box-shadow: -3px -3px 5px 0px rgba(255, 255, 255, 0.55);
      }
      12% {
        box-shadow: 0px -3px 5px 0px rgba(255, 255, 255, 0.55);
      }
      25% {
        box-shadow: 3px -3px 5px 0px rgba(255, 255, 255, 0.55);
      }
      37.5%{
        box-shadow: 3px 0px 5px 0px rgba(255, 255, 255, 0.55);
      }
      50%{
        box-shadow: 3px 3px 5px 0px rgba(255, 255, 255, 0.55);
      }
      62.5%{
        box-shadow: 0px 3px 5px 0px rgba(255, 255, 255, 0.55);
      }
      75%{
        box-shadow: -3px 3px 5px 0px rgba(255, 255, 255, 0.55);
      }
      87.5%{
        box-shadow: -3px 0px 5px 0px rgba(255, 255, 255, 0.55);
      }
      100%{
        box-shadow: -3px -3px 5px 0px rgba(255, 255, 255, 0.55);
      }
  }
`

export default () => {}
