import { ICustomerPaginate } from '../domain/models/ICustomerPaginate';
import CustomersRepository from '../infra/typeorm/repositories/CustomerRepository';

interface SearchParams {
  page: number;
  limit: number;
}

class ListCustomerService {
  private customersRepository = new CustomersRepository();

  public async execute({
    page,
    limit,
  }: SearchParams): Promise<ICustomerPaginate> {
    const take = limit;
    const skip = (Number(page) - 1) * take;
    const customers = await this.customersRepository.findAll({
      page,
      skip,
      take,
    });

    return customers;
  }
}

export default ListCustomerService;