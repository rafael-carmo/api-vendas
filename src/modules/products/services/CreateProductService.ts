import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/http/errors/AppError';
import Product from '../infra/typeorm/entities/Product';
import ProductRepository from '../infra/typeorm/repositories/ProductsRespository';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  private productRepository = new ProductRepository();

  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
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
