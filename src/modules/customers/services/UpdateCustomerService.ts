import { IUpdateCustomer } from '../domain/models/IUpdateCustomer';
import Customer from '../infra/typeorm/entities/Customer';
import AppError from '@shared/http/errors/AppError';
import CustomersRepository from '../infra/typeorm/repositories/CustomerRepository';

class UpdateCustomerService {
  private customersRepository = new CustomersRepository();

  public async execute({
    id,
    name,
    email,
  }: IUpdateCustomer): Promise<Customer> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    const customerExists = await this.customersRepository.findByEmail(email);

    if (customerExists && email !== customer.email) {
      throw new AppError('There is already one customer with this email.');
    }

    customer.name = name;
    customer.email = email;

    await this.customersRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
