import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Typography } from '../../components';
import { NotFoundPanel, NotFoundLogo, NotFoundTextContainer } from './styles';

const NotFound = ({ history }) => {
  const [timer, setTimer] = useState(5);

  useEffect(() => {
    if (timer === -1) {
      history.push('/home');
    } else {
      setTimeout(() => setTimer(timer - 1), 1000);
    }
  }, [timer, history]);

  return (
    <NotFoundPanel>
      <Link to="/home">
        <NotFoundLogo />
      </Link>
      <NotFoundTextContainer>
        <Typography
          fontWeight="bold"
          fontSize="25px"
        >
        Oops... Esta página não existe!
        </Typography>
        <Typography
          fontSize="20px"
        >
        Você será redirecionado para a home em
        </Typography>
        <Typography
          fontWeight="bold"
          fontSize="35px"
        >
          {timer}
        </Typography>
        <Typography
          fontSize="20px"
        >
        segundos...
        </Typography>
      </NotFoundTextContainer>
    </NotFoundPanel>
  );
};

NotFound.propTypes = {
  history: PropTypes.object.isRequired
};

export default NotFound;
