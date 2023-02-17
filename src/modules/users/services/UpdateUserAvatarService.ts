import AppError from '@shared/http/errors/AppError';
import User from '../infra/typeorm/entities/User';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import uploadConfig from '@config/upload';
import path from 'path';
import fs from 'fs';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  private usersRepository = new UsersRepository();
  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findByid(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatarFilename;
    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
