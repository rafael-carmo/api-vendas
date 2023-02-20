import AppError from '@shared/http/errors/AppError';
import { IShowOrder } from '../domain/models/IShowOrder';
import Order from '../infra/typeorm/entities/Order';
import OrdersRepository from '../infra/typeorm/repositories/OrdersRepository';

class ShowOrderService {
  private ordersRepository = new OrdersRepository();

  public async execute({ id }: IShowOrder): Promise<Order> {
    const order = await this.ordersRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found.');
    }

    return order;
  }
}

export default ShowOrderService;
