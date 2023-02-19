import Customer from '../infra/typeorm/entities/Customer';
import AppError from '@shared/http/errors/AppError';
import { IShowCustomer } from '../domain/models/IShowCustomer';
import CustomersRepository from '../infra/typeorm/repositories/CustomerRepository';

class ShowCustomerService {
  private customersRepository = new CustomersRepository();

  public async execute({ id }: IShowCustomer): Promise<Customer> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    return customer;
  }
}

export default ShowCustomerService;
