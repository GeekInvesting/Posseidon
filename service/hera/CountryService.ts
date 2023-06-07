import { apiErrorHandler } from "~/middleware/apiErrorHandler";
import { ApiService } from "../ApiService";
import { urlHera } from "../BaseUrl";

export class CountryService extends ApiService {
  baseUrl = `${urlHera}/country`;

  constructor() {
    super();
  }

  async getAllCountriesName(): Promise<Response> {
    const url = `${this.baseUrl}/name`;
    return await apiErrorHandler(this.fetch)(url, {
      method: "GET",
    });
  };

}
