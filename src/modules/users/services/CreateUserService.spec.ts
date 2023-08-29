// import 'reflect-metadata';
import AppError from '@shared/http/errors/AppError';
import FakeUsersRepository from '../domain/repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;
let hashProvider: FakeHashProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, hashProvider);
  });

  it('should be albe to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Rafael Carmo',
      email: 'rafael@gmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be albe to create two users with the same email', async () => {
    await createUser.execute({
      name: 'Rafael Carmo',
      email: 'rafael@gmail.com',
      password: '123456',
    });

    expect(
      createUser.execute({
        name: 'Rafael Carmo',
        email: 'rafael@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
