import {ApiService} from "~/service/ApiService";
import {urlZeus} from "~/service/BaseUrl";
import {CreateBrokerDto} from "~/model/zeus/broker.entity";
import {apiErrorHandler} from "~/middleware/apiErrorHandler";

export class BrokerService extends ApiService {
  constructor() {
    super();
  }

  urlbase = `${urlZeus}/broker`;

  async createBroker(broker: CreateBrokerDto): Promise<Response> {
    const url = `${this.urlbase}`;
    return await apiErrorHandler(this.fetch)(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(broker),
    });
  }

  async getAllBrokers(): Promise<Response> {
    const url = `${this.urlbase}/all`;
    return await apiErrorHandler(this.fetch)(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async updateBroker(broker: CreateBrokerDto): Promise<Response> {
    const {id, ...rest} = broker;
    const url = `${this.urlbase}/${id}`;
    return await apiErrorHandler(this.fetch)(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rest),
    });
  }

  async enableBroker(id: string): Promise<Response> {
    const url = `${this.urlbase}/${id}/enable`;
    return await apiErrorHandler(this.fetch)(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async disableBroker(id: string): Promise<Response> {
    const url = `${this.urlbase}/${id}/disable`;
    return await apiErrorHandler(this.fetch)(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async deleteBroker(id: string): Promise<Response> {
    const url = `${this.urlbase}/${id}`;
    return await apiErrorHandler(this.fetch)(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async getBrokerComplete(): Promise<Response> {
    const url = `${this.urlbase}/complete`;
    return await apiErrorHandler(this.fetch)(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
