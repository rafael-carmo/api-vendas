// import 'reflect-metadata';
import AppError from '@shared/http/errors/AppError';
import FakeUsersRepository from '../domain/repositories/fakes/FakeUsersRepository';
import CreateSessionsService from './CreateSessionsService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let createSession: CreateSessionsService;
let hashProvider: FakeHashProvider;

describe('CreateSessions', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    createSession = new CreateSessionsService(
      fakeUsersRepository,
      hashProvider,
    );
  });

  it('should be albe to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Rafael Carmo',
      email: 'rafael@gmail.com',
      password: '123456',
    });

    const response = await createSession.execute({
      email: 'rafael@gmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be albe to authenticate with non existent user', async () => {
    expect(
      createSession.execute({
        email: 'rafael@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be albe to authenticate with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'Rafael Carmo',
      email: 'rafael@gmail.com',
      password: '123456',
    });

    expect(
      createSession.execute({
        email: 'rafael@gmail.com',
        password: '56789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
