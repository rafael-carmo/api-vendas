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

    await this.productRepository.remove(product);
  }
}

export default DeleteProductService;
