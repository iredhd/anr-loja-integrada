import React from 'react';
import propTypes from 'prop-types';

import { HomePanel, HomeButton } from './styles';

const Home = ({ history }) => {
  return (
    <HomePanel>
      <HomeButton size="lg" icon="envelope" iconSize="2x" onClick={() => history.push('/send-order')}>
        Enviar
        <br />
        Projetos
      </HomeButton>
      <HomeButton size="lg" icon="cogs" iconSize="2x" onClick={() => history.push('/projects-manager')}>
        Configurar
        <br />
        Projetos
      </HomeButton>
    </HomePanel>
  );
};

Home.propTypes = {
  history: propTypes.object.isRequired
};

export default Home;
