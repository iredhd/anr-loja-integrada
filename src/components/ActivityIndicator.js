import React from 'react';
import { Spinner } from 'react-bootstrap';
import styled from 'styled-components';

import Theme from '../styles/layout';

const ActivityIndicator = () => {
  const StyledSpinner = styled(Spinner)`
      border-color: rgba(${Theme.DefaultColors.primary}, .8);
      border-right-color: transparent;
  `;

  return (
    <StyledSpinner animation="border" />
  );
};

export default ActivityIndicator;
