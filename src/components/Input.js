import styled from 'styled-components';
import { Form } from 'react-bootstrap';
import propTypes from 'prop-types';

const Input = styled(Form.Control)`
  :focus {
    box-shadow: 0 0 0 0.2rem rgba(${({ theme }) => theme.DefaultColors.primary},.25);
    border-color: rgb(${({ theme }) => theme.DefaultColors.primary});
  }
`;

Input.propTypes = {
  theme: propTypes.object.isRequired
};

export default Input;