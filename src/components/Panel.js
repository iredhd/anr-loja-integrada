import styled from 'styled-components';
import propTypes from 'prop-types';

const Panel = styled.div`
  background-color: white;
  border-radius: 5px;
  padding: 25px;
  box-shadow: 0 0 0 3px rgba(${({ theme }) => theme.DefaultColors.primary},.5);
`;

Panel.propTypes = {
  theme: propTypes.object.isRequired
};

export default Panel;