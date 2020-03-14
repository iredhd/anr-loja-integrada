import React from 'react';
import { ProgressBar as BoostrapProgressBar } from 'react-bootstrap';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Theme from '../styles/layout';

const ProgressBar = ({ progress }) => {
  const StyledProgressBar = styled(BoostrapProgressBar)`
    width: 100%;

    div.progress-bar {
      background-color: rgba(${Theme.DefaultColors.primary}, .8)
    }
  `;

  return (
    <StyledProgressBar animated now={progress} />
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired
};

export default ProgressBar;
