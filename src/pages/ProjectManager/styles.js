import styled from 'styled-components';

import logo from '../../assets/logo.png';
import { Panel, View } from '../../components';

export const ProjectManagerPanel = styled(Panel)`
  width: 50%;
`;

export const ProjectManagerLogo = styled.div`
  background-image: url(${logo});
  height: 100px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 10px;
`;

export const ProjectCard = styled(View)`
  flex-direction: row;
  border-top: 1px solid rgb(${({ theme }) => theme.DefaultColors.primary});
  border-bottom: 1px solid rgb(${({ theme }) => theme.DefaultColors.primary});
  align-items: center;
  justify-content: space-between;
  margin: 1px 0px 1px 0px;
  padding: 4px 0px 4px 0px;
`;

export const ProjectCardInfo = styled(View)`
  flex-direction: column;
  flex: 2;
`;

export const ProjectCardActions = styled(View)`
  flex: 1;
  justify-content: flex-end;
`;