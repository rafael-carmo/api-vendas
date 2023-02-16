import { IPaginateUser } from '../domain/models/IPaginateUser';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';

interface SearchParams {
  page: number;
  limit: number;
}

class ListUserService {
  private usersRepository = new UsersRepository();

  public async execute({ page, limit }: SearchParams): Promise<IPaginateUser> {
    const take = limit;
    const skip = (Number(page) - 1) * take;
    const users = await this.usersRepository.findAll({
      page,
      skip,
      take,
    });

    return users;
  }
}

export default ListUserService;
