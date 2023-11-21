import {ApiService} from "~/service/ApiService";
import {urlDemeter} from "~/service/BaseUrl";
import {apiErrorHandler} from "~/middleware/apiErrorHandler";

export class AverageService extends ApiService {
  constructor() {
    super();
  }

  urlBase = `${urlDemeter}/average`;

  async averageCalculate(investorId: string): Promise<Response> {
    const url = `${this.urlBase}`;
    return await apiErrorHandler(this.fetch)(url, {
      method: 'GET',
      headers: {
        investorId,
      },
    });
  }
}
