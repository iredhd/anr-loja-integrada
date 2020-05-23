import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PropTypes  from 'prop-types';

import { Input, Button, Typography, View, Modal, LoadingWrapper } from '../../components';
import { OrderSenderPanel, OrderSenderVerticalView, OrderSenderLogo, OrderSenderSearchContainer, OrderSenderItemsContainer, OrderSenderItemContainer, OrderSenderOrderContainer, OrderSenderOrderInfoContainer, OrderSenderSendContainer } from './styles';
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

  const sendOrder = useCallback(() => {
    setModal({
      ...modal,
      isVisible: false
    });

    setLoading(true);

    Order.sendOrder({
      ...order
    }).then(response => {
      setModal({
        isVisible: true,
        body: (
          <Typography
            fontColor={!response.success ? 'danger' : 'primary'}
          >
            {response.successMessage || response.errorMessage}
          </Typography>
        ),
        title: response.success ? 'Sucesso!' : 'Ops!',
        action: () => {
          setModal({
            ...modal,
            isVisible: false
          });
        }
      });
      setOrder(null);
      setOrder(false);
      setForm({
        orderId: ''
      });
      setLoading(false);
    });
  }, [order, modal, setModal]);

  const prepareOrder = useCallback(async () => {
    setLoading(true);
    try {
      const preparedInfo = await Order.prepareOrder(order);

      let newModal = {
        isVisible: true,
        body: (
          <Typography>
            {`Você tem certeza que deseja enviar ${order.products.map(item => item.name)} para ${order.client.email}?`}
          </Typography>
        ),
        title: 'Atenção!',
        action: sendOrder
      };

      if (preparedInfo.canSend && preparedInfo.itemWillNotSent.length > 0) {
        newModal = {
          isVisible: true,
          body: (
            <OrderSenderVerticalView>
              <Typography>
                {
                `Os seguintes itens não foram encontrados na base de produtos: ${preparedInfo.itemWillNotSent.map(item => item.name)}.`
                }
              </Typography>
              <Typography>
                {
                `Serão enviados apenas os itens: ${order.products.filter(item => !preparedInfo.itemWillNotSent.map(notSent => notSent.sku).includes(item.sku)).map(item => item.name)}.`
                }
              </Typography>
              <Typography>
                Deseja enviar mesmo assim?
              </Typography>
            </OrderSenderVerticalView>
          ),
          title: 'Atenção!',
          action: sendOrder
        };
      } else if (!preparedInfo.canSend) {
        newModal = {
          isVisible: true,
          body: (
            <OrderSenderVerticalView>
              <Typography>
                O pedido não será enviado pois nenhum dos projetos existem na base de dados.
              </Typography>
              <Typography>
                Verifique se existem de fatos projetos no pedido a serem enviados e, se eles estão devidamente cadastrados no configurador de projetos.
              </Typography>
            </OrderSenderVerticalView>
          ),
          title: 'Atenção!',
          action: closeModal
        };
      }

      setModal(newModal);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, [order, sendOrder, closeModal]);

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
          disabled={isLoading}
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
                    onClick={prepareOrder}
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
