import styled from 'styled-components';

import { Logo, View, Typography, Panel } from '../../components';

export const OrderSenderLogo = styled(Logo)`
    height: 100px;
`;

export const OrderSenderSearchContainer = styled(View)`
    flex-direction: row;

    button {
        margin: 0px 0px 0px 5px;
    }
`;

export const OrderSenderOrderContainer = styled(View)`
    flex-direction: column;
    width: 100%;
    padding-top: 20px;
`;

export const OrderSenderOrderInfoContainer = styled(View)`
    flex-direction: column;
    margin-top: 15px;
    width: 100%;
`;

export const OrderSenderSendContainer = styled(View)`
    justify-content: center;
    width: 100%;

    button {
        flex: 1;
        max-width: 50%;
        margin-top: 20px;
    }
`;

export const OrderSenderItemsContainer = styled(View)`
  flex-direction: column;
`;

export const OrderSenderItemContainer = styled(Typography)`
  margin-top: 5px;
  margin-bottom: 5px;
`;

export const OrderSenderPanel = styled(Panel)`
  width: auto;
  max-width: 90%;
`;
