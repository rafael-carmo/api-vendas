import { IProductPaginate } from '../domain/models/IProductPaginate';
import ProductRepository from '../infra/typeorm/repositories/ProductsRespository';
import RedisCache from '@shared/cache/RedisCache';

interface SearchParams {
  page: number;
  limit: number;
}

class ListProductService {
  private productRepository = new ProductRepository();

  public async execute({
    page,
    limit,
  }: SearchParams): Promise<IProductPaginate> {
    const take = limit;
    const skip = (Number(page) - 1) * take;

    const redisCache = new RedisCache();

    let products = await redisCache.recover<IProductPaginate>(
      'api-vendas-PRODUCT_LIST',
    );

    if (!products) {
      products = await this.productRepository.findAll({
        page,
        skip,
        take,
      });
      await redisCache.save('api-vendas-PRODUCT_LIST', products);
    }

    return products;
  }
}

export default ListProductService;
