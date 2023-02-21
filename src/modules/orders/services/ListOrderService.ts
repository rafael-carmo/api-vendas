import { IOrderPaginate } from '../domain/models/IOrderPaginate';
import OrdersRepository from '../infra/typeorm/repositories/OrdersRepository';

interface SearchParams {
  page: number;
  limit: number;
}

class ListOrderService {
  private ordersRepository = new OrdersRepository();

  public async execute({ page, limit }: SearchParams): Promise<IOrderPaginate> {
    const take = limit;
    const skip = (Number(page) - 1) * take;
    const orders = await this.ordersRepository.findAll({
      page,
      skip,
      take,
    });

    return orders;
  }
}

export default ListOrderService;
