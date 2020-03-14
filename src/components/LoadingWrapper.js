import React from 'react';
import PropTypes from 'prop-types';
import { ProgressBar } from '.';

const LoadingWrapper = ({ isLoading, progressBarProps, children }) => (
  isLoading ? <ProgressBar {...progressBarProps} /> : children
);

LoadingWrapper.defaultProps = {
  isLoading: false,
  progressBarProps: {}
};

LoadingWrapper.propTypes = {
  isLoading: PropTypes.bool,
  progressBarProps: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};

export default LoadingWrapper;
