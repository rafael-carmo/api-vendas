import { ICreateOrder } from '@modules/orders/domain/models/ICreateOrder';
import { IOrderPaginate } from '@modules/orders/domain/models/IOrderPaginate';
import { dataSource } from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import Order from '../entities/Order';

interface SearchParams {
  page: number;
  skip: number;
  take: number;
}

class OrdersRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Order);
  }

  public async findById(id: string): Promise<Order | null> {
    const order = this.ormRepository.findOne({
      where: { id },
      relations: ['order_products', 'customer'],
    });

    return order;
  }

  public async create({ customer, products }: ICreateOrder): Promise<Order> {
    const order = this.ormRepository.create({
      customer,
      order_products: products,
    });

    await this.ormRepository.save(order);

    return order;
  }

  public async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<IOrderPaginate> {
    const [orders, count] = await this.ormRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.order_products', 'order_products')
      .leftJoinAndSelect('order.customer', 'customer')
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: orders,
    };

    return result;
  }
}

export default OrdersRepository;
