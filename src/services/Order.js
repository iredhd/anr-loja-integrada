import axios from 'axios';
import jwt from 'jsonwebtoken';

import { Project } from '.';

export default class Order {
  static async getOrder(id) {
    const { data: order } = await axios.get(`${process.env.REACT_APP_LOJAINTEGRADA_BASE_URL}pedido/${id}`, {
      params: {
        format: 'json',
        chave_api: process.env.REACT_APP_LOJAINTEGRADA_CHAVE_API,
        chave_aplicacao: process.env.REACT_APP_LOJAINTEGRADA_CHAVE_APLICACAO
      }
    });

    return {
      id: id,
      total: order.valor_total,
      status: {
        name: order.situacao.nome,
        code: order.situacao.codigo
      },
      client: {
        name: order.cliente.nome,
        email: order.cliente.email,
        personalId: order.cliente.cpf || order.cliente.cnpj
      },
      products: order.itens.map(item => ({
        sku: item.sku,
        name: item.nome
      }))
    };
  }

  static async sendOrder(order) {
    try {
      const token = jwt.sign({ p: process.env.REACT_APP_API_PASSWORD }, process.env.REACT_APP_API_PASSWORD);

      const result = await axios.post(`${process.env.REACT_APP_BACKEND_URL}order`, {
        id: order.id
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const successMessage = this.handleSuccess(result.data.status);

      return {
        success: true,
        successMessage,
        errorMessage: null
      };
    } catch (e) {
      const errorMessage = this.handleErrors(e.response ? e.response.data.error : null);
      return {
        success: false,
        successMessage: null,
        errorMessage
      };
    }
  }

  static async prepareOrder(order) {
    const projects = await Promise.all(order.products.map(async item => {
      try {
        const project = await Project.getProject(item.sku);
        return {
          ...project,
          exists: true
        };
      } catch (e) {
        return {
          sku: item.sku,
          name: item.name,
          exists: false
        };
      }
    }));

    return {
      canSend: projects.filter(item => item.exists).length > 0,
      itemWillNotSent: projects.filter(item => !item.exists)
    };
  }

  static handleErrors(code) {
    switch (code) {
      case 'EMAIL_FAIL':
        return 'Falha no envio do e-mail. Tente novamente dentro de alguns minutos.';
      case 'ID_NOT_FOUND':
        return 'ID de pedido não encontrado. Contate o administrador do sistema.';
      case 'ORDER_NOT_FOUND':
        return 'Pedido não encontrado na loja, por favor verifique o código do pedido.';
      case 'NO_PROJECTS_TO_SEND':
        return 'Não existem projetos há serem enviados no pedido.';
      default:
        return 'Erro desconhecido. Contate o administrador do sistema.';
    }
  }

  static handleSuccess(code) {
    switch (code) {
      case 'PARTIAL_SUCCESS':
        return 'Foram enviados apenas os itens que são projetos e que estão configurados no sistema. Verifique o pedido na loja se por acaso não há mais itens a serem entregues.';
      default:
        return 'Todos os projetos foram enviados e o status foi alterado na loja!';
    }
  }
}
