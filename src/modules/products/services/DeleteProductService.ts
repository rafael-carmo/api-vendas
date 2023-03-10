import { inject, injectable } from 'tsyringe';
import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/http/errors/AppError';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { IDeleteProduct } from '../domain/models/IDeleteProducts';

@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductsRepository,
  ) {}

  public async execute({ id }: IDeleteProduct): Promise<void> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found');
    }

    const redisCache = new RedisCache();

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await this.productRepository.remove(product);
  }
}

export default DeleteProductService;
