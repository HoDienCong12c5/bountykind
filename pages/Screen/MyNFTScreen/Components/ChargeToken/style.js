import styled from 'styled-components'
import MyButton from 'pages/Components/MyButton'
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
    text-align: center;
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
    @media screen and (max-width: 768px) {
        display: flex;
        flex-flow : column nowrap ;

            input{ 
                width: 100%;
                margin-left: unset;
                margin-bottom: 20px ;
            }
            span {
                margin-top: 20px;
                margin-bottom: 20px;
            }
    }
`

export const ChargeButton = styled(MyButton)`
    margin-top: 10px;
    width: 200px;
    height: 40px;
    border: none;
    outline: none;
    cursor: ${(props) => (props.enable ? 'pointer' : 'not-allowed')};
    color: white;
    border-radius: 5px;
    opacity: ${(props) => (props.enable ? 1 : 0.6)};
  animation: onEnabled 0.25s ease;
    transition: box-shadow 0.25s ease;
    &:hover {
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
    }
    @keyframes onEnabled {
        from {
            opacity: 0.5;
        }
        to {
            opacity: 1;
        }
    }
    &.disabled {
        &:hover {
            box-shadow: none;
        }
        opacity: 0.5;
        cursor: not-allowed;
        animation: onDisabled 0.25s ease;
        @keyframes onDisabled {
            from {
                opacity: 1;
            }
            to {
                opacity: 0.5;
            }
        }
    }
`

export default () => { }
