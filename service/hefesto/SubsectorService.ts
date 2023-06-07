import { Subsector, SubsectorDto } from "~/model/hefesto/Subsector";
import { ApiService } from "../ApiService";
import { apiErrorHandler } from "~/middleware/apiErrorHandler";
import { urlHefesto } from "../BaseUrl";

export class SubsectorService extends ApiService {
  private urlBase: string = `${urlHefesto}/subsector`;

  constructor() {
    super();
  }

  async createSubsector(subsector: Partial<SubsectorDto>): Promise<Response> {
    const url = `${this.urlBase}`;
    return await apiErrorHandler(this.fetch)(url, {
      method: "POST",
      body: JSON.stringify(subsector),
    });
  }

  async getSubsectors(): Promise<Response> {
    const url = `${this.urlBase}/all`;
    return await apiErrorHandler(this.fetch)(url, {
      method: "GET",
    });
  }

  async updateSubsector(subsector: Partial<SubsectorDto>): Promise<Response> {
    const url = `${this.urlBase}/${subsector.id}`;
    return await apiErrorHandler(this.fetch)(url, {
      method: "PUT",
      body: JSON.stringify(subsector),
    });
  }

  async enableSubsector(subsector: Partial<Subsector>): Promise<Response> {
    const url = `${this.urlBase}/enable/${subsector.id}`;
    return await apiErrorHandler(this.fetch)(url, {
      method: "PUT",
    });
  }

  async disableSubsector(subsector: Partial<Subsector>): Promise<Response> {
    const url = `${this.urlBase}/disable/${subsector.id}`;
    return await apiErrorHandler(this.fetch)(url, {
      method: "PUT",
    });
  }

  async deleteSubsector(subsector: Partial<Subsector>): Promise<Response> {
    const url = `${this.urlBase}/delete/${subsector.id}`;
    return await apiErrorHandler(this.fetch)(url, {
      method: "DELETE",
    });
  }

  async listSubsectorName(): Promise<Response> {
    const url = `${this.urlBase}/all/name`;
    return await apiErrorHandler(this.fetch)(url, {
      method: "GET",
    });
  }
}
