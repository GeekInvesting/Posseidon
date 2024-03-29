import {ApiService} from "~/service/ApiService";
import {urlZeus} from "~/service/BaseUrl";
import {Operation} from "~/entities/zeus/operation.entity";
import {apiErrorHandler} from "~/middleware/apiErrorHandler";

export class OperationService extends ApiService {
  baseUrl = `${urlZeus}/operation`;

  constructor() {
    super();
  }

  async createOperation(operation: Operation): Promise<Response> {
    const url = `${this.baseUrl}`;
    return await apiErrorHandler(this.fetch)(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(operation),
    });
  };

  async getAllOperations(): Promise<Response> {
    const url = `${this.baseUrl}/all`;
    return await apiErrorHandler(this.fetch)(url, {
      method: "GET",
    });
  }

  async updateOperation(operation: Operation): Promise<Response> {
    //console.log(operation);
    const { _id, ...rest } = operation;
    const url = `${this.baseUrl}/${_id}`;
    return await apiErrorHandler(this.fetch)(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rest),
    });
  }

  async deleteOperation(id: string): Promise<Response> {
    const url = `${this.baseUrl}/${id}`;
    return await apiErrorHandler(this.fetch)(url, {
      method: "DELETE",
    });
  }

  async getOperationBySystem(system: string): Promise<Response> {
    const url = `${this.baseUrl}/system/${system}`;
    return await apiErrorHandler(this.fetch)(url, {
      method: "GET",
    });
  }
}
