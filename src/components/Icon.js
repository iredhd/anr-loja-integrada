import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import propTypes from 'prop-types';

const Icon = ({ size, icon }) => (
  <FontAwesomeIcon size={size} icon={['fas', `${icon}`]} />
);

Icon.defaultProps = {
  size: 'xs'
};

Icon.propTypes = {
  size: propTypes.string,
  icon: propTypes.string.isRequired
};

export default Icon;
