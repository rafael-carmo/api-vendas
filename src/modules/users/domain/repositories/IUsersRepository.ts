import { ICreateUser } from '../models/ICreateUser';
import { IPaginateUser } from '../models/IPaginateUser';
import { IUser } from '../models/IUser';

type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export interface IUsersRepository {
  findAll({ page, skip, take }: SearchParams): Promise<IPaginateUser | IUser[]>;
  findByName(name: string): Promise<IUser | null | undefined>;
  findById(id: string): Promise<IUser | null | undefined>;
  findByEmail(email: string): Promise<IUser | null | undefined>;
  create(data: ICreateUser): Promise<IUser>;
  save(user: IUser): Promise<IUser>;
}
