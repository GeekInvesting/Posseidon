import {ApiService} from "~/service/ApiService";
import {urlDemeter} from "~/service/BaseUrl";

export class DashboardService extends ApiService {
  constructor() {
    super();
  }

  urlBase = `${urlDemeter}/dashboard`;

  async dashCount(investorId: string): Promise<Response> {
const url = `${this.urlBase}/count`;
    return await this.fetch(url, {
      method: 'GET',
      headers: {
        investorId,
      },
    });
  }
}
