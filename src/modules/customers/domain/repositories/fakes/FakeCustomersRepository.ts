import { v4 as uuidV4 } from "uuid";
import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import { dataSource } from '@shared/infra/typeorm';
import { SearchParams } from '@modules/customers/domain/repositories/ICustomersRepository';
import { ICustomerPaginate } from '@modules/customers/domain/models/ICustomerPaginate';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';

class FakeCustomersRepository implements ICustomersRepository {
  private customers: Customer[] = [];

  public async create({ name, email }: ICreateCustomer): Promise<Customer> {
    const customer = new Customer();

    customer.id = uuidV4();
    customer.name = name;
    customer.email = email;

    this.customers.push(customer);

    return customer;
  }

  public async remove(customer: Customer): Promise<void> {}

  public async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<ICustomerPaginate | undefined> {
    return undefined;
  }

  public async save(customer: Customer): Promise<Customer> {
    Object.assign(this.customers, customer);

    return customer;
  }

  public async findByName(name: string): Promise<Customer | undefined> {
    const customer = this.customers.find(customer => customer.name === name);

    return customer;
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const customer = this.customers.find(customer => customer.id === id);

    return customer;
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const customer = this.customers.find(customer => customer.email === email);

    return customer;
  }
}

export default FakeCustomersRepository;
