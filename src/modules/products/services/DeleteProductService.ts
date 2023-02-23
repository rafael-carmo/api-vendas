import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/http/errors/AppError';
import ProductRepository from '../infra/typeorm/repositories/ProductsRespository';

interface IRequest {
  id: string;
}

class DeleteProductService {
  private productRepository = new ProductRepository();

  public async execute({ id }: IRequest): Promise<void> {
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
