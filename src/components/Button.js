import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Theme from '../styles/layout';

const StyledButton = styled(Button)`
  background-color: transparent;
  border-color: rgb(${({ color }) => color && Theme.DefaultColors[color] ? Theme.DefaultColors[color] : color});
  color: rgb(${({ color }) => color && Theme.DefaultColors[color] ? Theme.DefaultColors[color] : color});
  margin: 5px;
  
  :hover {
    background-color: rgba(${({ color }) => color && Theme.DefaultColors[color] ? Theme.DefaultColors[color] : color}, 0.8);
    border-color: rgb(${({ color }) => color && Theme.DefaultColors[color] ? Theme.DefaultColors[color] : color}, 0.8); 
    transform: scale(1.02);
  }

  :disabled {
    background-color: rgb(${({ color }) => color && Theme.DefaultColors[color] ? Theme.DefaultColors[color] : color});
    border-color: rgb(${({ color }) => color && Theme.DefaultColors[color] ? Theme.DefaultColors[color] : color});
  }

  :active {
    background-color: rgb(${({ color }) => color && Theme.DefaultColors[color] ? Theme.DefaultColors[color] : color}) !important;
    border-color: rgb(${({ color }) => color && Theme.DefaultColors[color] ? Theme.DefaultColors[color] : color}) !important;
    box-shadow: 0 0 0 0.2rem rgba(${({ color }) => color && Theme.DefaultColors[color] ? Theme.DefaultColors[color] : color},.5) !important;
  }

  :focus {
    background-color: rgb(${({ color }) => color && Theme.DefaultColors[color] ? Theme.DefaultColors[color] : color});
    border-color: rgb(${({ color }) => color && Theme.DefaultColors[color] ? Theme.DefaultColors[color] : color});
    box-shadow: 0 0 0 0.2rem rgba(${({ color }) => color && Theme.DefaultColors[color] ? Theme.DefaultColors[color] : color},.5);
  }
`;

StyledButton.defaultProps = {
  color: 'primary'
};

StyledButton.propTypes = {
  color: PropTypes.string
};

export default StyledButton;