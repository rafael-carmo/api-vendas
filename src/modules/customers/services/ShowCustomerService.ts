import Customer from '../infra/typeorm/entities/Customer';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';
import AppError from '@shared/http/errors/AppError';
import { IShowCustomer } from '../domain/models/IShowCustomer';

class ShowCustomerService {
  private customersRepository: ICustomersRepository;

  public async execute({ id }: IShowCustomer): Promise<Customer> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    return customer;
  }
}

export default ShowCustomerService;
