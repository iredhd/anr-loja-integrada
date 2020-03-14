import styled from 'styled-components';
import { Form } from 'react-bootstrap';

import { Logo, View, Button, Panel, LoadingWrapper } from '../../components';

export const ProjectManagerPanel = styled(Panel)`
  width: auto;
  overflow-y: scroll;
  height: 80%;
`;

export const ProjectManagerLogo = styled(Logo)`
  height: 100px;
`;

export const ProjectManagerForm = styled(Form)`
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const ProjectManagerInputGroup = styled(Form.Group)`
  width: 100%;
  display: flex;
  flex-direction: ${({ direction }) => direction || 'column'};
  justify-content: ${({ justifycontent }) => justifycontent || 'space-between'};

  input {
    margin: 5px 0px 5px 0px
  }
`;

export const ProjectManagerDropzoneContainer = styled(View)`
  flex-direction: column;
  margin-top: 15px;
`;

export const ProjectManagerSaveButton = styled(Button)`
  width: 50%;
`;

export const ProjectManagerContainer = styled(View)`
  align-items: center;
  flex: 1%;
`;

export const ProjectManagerLoadingWrapper = styled(LoadingWrapper)`
`;
