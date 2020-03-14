import styled from 'styled-components';

import { Panel, Logo, View } from '../../components';

export const NotFoundPanel = styled(Panel)`
  max-width: none;
  width: fit-content;
`;

export const NotFoundLogo = styled(Logo)`
  height: 100px;
  margin-bottom: 10px;
`;

export const NotFoundTextContainer = styled(View)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
