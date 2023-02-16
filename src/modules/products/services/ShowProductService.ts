import AppError from '@shared/http/errors/AppError';
import { IProduct } from '../domain/models/IProduct';
import ProductRepository from '../infra/typeorm/repositories/ProductsRespository';

interface IRequest {
  id: string;
}

class ShowProductService {
  private productRepository = new ProductRepository();

  public async execute({ id }: IRequest): Promise<IProduct> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found');
    }

    return product;
  }
}

export default ShowProductService;
