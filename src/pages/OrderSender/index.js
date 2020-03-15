import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PropTypes  from 'prop-types';

import { Input, Button, Typography, View, Modal, LoadingWrapper } from '../../components';
import { OrderSenderPanel, OrderSenderLogo, OrderSenderSearchContainer, OrderSenderItemsContainer, OrderSenderItemContainer, OrderSenderOrderContainer, OrderSenderOrderInfoContainer, OrderSenderSendContainer } from './styles';
import { Order } from '../../services';

const OrderSender = ({ history }) => {
  const [isLoading, setLoading] = useState(false);

  const [form, setForm] = useState({
    orderId: ''
  });

  const [modal, setModal] = useState({
    isVisible: false,
    body: '',
    title: '',
    action: null
  });

  const [order, setOrder] = useState(null);

  const closeModal = useCallback(() => setModal({
    ...modal,
    isVisible: false
  }), [setModal, modal]);

  const loadOrder = useCallback(() => {
    if (!form.orderId.trim()) {
      setModal({
        isVisible: true,
        body: (
          <Typography>
            Digite um código válido.
          </Typography>
        ),
        title: 'Atenção!',
        action: closeModal
      });
      return setForm({
        ...form,
        orderId: form.orderId.trim()
      });
    }

    setLoading(true);
    setOrder(null);
    Order.getOrder(form.orderId.trim())
      .then(order => {
        setOrder({
          ...order
        });
        setLoading(false);
      })
      .catch(() => {
        setModal({
          isVisible: true,
          body: (
            <Typography>
              Pedido não encontrado.
            </Typography>
          ),
          title: 'Atenção!',
          action: closeModal
        });
        setLoading(false);
      });
  }, [setLoading, setModal, form, closeModal]);

  return (
    <OrderSenderPanel>
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
          onClick={loadOrder}
        >
          Buscar
        </Button>
      </OrderSenderSearchContainer>
      <OrderSenderOrderContainer>
        <LoadingWrapper
          isLoading={isLoading}
        >
          {
            order ? (
              <OrderSenderOrderInfoContainer>
                <View>
                  <Typography fontWeight="bold">Código:</Typography>
                  <Typography>{order.id}</Typography>
                </View>
                <View>
                  <Typography fontWeight="bold">Total:</Typography>
                  <Typography>{`R$ ${order.total}`}</Typography>
                </View>
                <View>
                  <Typography fontWeight="bold">Situação:</Typography>
                  <Typography>{order.status.name}</Typography>
                </View>
                <View>
                  <Typography fontWeight="bold">Cliente:</Typography>
                  <Typography>{order.client.name}</Typography>
                </View>
                <View>
                  <Typography fontWeight="bold">E-mail:</Typography>
                  <Typography>{order.client.email}</Typography>
                </View>
                <View>
                  <Typography fontWeight="bold">CPF/CNPJ:</Typography>
                  <Typography>{order.client.personalId}</Typography>
                </View>
                <OrderSenderItemsContainer>
                  <Typography fontWeight="bold">Itens:</Typography>
                  {order.products.map(product => (
                    <OrderSenderItemContainer key={product.sku}>
                      <Typography>{product.name}</Typography>
                    </OrderSenderItemContainer>
                  ))}
                </OrderSenderItemsContainer>
                <OrderSenderSendContainer>
                  <Button
                    disabled={!['pedido_entregue', 'pedido_pago'].includes(order.status.code)}
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
            ) : (
              <Typography>
              Digite o código do pedido.
              </Typography>
            )
          }
        </LoadingWrapper>
      </OrderSenderOrderContainer>
      <Modal
        title={modal.title}
        onConfirm={modal.action}
        onClose={closeModal}
        isVisible={modal.isVisible}
      >
        {modal.body}
      </Modal>
    </OrderSenderPanel>
  );
};

OrderSender.propTypes = {
  history: PropTypes.object.isRequired
};

export default OrderSender;
