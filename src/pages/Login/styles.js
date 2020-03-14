import styled from 'styled-components';
import { Form } from 'react-bootstrap';
import { Panel, Button, Logo } from '../../components';

export const LoginPanel = styled(Panel)`
  width: 30%;
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

export const LoginLogo = styled(Logo)`
  height: 100px;
  margin-bottom: 10px;
`;
