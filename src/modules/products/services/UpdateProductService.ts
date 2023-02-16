import AppError from '@shared/http/errors/AppError';
import { IProduct } from '../domain/models/IProduct';
import ProductRepository from '../infra/typeorm/repositories/ProductsRespository';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  private productRepository = new ProductRepository();

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

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await this.productRepository.save(product);

    return product;
  }
}

export default UpdateProductService;