// import 'reflect-metadata';
import AppError from '@shared/http/errors/AppError';
import FakeCustomersRepository from '../domain/repositories/fakes/FakeCustomersRepository';
import CreateCustomerService from './CreateCustomerService';

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomer: CreateCustomerService;

describe('CraeteCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    createCustomer = new CreateCustomerService(fakeCustomersRepository);
  });

  it('should be albe to create a new customer', async () => {
    const customer = await createCustomer.execute({
      name: 'Rafael Carmo',
      email: 'rafael@gmail.com',
    });

    expect(customer).toHaveProperty('id');
  });

  it('should not be albe to create two customers with the same email', async () => {
    await createCustomer.execute({
      name: 'Rafael Carmo',
      email: 'rafael@gmail.com',
    });

    expect(
      createCustomer.execute({
        name: 'Rafael Carmo',
        email: 'rafael@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
