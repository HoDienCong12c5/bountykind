import styled from 'styled-components'
import MyButton from 'pages/Components/MyButton'
import { MediumText, NormalText, TitleText } from 'pages/Components/TextSize'
export const Container = styled.div`
    width: 100%;
    color: white;

`

export const Title = styled(TitleText)`
    margin-top: 20px;
    text-transform: uppercase;
    margin-bottom: 20px;
`

export const Description = styled(NormalText)`
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
    opacity: 0.5;
`

export const BalanceHolder = styled(NormalText)`
    width: 100%;
    display: flex;
    flex-flow: row wrap;
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
    border: 1px solid rgba(255, 255, 255, 1);
    border-radius: 8px;
    padding: 5px 10px;
    margin:10px 0px ;
    input{
        flex:1;
        padding-top: 5px;
        border: 0px;
        padding-bottom: 5px;
        outline: none;    
        font-size: 16px;
        background: transparent !important;
        
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
    margin-top: 20px;
    width: 100%;
    height: 40px;

    border: none;
    outline: none;
    cursor: ${(props) => (props.enable ? 'pointer' : 'not-allowed')};
    color: white;
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
