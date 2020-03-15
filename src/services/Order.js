import axios from 'axios';

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
}
