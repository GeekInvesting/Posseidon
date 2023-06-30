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

  async updateInvestor(investor: InvestorDto): Promise<Response> {
    const url = `${this.baseUrl}/${investor.id}`;
    return await apiErrorHandler(this.fetch)(url, {
      method: "PUT",
      body: JSON.stringify(investor),
    });
  }

  async deleteInvestor(investor: InvestorHera): Promise<Response> {
    const url = `${this.baseUrl}/delete/${investor.id}`;
    return await apiErrorHandler(this.fetch)(url, {
      method: "DELETE",
    });
  }

  async getInvestorByUser(user: string): Promise<Response> {
    const url = `${this.baseUrl}/user/${user}`;
    return await apiErrorHandler(this.fetch)(url, {
      method: "GET",
    });
  }

  async disableInvestor(investor: InvestorHera): Promise<Response> {
    const url = `${this.baseUrl}/disable/${investor.id}`;
    return await apiErrorHandler(this.fetch)(url, {
      method: "PUT",
    });
  }

  async enableInvestor(investor: InvestorHera): Promise<Response> {
    const url = `${this.baseUrl}/enable/${investor.id}`;
    return await apiErrorHandler(this.fetch)(url, {
      method: "PUT",
    });
  }

  async getInvestorComplete(): Promise<Response> {
    const url = `${this.baseUrl}/name/complete`;
    return await apiErrorHandler(this.fetch)(url, {
      method: "GET",
    });
  }
}
