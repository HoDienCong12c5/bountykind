import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
`

export const Title = styled.h1`
    margin-top: 20px;
    text-transform: uppercase;
    margin-bottom: 20px;
`

export const Description = styled.h1`
    width: 100%;
    text-align: left;
    margin-bottom: 20px;
    font-size: 14px;
    color: rgba(0,0,0,0.5);
`

export const BalanceHolder = styled.div`
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-end;
    align-items: center;
    font-weight: bold;
    font-size: 15px;
`

export const InputContainer = styled.div`
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    font-weight: bold;
    input{
        width: 50px;
        margin-left: 50px;
        flex:1;
        border: 2px solid rgba(0,0,0,0.2);
        padding-left: 10px;
        padding-top: 5px;
        padding-bottom: 5px;
        outline: none;    
        font-size: 16px;
    }
`

export const ChargeButton = styled.button`
    margin-top: 30px;
    width: 200px;
    height: 40px;
    border: none;
    outline: none;
    cursor: pointer;
    background: #673ab7;
    color: white;
    border-radius: 5px;
`

export default () => {}
