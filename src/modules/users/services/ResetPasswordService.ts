import { inject, injectable } from 'tsyringe';
import AppError from '@shared/http/errors/AppError';
import { IResetPassword } from '../domain/models/IResetPassword';
import { addHours, isAfter } from 'date-fns';
import { hash } from 'bcryptjs';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IUserTokensRespository } from '../domain/repositories/IUserTokensRepository';

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRespository,
  ) {}

  public async execute({ token, password }: IResetPassword): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User Token does not exists.');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired.');
    }

    user.password = await hash(password, 8);

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
