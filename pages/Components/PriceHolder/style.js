import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-flow: row;
    align-items: flex-end;
    justify-content:${props => props.align === 'center' ? 'center' : props.align === 'left' ? 'flex-start' : 'flex-end'};
`
export const Icon = styled.img`
    width: 31px;
    height: 31px;
    margin-top: 5px;
`
export const TokenPrice = styled.p`
    font-size: 36px;
    color: #ffff;
    font-weight: 700;
    margin-bottom: -12px;
    padding-left: 7px;
    padding-right: 7px;
`
export const UsdPrice = styled.p`
    font-size: 15px;
    color: #ffff;
    font-weight: 400;
    opacity: 0.5;
    margin-bottom: -3px;
`
export default () => {}
