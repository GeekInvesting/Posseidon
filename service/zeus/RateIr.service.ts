import {ApiService} from "~/service/ApiService";
import {urlZeus} from "~/service/BaseUrl";
import {CreateRateIrDto} from "~/entities/zeus/rateIr.entity";
import {apiErrorHandler} from "~/middleware/apiErrorHandler";

export class RateIrService extends ApiService {
  constructor() {
    super();
  }
  baseUrl = `${urlZeus}/rate-ir`;

  async createRateIr(rateIr: CreateRateIrDto): Promise<Response> {
    const {_id, ...rateIrCreate} = rateIr;
    console.log(rateIrCreate);
    const url = `${this.baseUrl}`;
    return await apiErrorHandler(this.fetch)(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rateIrCreate),
    });
  }

  findAll(): Promise<Response> {
    const url = `${this.baseUrl}`;
    return apiErrorHandler(this.fetch)(url, {
      method: "GET",
    });
  }

  updateRateIr(rateIr: CreateRateIrDto): Promise<Response> {
    const {_id, ...rateIrUpdate} = rateIr;
    const url = `${this.baseUrl}/${_id}`;
    return apiErrorHandler(this.fetch)(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rateIrUpdate),
    });
  }

  removeRateIr(rateIr: CreateRateIrDto): Promise<Response> {
    const url = `${this.baseUrl}/${rateIr._id}`;
    return apiErrorHandler(this.fetch)(url, {
      method: "DELETE",
    })
  }

  getRateCalculate(operationId: string, typeId: string, system: string): Promise<Response> {
    const url = `${this.baseUrl}/calculate`;
    return apiErrorHandler(this.fetch)(url, {
      method: "GET",
      headers: {
        "operationId": operationId,
        "typeId": typeId,
        "system": system,
      }
    })
  }
}
