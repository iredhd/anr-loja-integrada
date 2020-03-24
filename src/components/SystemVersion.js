import React from 'react';
import styled from 'styled-components';

import { version } from '../../package.json';
import { Typography, View } from '.';
import Theme from '../styles/layout';

const SystemVersion = () => {
  const StyledView = styled(View)`
    position: absolute;
    bottom: 0;
    background-color: ${() => `rgba(${Theme.DefaultColors.secondary}, 0.5)`};
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  `;

  return (
    <StyledView>
      <Typography>
        {`Versão: ${version}`}
      </Typography>
    </StyledView>
  );
};

export default SystemVersion;
