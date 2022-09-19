import styled from 'styled-components'

export const Container = styled.div`
    ${'' /* position: absolute;
    min-width: 50px;
    top: 20px;
    left: 34%; */}
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
