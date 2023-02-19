import { dataSource } from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import Customer from '../entities/Customer';

class CustomersRepository {
  private ormRepository: Repository<Customer>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Customer);
  }

  public async findByName(name: string): Promise<Customer | null> {
    const customer = await this.ormRepository.findOneBy({
      name,
    });

    return customer;
  }

  public async findById(id: string): Promise<Customer | null> {
    const customer = await this.ormRepository.findOneBy({
      id,
    });

    return customer;
  }

  public async findByEmail(email: string): Promise<Customer | null> {
    const customer = await this.ormRepository.findOneBy({
      email,
    });

    return customer;
  }
}

export default CustomersRepository;
