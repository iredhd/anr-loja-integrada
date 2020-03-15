import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ActivityIndicator, View } from '.';

const LoadingWrapper = ({ isLoading, children }) => {
  const StyledContainer = styled(View)`
    justify-content: center;
  `;

  return isLoading ? (
    <StyledContainer>
      <ActivityIndicator />
    </StyledContainer>
  ) : children;
};

LoadingWrapper.defaultProps = {
  isLoading: false
};

LoadingWrapper.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};

export default LoadingWrapper;
