import styled from 'styled-components';
import PropTypes from 'prop-types';
import Theme from '../styles/layout';

const Panel = styled.div`
  background-color: white;
  border-radius: 5px;
  padding: 25px;
  display: flex;
  width: 50%;
  flex-direction: column;
  min-width: 300px;
  max-width: 450px;
  box-shadow: 0 0 0 3px rgba(${({ color }) => color && Theme.DefaultColors[color] ? Theme.DefaultColors[color] : color},.5);
`;

Panel.defaultProps = {
  color: 'primary'
};

Panel.propTypes = {
  color: PropTypes.string
};

export default Panel;