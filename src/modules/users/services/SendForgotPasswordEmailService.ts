import { inject, injectable } from 'tsyringe';
import AppError from '@shared/http/errors/AppError';
import path from 'path';
import { ISendForgotPasswordEmail } from '../domain/models/ISendForgotPasswordEmail';
import EtherealMail from '@config/mail/EtherealMail';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IUserTokensRespository } from '../domain/repositories/IUserTokensRepository';

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRespository,
  ) {}

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
