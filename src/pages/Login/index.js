import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { LoginPanel, LoginForm, LoginButton, LoginInputGroup, LoginLogo } from './styles';
import { Input, Alert } from '../../components';
import { login } from '../../store/actions/User';

const Login = () => {
  const user = useSelector(state => state.user);

  const dispatch = useDispatch();

  const [form, setForm] = useState({
    email: 'igfh.e@gfji.com',
    password: 'asd'
  });

  const [alert, setAlert] = useState({
    isVisible: false,
    type: null,
    message: null,
    title: ''
  });

  const handleSignUp = async e => {
    e.preventDefault();

    setAlert({
      isVisible: false
    });
    dispatch(login({ ...form }));
  };

  useEffect(() => {
    if (user.errorMessage) {
      setAlert({
        isVisible: true,
        type: 'danger',
        message: user.errorMessage,
        title: 'Atenção!'
      });
    }
  }, [user.loading, user.errorMessage]);

  if (user.loggedIn) {
    return (
      <Redirect to="/home" />
    );
  }
  return (
    <LoginPanel>
      <LoginLogo />
      {alert.isVisible && (
        <Alert
          type={alert.type}
          onClose={() => setAlert({ isVisible: false })}
          title={alert.title}
          message={alert.message}
        />
      )}
      <LoginForm onSubmit={handleSignUp}>
        <LoginInputGroup>
          <Input
            type="email"
            placeholder="E-mail"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
          <Input
            type="password"
            placeholder="Senha"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
        </LoginInputGroup>
        <LoginButton
          variant="primary"
          type="submit"
          disabled={user.loading}
        >
          {user.loading ? 'Entrando...' : 'Entrar'}
        </LoginButton>
      </LoginForm>
    </LoginPanel>
  );
};

export default Login;
