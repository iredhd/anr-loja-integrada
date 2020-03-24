import styled from 'styled-components';
import { Button, Panel, View } from '../../components';

export const HomePanel = styled(Panel)`
  /* flex-direction: row; */
`;

export const HomeButtonsContainer = styled(View)`
  flex-direction: row;
`;

export const HomeButton = styled(Button)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5px !important;
  flex: 1;
`;
export const HomeLogoutButton = styled(Button)`

`;
