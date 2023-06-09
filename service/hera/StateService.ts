import { apiErrorHandler } from "~/middleware/apiErrorHandler";
import { urlHera } from "../BaseUrl";
import { ApiService } from "../ApiService";

export class StateService extends ApiService {
  baseUrl = `${urlHera}/state`;
  constructor() {
    super();
  }
  async getAllStatesNameByCountry(countryName: string): Promise<Response> {
    const url = `${this.baseUrl}/name/country/${countryName}`;
    return await apiErrorHandler(this.fetch)(url, {
      method: "GET",
    });
  }
}
