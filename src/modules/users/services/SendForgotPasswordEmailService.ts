import AppError from '@shared/http/errors/AppError';
import { ISendForgotPasswordEmail } from '../domain/models/ISendForgotPasswordEmail';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import UserTokensRepository from '../infra/typeorm/repositories/UserTokensRepository';
import EtherealMail from '@config/mail/EtherealMail';

class SendForgotPasswordEmailService {
  private usersRepository = new UsersRepository();
  private userTokensRepository = new UserTokensRepository();

  public async execute({ email }: ISendForgotPasswordEmail): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const { token } = await this.userTokensRepository.generate(user.id);

    console.log(token);

    const mail = {
      name: 'teste',
      email,
    };

    await EtherealMail.sendMail({
      to: mail,
      body: `Solicitação de redefinição de senha recebida: ${token}`,
    });
  }
}

export default SendForgotPasswordEmailService;
