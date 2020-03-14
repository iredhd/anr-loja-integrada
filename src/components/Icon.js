import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const Icon = ({ size, icon }) => (
  <FontAwesomeIcon size={size} icon={['fas', `${icon}`]} />
);

Icon.defaultProps = {
  size: 'xs'
};

Icon.propTypes = {
  size: PropTypes.string,
  icon: PropTypes.string.isRequired
};

export default Icon;
