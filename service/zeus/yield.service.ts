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

  async removeYield(id: string): Promise<Response> {
    const url = `${this.baseUrl}/${id}/confirm`;
    return await apiErrorHandler(this.fetch)(url, {
      method: "DELETE",
    });
  }

  async listYield(ticketId: string, brokerId: string, investorId: string): Promise<Response> {
    const url = `${this.baseUrl}/list`;
    return await apiErrorHandler(this.fetch)(url, {
        method: "GET",
      headers: {
        ticketId,
        brokerId,
        investorId,
      },
    });
  }

  async calcYield(ticketId: string, brokerId: string, investorId: string): Promise<Response> {
    const url = `${this.baseUrl}/calc`;
    return await apiErrorHandler(this.fetch)(url, {
        method: "GET",
      headers: {
        ticketId,
        brokerId,
        investorId,
      },
    });
  }
}
