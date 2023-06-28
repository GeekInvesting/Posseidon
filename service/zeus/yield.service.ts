import {ApiService} from "~/service/ApiService";
import {urlZeus} from "~/service/BaseUrl";
import {apiErrorHandler} from "~/middleware/apiErrorHandler";
import {CreateYieldDto} from "~/model/zeus/yield.entity";

export class YieldService extends ApiService {
  constructor() {
    super();
  }
  baseUrl = `${urlZeus}/yield`

  async createYield(yieldCreate: CreateYieldDto): Promise<Response> {
    const url = `${this.baseUrl}`
    const { id, ...yieldCreateDto } = yieldCreate;
    return await apiErrorHandler(this.fetch)(url, {
      method: 'POST',
      body: JSON.stringify(yieldCreateDto),
    })
  }

  async getAllYields(): Promise<Response> {
    const url = `${this.baseUrl}/all`;
    return await apiErrorHandler(this.fetch)(url, {
      method: "GET",
    });
  }

  async updateYield(yieldUpdate: CreateYieldDto): Promise<Response> {
    const { id, ...yieldUpdateDto } = yieldUpdate;
    const url = `${this.baseUrl}/${id}`;
    return await apiErrorHandler(this.fetch)(url, {
      method: "PATCH",
      body: JSON.stringify(yieldUpdateDto),
    });
  }
}
