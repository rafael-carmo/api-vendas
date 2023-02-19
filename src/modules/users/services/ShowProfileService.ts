import AppError from '@shared/http/errors/AppError';
import { IShowUser } from '../domain/models/IShowUser';
import { IUser } from '../domain/models/IUser';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';

class ShowProfileService {
  private usersRepository = new UsersRepository();

  public async execute({ id }: IShowUser): Promise<IUser> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found.');
    }

    return user;
  }
}

export default ShowProfileService;
