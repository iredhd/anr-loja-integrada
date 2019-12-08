import React from 'react';
import PropTypes from 'prop-types';

import { Icon, View } from '../../components';
import { HomePanel, HomeButton } from './styles';

const Home = ({ history }) => {
  return (
    <HomePanel>
      <HomeButton size="lg" onClick={() => history.push('/send-order')}>
        <Icon
          icon="envelope"
          size="2x"
        />
        <View>
        Enviar
          <br />
        Projetos
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
    </HomePanel>
  );
};

Home.propTypes = {
  history: PropTypes.object.isRequired
};

export default Home;
