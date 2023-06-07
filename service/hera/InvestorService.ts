import { InvestorDto, InvestorHera } from "~/model/hera/InvestorHera";
import { ApiService } from "../ApiService";
import { urlHera } from "../BaseUrl";
import { apiErrorHandler } from "~/middleware/apiErrorHandler";

export class InvestorHeraService extends ApiService {
  baseUrl = `${urlHera}/investor`;

  constructor() {
    super();
  }

  async createInvestor(investor: InvestorDto): Promise<Response> {
    const url = `${this.baseUrl}`;
    return await apiErrorHandler(this.fetch)(url, {
      method: "POST",
      body: JSON.stringify(investor),
    });
  }

  async getAllInvestors(): Promise<Response> {
    const url = `${this.baseUrl}/all`;
    return await apiErrorHandler(this.fetch)(url, {
      method: "GET",
    });
  }
}
