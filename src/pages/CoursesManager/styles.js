import styled from 'styled-components';

import { Panel, View, Logo, LoadingWrapper } from '../../components';

export const CoursesManagerPanel = styled(Panel)`
  max-width: none;
  width: fit-content;
`;

export const CoursesManagerLogo = styled(Logo)`
  height: 100px;
  margin-bottom: 10px;
`;

export const CourseCard = styled(View)`
  flex-direction: row;
  border-top: 1px solid rgb(${({ theme }) => theme.DefaultColors.primary});
  border-bottom: 1px solid rgb(${({ theme }) => theme.DefaultColors.primary});
  align-items: center;
  justify-content: space-between;
  margin: 1px 0px 1px 0px;
  padding: 4px 0px 4px 0px;
`;

export const CourseCardInfo = styled(View)`
  flex-direction: column;
  flex: 2;
`;

export const CourseCardActions = styled(View)`
  flex: 1;
  justify-content: flex-end;
`;

export const CoursesManagerActionBar = styled(View)`
  flex-direction: row;
  justify-content: flex-end;
`;

export const CoursesManagerLoadingWrapper = styled(LoadingWrapper)`
`;
