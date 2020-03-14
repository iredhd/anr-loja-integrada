import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes  from 'prop-types';

import { Panel, Input, Button, ProgressBar, Typography, View, Modal } from '../../components';
import { OrderSenderLogo, OrderSenderSearchContainer, OrderSenderOrderContainer, OrderSenderOrderInfoContainer, OrderSenderSendContainer } from './styles';

const OrderSender = ({ history }) => {
  const [loading, setLoading] = useState({
    isLoading: false,
    progress: 0
  });

  const [form, setForm] = useState({
    orderId: ''
  });

  const [modal, setModal] = useState({
    isVisible: false,
    body: ''
  });

  return (
    <Panel>
      <Link to="/home">
        <OrderSenderLogo />
      </Link>
      <OrderSenderSearchContainer>
        <Input
          placeholder="Código do pedido"
          value={form.orderId}
          onChange={text => setForm({ ...form, orderId: text.target.value })}
        />
        <Button
          onClick={() => setLoading({ isLoading: true, progress: 0 })}
        >
          Buscar
        </Button>
      </OrderSenderSearchContainer>
      <OrderSenderOrderContainer>
        {loading.isLoading && <ProgressBar progress={loading.progress} />}
        <OrderSenderOrderInfoContainer>
          <View>
            <Typography fontWeight="bold">Código:</Typography>
            <Typography>91</Typography>
          </View>
          <View>
            <Typography fontWeight="bold">Situação:</Typography>
            <Typography>Pago</Typography>
          </View>
          <View>
            <Typography fontWeight="bold">Cliente:</Typography>
            <Typography>Ighor Redhd</Typography>
          </View>
          <View>
            <Typography fontWeight="bold">Projetos:</Typography>
            <Typography>[PROJETO] MALETA TILDINHA</Typography>
          </View>
          <OrderSenderSendContainer>
            <Button
              onClick={() => {
                setModal({
                  ...modal,
                  isVisible: true,
                  body: (
                    <Typography>
                      O projeto foi enviado com sucesso.
                    </Typography>
                  )
                });
              }}
            >
              Enviar
            </Button>
          </OrderSenderSendContainer>
        </OrderSenderOrderInfoContainer>
      </OrderSenderOrderContainer>
      <Modal
        title="Projeto enviado!"
        onConfirm={() => setModal({ ...modal, isVisible: false })}
        onClose={() => setModal({ ...modal, isVisible: false })}
        onCancel={() => setModal({ ...modal, isVisible: false })}
        isVisible={modal.isVisible}
      >
        {modal.body}
      </Modal>
    </Panel>
  );
};

OrderSender.propTypes = {
  history: PropTypes.object.isRequired
};

export default OrderSender;