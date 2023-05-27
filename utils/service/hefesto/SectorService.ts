//utils/service/hefesto/SectorService.ts
import { Sector } from "~/model/hefesto/Sector";
import { ApiService } from "../ApiService";
import { apiErrorHandler } from "~/middleware/apiErrorHandler";

export class SectorService extends ApiService {
  private urlBase: string = urlHefesto;

  constructor() {
    super();
  }

  async createSector(sector: Partial<Sector>): Promise<Response> {
    const url = `${this.urlBase}/sector`;
    return await apiErrorHandler(this.fetch)(url, {
      method: "POST",
      body: JSON.stringify(sector),
    });
  }

  async updateSector(sector: Partial<Sector>): Promise<Response> {
    const url = `${this.urlBase}/sector/${sector.sectorId}`;
    return await apiErrorHandler(this.fetch)(url, {
      method: "PUT",
      body: JSON.stringify(sector),
    });
  }

  async getAllSectors(): Promise<Response> {
    const url = `${this.urlBase}/sector/all`;
    return await apiErrorHandler(this.fetch)(url, {
      method: "GET",
    });
  }

  async deleteSector(sectorId: string): Promise<Response> {
    const url = `${this.urlBase}/sector/${sectorId}`;
    return await apiErrorHandler(this.fetch)(url, {
      method: "DELETE",
    });
  }

  async disableSector(sectorId: string): Promise<Response> {
    const url = `${this.urlBase}/sector/disable/${sectorId}`;
    return await apiErrorHandler(this.fetch)(url, {
      method: "PUT",
    });
  }

  async enableSector(sectorId: string): Promise<Response> {
    const url = `${this.urlBase}/sector/enable/${sectorId}`;
    return await apiErrorHandler(this.fetch)(url, {
      method: "PUT",
    });
  }

  async getAllSectorsName(): Promise<Response> {
    const url = `${this.urlBase}/sector/all/name`;
    return await apiErrorHandler(this.fetch)(url, {
      method: "GET",
    });
  };
}
