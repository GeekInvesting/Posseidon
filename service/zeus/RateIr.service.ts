import {ApiService} from "~/service/ApiService";
import {urlZeus} from "~/service/BaseUrl";
import {CreateRateIrDto} from "~/model/zeus/rateIr.entity";
import {apiErrorHandler} from "~/middleware/apiErrorHandler";

export class RateIrService extends ApiService {
  constructor() {
    super();
  }
  baseUrl = `${urlZeus}/rate-ir`;

  async createRateIr(rateIr: CreateRateIrDto): Promise<Response> {
    const url = `${this.baseUrl}`;
    return await apiErrorHandler(this.fetch)(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rateIr),
    });
  }
}
