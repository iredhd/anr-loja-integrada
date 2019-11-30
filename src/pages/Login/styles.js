import styled from 'styled-components';
import { Form } from 'react-bootstrap';
import logo from '../../assets/logo.png';
import Button from '../../components/Button';

export const LoginPanel = styled.div`
    background-color: white;
    border-radius: 5px;
    box-shadow: 2px;
    width: 30%;
    padding: 25px;
    min-width: 300px;
    max-width: 450px;
`;

export const LoginForm = styled(Form)`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;

export const LoginButton = styled(Button)`
    width: 50%;
`;

export const LoginInputGroup = styled(Form.Group)`
    height: 50%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    input {
        margin: 5px 0px 5px 0px
    }
`;

export const LoginLogo = styled.div`
    background-image: url(${logo});
    height: 100px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    margin-bottom: 10px;
`;