import styled from 'styled-components';
import { Form } from 'react-bootstrap';

export default styled(Form.Control)`
    :focus {
        box-shadow: 0 0 0 0.2rem rgba(${({ theme }) => theme.DefaultColors.primary},.25);
        border-color: rgb(${({ theme }) => theme.DefaultColors.primary});
    }
`;