import axios from 'axios';

import { Project } from '.';

export default class Order {
  static async getOrder(id) {
    const { data: order } = await axios.get(`pedido/${id}`);

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
    // const projects = await Promise.all(order.products.map(async item => Project.getProject(item.sku)));
    console.log('order', order);
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
}
