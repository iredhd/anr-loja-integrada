import styled from 'styled-components';
import { Form } from 'react-bootstrap';

import { Logo, View } from '../../components';

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
  height: 50%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  input {
      margin: 5px 0px 5px 0px
  }
`;

export const UploadFilesView = styled(View)`
  border: 1px dashed black;
  padding: 20px;
  text-align: center;
  margin-top: 30px;
`;