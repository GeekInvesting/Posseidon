//utils/service/hefesto/SectorService.ts
import { Sector } from "~/model/hefesto/Sector";
import { ApiService } from "../ApiService";
import { apiErrorHandler } from "~/middleware/apiErrorHandler";

export class SectorService extends ApiService{
  private urlBase:string = urlHefesto;

  constructor() {
    super();
  };

    async createSector(sector: Sector): Promise<Response> {
      const url = `${this.urlBase}/sector`;
      return await apiErrorHandler(this.fetch)(url, {
        method: "POST",
        body: JSON.stringify(sector),
      });
    }

    async updateSector(sector: Sector): Promise<Response> {
      const url = `${this.urlBase}/sector/${sector.sectorId}`;
      return await apiErrorHandler(this.fetch)(url, {
        method: "PUT",
        body: JSON.stringify(sector),
      });
    }
}