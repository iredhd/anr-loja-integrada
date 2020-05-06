import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { Icon, View, Typography } from '../../components';
import { HomePanel, HomeButton, HomeButtonsContainer, HomeLogoutButton } from './styles';
import { logout } from '../../store/actions/User';

const Home = ({ history }) => {
  const dispatch = useDispatch();

  const userLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <HomePanel>
      <HomeButtonsContainer>
        <HomeButton size="lg" onClick={() => history.push('/order-sender')}>
          <Icon
            icon="envelope"
            size="2x"
          />
          <View>
            Enviar
            <br />
            Pedidos
          </View>
        </HomeButton>
        <HomeButton size="lg" onClick={() => history.push('/projects-manager')}>
          <Icon
            icon="cogs"
            size="2x"
          />
          <View>
            Configurar
            <br />
            Projetos
          </View>
        </HomeButton>
        <HomeButton size="lg" onClick={() => history.push('/courses-manager')}>
          <Icon
            icon="cogs"
            size="2x"
          />
          <View>
            Configurar
            <br />
            Cursos
          </View>
        </HomeButton>
      </HomeButtonsContainer>
      <HomeLogoutButton
        onClick={userLogout}
      >
        <Icon
          icon="sign-out-alt"
          size="1x"
        />
        <Typography>
          Logout
        </Typography>
      </HomeLogoutButton>
    </HomePanel>
  );
};

Home.propTypes = {
  history: PropTypes.object.isRequired
};

export default Home;
