import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { LoginPanel, LoginForm, LoginButton, LoginInputGroup } from './styles';

const Login = () => {
  const [isLoading, setLoading] = useState(false);

  return (
    <LoginPanel>
      <LoginForm>
        <LoginInputGroup>
          <Form.Control type="text" placeholder="Usuário" />
          <Form.Control type="password" placeholder="Senha" />
        </LoginInputGroup>
        <LoginButton
          variant="primary"
          disabled={isLoading}
          onClick={() => !isLoading ? setLoading(true) : false}
        >
          {isLoading ? 'Entrando...' : 'Entrar'}
        </LoginButton>
      </LoginForm>
    </LoginPanel>
  );
};

export default Login;
