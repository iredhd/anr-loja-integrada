import React from 'react';
import styled from 'styled-components';
import { Alert as BoostrapAlert } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Alert = ({ type, title, message, onClose }) => {
  const Heading = styled(BoostrapAlert.Heading)`
    font-size: 1rem;
    font-weight: bold;
  `;

  const Body = styled.p`
    font-style: italic;
    font-size: 0.9rem;
  `;

  return (
    <BoostrapAlert variant={type} onClose={onClose} dismissible>
      <Heading>{title}</Heading>
      <Body>{message}</Body>
    </BoostrapAlert>
  );
};

Alert.propTypes = {
  type: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']).isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};

export default Alert;
