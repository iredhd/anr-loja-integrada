import styled from 'styled-components';
import { Form } from 'react-bootstrap';

import { Logo, View, Button, Panel, LoadingWrapper } from '../../components';

export const CourseManagerPanel = styled(Panel)`
  width: auto;
  overflow-y: scroll;
  height: 80%;
`;

export const CourseManagerLogo = styled(Logo)`
  height: 100px;
`;

export const CourseManagerForm = styled(Form)`
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const CourseManagerInputGroup = styled(Form.Group)`
  width: 100%;
  display: flex;
  flex-direction: ${({ direction }) => direction || 'column'};
  justify-content: ${({ justifycontent }) => justifycontent || 'space-between'};

  input {
    margin: 5px 0px 5px 0px
  }
`;

export const CourseManagerFormContainer = styled(View)`
  flex: 1;
`;

export const CourseManagerSaveButton = styled(Button)`
  width: 50%;
`;

export const CourseManagerContainer = styled(View)`
  align-items: center;
  flex: 1%;
`;

export const CourseManagerLoadingWrapper = styled(LoadingWrapper)`
`;
