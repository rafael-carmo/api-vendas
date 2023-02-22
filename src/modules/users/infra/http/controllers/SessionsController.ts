import CreateSessionsService from '@modules/users/services/CreateSessionsService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const createSession = new CreateSessionsService();

    let user;
    try {
      user = await createSession.execute({ email, password });
    } catch (error) {
      console.log(error);
    }

    return res.json(instanceToInstance(user));
  }
}
