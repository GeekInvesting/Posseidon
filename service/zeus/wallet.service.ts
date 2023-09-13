import {ApiService} from "~/service/ApiService";
import {urlZeus} from "~/service/BaseUrl";
import {apiErrorHandler} from "~/middleware/apiErrorHandler";
import {CreateWalletDto} from "~/entities/zeus/wallet.entity";

export class WalletService extends ApiService {
  constructor() {
    super();
  }

  urlBase = `${urlZeus}/wallet`;

  async createWallet(createWalletDto: CreateWalletDto): Promise<Response> {
    const url = `${this.urlBase}`;
    return await apiErrorHandler(this.fetch)(url, {
      method: 'POST',
      body: JSON.stringify(createWalletDto),
    });
  }

  async findAllWallets(): Promise<Response> {
    const url = `${this.urlBase}`;
    return await apiErrorHandler(this.fetch)(url, {
      method: 'GET',
    });
  }

  async updateWallet(updateWallet: CreateWalletDto): Promise<Response> {
    const { id, ...updateWalletDto } = updateWallet;
    const url = `${this.urlBase}/${id}`;
    return await apiErrorHandler(this.fetch)(url, {
      method: 'PATCH',
      body: JSON.stringify(updateWalletDto),
    });
  }

  async removeWallet(deleteWallet: CreateWalletDto): Promise<Response> {
    const url = `${this.urlBase}/${deleteWallet.id}`;
    return await apiErrorHandler(this.fetch)(url, {
      method: 'DELETE',
    });
  }

  async averageCalculate(investorId: string): Promise<Response> {
    const url = `${this.urlBase}/average`;
    return await apiErrorHandler(this.fetch)(url, {
      method: 'GET',
      headers: {
        investorId,
      },
    });
  }

  async listTickets(investorId: string, brokerId: string, ticketId: string): Promise<Response> {
    const url = `${this.urlBase}/list`;
    return await apiErrorHandler(this.fetch)(url, {
      method: 'GET',
      headers: {
        investorId,
        brokerId,
        ticketId,
      },
    });
  }
}
