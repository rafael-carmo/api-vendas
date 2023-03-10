import { inject, injectable } from 'tsyringe';
import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/http/errors/AppError';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { IProduct } from '../domain/models/IProduct';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductsRepository,
  ) {}

  public async execute({ name, price, quantity }: IRequest): Promise<IProduct> {
    const productExists = await this.productRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name');
    }

    const redisCache = new RedisCache();

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    const product = await this.productRepository.create({
      name,
      price,
      quantity,
    });

    return product;
  }
}

export default CreateProductService;
