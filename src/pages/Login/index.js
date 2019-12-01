import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { LoginPanel, LoginForm, LoginButton, LoginInputGroup, LoginLogo } from './styles';
import { Input } from '../../components';

const Login = ({ history }) => {
  const [isLoading, setLoading] = useState(false);
  const [form, setForm] = useState({
    user: '',
    password: ''
  });

  const handleSignUp = e => {
    e.preventDefault();
    setLoading(true);
    history.push('/home');
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
  history: PropTypes.object.isRequired
};

export default Login;
