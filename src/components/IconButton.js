import React from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import propTypes from 'prop-types';

import Icon from './Icon';

const StyledButton = styled(Button)`
  background-color: rgb(${({ theme }) => theme.DefaultColors.primary});
  color: white;
  border-color: rgb(${({ theme }) => theme.DefaultColors.primary});
  display: flex;
  flex-direction: ${({ row }) => row ? 'row' : 'column'}
  justify-content: center;
  align-items: center;
  box-shadow: inset 0 0 0.3rem rgba(${({ theme }) => theme.DefaultColors.secondary},.5) !important;

  :hover {
    background-color: rgba(${({ theme }) => theme.DefaultColors.primary}, 0.8);
    border-color: rgb(${({ theme }) => theme.DefaultColors.primary}, 0.8); 
  }

  :disabled {
    background-color: rgb(${({ theme }) => theme.DefaultColors.primary});
    border-color: rgb(${({ theme }) => theme.DefaultColors.primary});
  }

  :active {
    background-color: rgb(${({ theme }) => theme.DefaultColors.primary}) !important;
    border-color: rgb(${({ theme }) => theme.DefaultColors.primary}) !important;
    box-shadow: 0 0 0 0.2rem rgba(${({ theme }) => theme.DefaultColors.primary},.5) !important;
  }

  :focus {
    background-color: rgb(${({ theme }) => theme.DefaultColors.primary});
    border-color: rgb(${({ theme }) => theme.DefaultColors.primary});
    box-shadow: 0 0 0 0.2rem rgba(${({ theme }) => theme.DefaultColors.primary},.5);
  }

  svg {
    margin: 15px;
  }
`;

const IconButton = ({ icon, iconSize, children, ...buttonProps }) => (
  <StyledButton {...buttonProps}>
    <Icon icon={icon} size={iconSize} />
    {children}
  </StyledButton>
);

IconButton.defaultProps = {
  iconSize: '',
  children: ''
};

IconButton.propTypes = {
  icon: propTypes.string.isRequired,
  iconSize: propTypes.string,
  children: propTypes.string
};

export default IconButton;