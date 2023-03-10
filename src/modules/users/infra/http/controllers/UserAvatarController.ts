import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UserAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const updateAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateAvatar.execute({
      user_id: req.user.id,
      avatarFilename: req.file?.filename as string,
    });

    return res.json(instanceToInstance(user));
  }
}
