import React, { useState } from 'react';
import propTypes from 'prop-types';

import { LoginPanel, LoginForm, LoginButton, LoginInputGroup, LoginLogo } from './styles';
import Input from '../../components/Input';

const Login = props => {
  const [isLoading, setLoading] = useState(false);
  const [form, setForm] = useState({
    user: '',
    password: ''
  });

  const handleSignUp = e => {
    e.preventDefault();
    setLoading(true);
    props.history.push('/home');
    console.log(form);
  };

  return (
    <LoginPanel>
      <LoginLogo />
      <LoginForm onSubmit={handleSignUp}>
        <LoginInputGroup>
          <Input
            type="text"
            placeholder="Usuário"
            onChange={e => setForm({ ...form, user: e.target.value })}
          />
          <Input
            type="password"
            placeholder="Senha"
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
        </LoginInputGroup>
        <LoginButton
          variant="primary"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Entrando...' : 'Entrar'}
        </LoginButton>
      </LoginForm>
    </LoginPanel>
  );
};

Login.propTypes = {
  history: propTypes.object.isRequired
};

export default Login;
