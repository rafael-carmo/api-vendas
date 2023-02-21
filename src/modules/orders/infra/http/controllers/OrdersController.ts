import CreateOrderService from '@modules/orders/services/CreateOrderService';
import ListOrderService from '@modules/orders/services/ListOrderService';
import ShowOrderService from '@modules/orders/services/ShowOrderService';
import { Request, Response } from 'express';

export default class OrdersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const page = request.query.page ? Number(request.query.page) : 1;
    const limit = request.query.limit ? Number(request.query.limit) : 15;

    const listOrder = new ListOrderService();

    const order = await listOrder.execute({ page, limit });

    return response.json(order);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showOrder = new ShowOrderService();

    const order = await showOrder.execute({ id });

    return response.json(order);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { customer_id, products } = request.body;

    const createOrder = new CreateOrderService();

    const order = await createOrder.execute({ customer_id, products });

    return response.json(order);
  }
}
