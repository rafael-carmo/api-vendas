import { v4 as uuidv4 } from 'uuid';
import User from '@modules/users/infra/typeorm/entities/User';
import { ICreateUser } from '../../models/ICreateUser';
import { IPaginateUser } from '../../models/IPaginateUser';
import { IUser } from '../../models/IUser';
import { IUsersRepository } from '../IUsersRepository';

class FakeUsersRepository implements IUsersRepository {
  private users: IUser[] = [];

  public async findAll({
    page,
    skip,
    take,
  }: {
    page: number;
    skip: number;
    take: number;
  }): Promise<IPaginateUser | IUser[]> {
    return this.users;
  }
  public async findByName(name: string): Promise<IUser | undefined> {
    const user = this.users.find(user => user.name === name);
    return user;
  }
  public async findById(id: string): Promise<IUser | undefined> {
    const user = this.users.find(user => user.id === id);
    return user;
  }
  public async findByEmail(email: string): Promise<IUser | undefined> {
    const user = this.users.find(user => user.email === email);
    return user;
  }
  public async create({ name, email, password }: ICreateUser): Promise<IUser> {
    const user = new User();

    user.id = uuidv4();
    user.name = name;
    user.email = email;
    user.password = password;

    this.users.push(user);

    return user;
  }
  public async save(user: IUser): Promise<IUser> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }
}

export default FakeUsersRepository;
