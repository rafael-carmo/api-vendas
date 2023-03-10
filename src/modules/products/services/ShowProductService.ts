import { inject, injectable } from 'tsyringe';
import AppError from '@shared/http/errors/AppError';
import { IProduct } from '../domain/models/IProduct';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { IShowProduct } from '../domain/models/IShowProduct';

@injectable()
class ShowProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductsRepository,
  ) {}

  public async execute({ id }: IShowProduct): Promise<IProduct> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found');
    }

    return product;
  }
}

export default ShowProductService;
