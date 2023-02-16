import { IProductPaginate } from '../domain/models/IProductPaginate';
import ProductRepository from '../infra/typeorm/repositories/ProductsRespository';

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
    const products = await this.productRepository.findAll({
      page,
      skip,
      take,
    });

    return products;
  }
}

export default ListProductService;
