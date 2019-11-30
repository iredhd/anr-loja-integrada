import styled from 'styled-components';
import { Form, Button } from 'react-bootstrap';

export const LoginPanel = styled.div`
    background-color: white;
    border-radius: 5px;
    box-shadow: 2px;
    width: 30%;
    padding: 25px;
    height: 25%;
`;

export const LoginForm = styled(Form)`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;

export const LoginButton = styled(Button)`
    width: 30%;
`;

export const LoginInputGroup = styled(Form.Group)`
    height: 50%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;