import styled from 'styled-components';
import { Button } from 'react-bootstrap';

export default styled(Button)`
    background-color: transparent;
    border-color: rgb(${({ theme }) => theme.DefaultColors.primary});
    color: rgb(${({ theme }) => theme.DefaultColors.primary});

    :hover {
        background-color: rgba(${({ theme }) => theme.DefaultColors.primary}, 0.8);
        border-color: rgb(${({ theme }) => theme.DefaultColors.primary}, 0.8); 
    }

    :active, :disabled {
        background-color: rgb(${({ theme }) => theme.DefaultColors.primary});
        border-color: rgb(${({ theme }) => theme.DefaultColors.primary});
    }

    :focus {
        background-color: rgb(${({ theme }) => theme.DefaultColors.primary});
        border-color: rgb(${({ theme }) => theme.DefaultColors.primary});
        box-shadow: 0 0 0 0.2rem rgba(${({ theme }) => theme.DefaultColors.primary},.5);
    }
`;