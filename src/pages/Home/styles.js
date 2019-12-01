import styled from 'styled-components';
import IconButton from '../../components/IconButton';
import Panel from '../../components/Panel';

export const HomePanel = styled(Panel)`
  display: flex;
  flex-direction: row;
  width: 50%;
  min-width: 300px;
  max-width: 460px;
`;

export const HomeButton = styled(IconButton)`
  margin: 5px !important;
  flex: 1;
`;