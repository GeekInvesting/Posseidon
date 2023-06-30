import {ApiService} from "~/service/ApiService";
import {urlZeus} from "~/service/BaseUrl";
import {apiErrorHandler} from "~/middleware/apiErrorHandler";
import {CreateWalletDto} from "~/model/zeus/wallet.entity";

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
    })
  }
}
