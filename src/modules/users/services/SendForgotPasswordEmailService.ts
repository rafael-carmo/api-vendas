import AppError from '@shared/http/errors/AppError';
import path from 'path';
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

    const forgotPasswordTemplate = path.resolve(
      __dirname, //diretorio atual
      '..', //sobe um nivel
      'views', // entra na pasta views
      'forgot_password.hbs', //informa arquivo a ser carregado
    );

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: `[API Vendas] Recuperação de Senha`,
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          //está simulando que existe uma rota no front end com um formulário para troca da senha,
          //por isso link apontar para este endereço
          link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
