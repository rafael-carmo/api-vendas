import { Repository } from 'typeorm';
import Product from '../entities/Product';
import { dataSource } from '@shared/infra/typeorm/index';
import { ICreateProduct } from '@modules/products/domain/models/ICreateProduct';
import { IProductPaginate } from '@modules/products/domain/models/IProductPaginate';

type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

class ProductRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Product);
  }

  public async create({
    name,
    price,
    quantity,
  }: ICreateProduct): Promise<Product> {
    const product = this.ormRepository.create({ name, price, quantity });

    await this.ormRepository.save(product);

    return product;
  }

  public async save(product: Product): Promise<Product> {
    await this.ormRepository.save(product);

    return product;
  }

  public async remove(product: Product): Promise<void> {
    await this.ormRepository.remove(product);
  }

  public async findByName(name: string): Promise<Product | null> {
    const product = this.ormRepository.findOneBy({
      name,
    });

    return product;
  }

  public async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<IProductPaginate> {
    const [products, count] = await this.ormRepository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: products,
    };

    return result;
  }

  public async findById(id: string): Promise<Product | null> {
    const product = this.ormRepository.findOneBy({ id });

    return product;
  }
}

export default ProductRepository;
