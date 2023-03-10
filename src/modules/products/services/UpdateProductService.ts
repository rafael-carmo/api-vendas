import { inject, injectable } from 'tsyringe';
import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/http/errors/AppError';
import { IProduct } from '../domain/models/IProduct';
import ProductRepository from '../infra/typeorm/repositories/ProductsRespository';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductsRepository,
  ) {}

  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<IProduct> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found');
    }

    const productExists = await this.productRepository.findByName(name);

    if (productExists && name !== product.name) {
      throw new AppError('There is already one product with this name');
    }

    const redisCache = new RedisCache();

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await this.productRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
