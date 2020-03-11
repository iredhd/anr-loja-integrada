import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { LoginPanel, LoginForm, LoginButton, LoginInputGroup, LoginLogo } from './styles';
import { Input, Alert } from '../../components';
import { login } from '../../store/actions/User';
import { Auth } from '../../services';

const Login = ({ history, user, Auth }) => {
  const [isLoading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: 'ighor.rios@gmail.com',
    password: 'artes@2019'
  });

  const [alert, setAlert] = useState({
    isVisible: false,
    type: null,
    message: null,
    title: ''
  });

  const handleSignUp = async e => {
    e.preventDefault();
    setLoading(true);
    setAlert({
      isVisible: false
    });

    await Auth.Login({ ...form });
    console.log('user', user);
    // const { loggedIn, message } = await Auth.Login(form.email, form.password);

    // setLoading(false);

    // if (!loggedIn) {
    //   setAlert({
    //     ...alert,
    //     isVisible: true,
    //     type: 'danger',
    //     message,
    //     title: 'Falha no login'
    //   });

    //   return;
    // }

    // history.push('/home');
  };

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

const mapStateToProps = ({ user }) => {
  return {
    user
  };
};

const mapDispatchToProps = () => ({
  Auth: {
    Login: login
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
