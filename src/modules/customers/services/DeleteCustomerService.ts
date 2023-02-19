import AppError from '@shared/http/errors/AppError';
import { IDeleteCustomer } from '../domain/models/IDeleteCustomer';
import CustomersRepository from '../infra/typeorm/repositories/CustomerRepository';

class DeleteCustomerService {
  private customersRepository = new CustomersRepository();

  public async execute({ id }: IDeleteCustomer): Promise<void> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    await this.customersRepository.remove(customer);
  }
}

export default DeleteCustomerService;
