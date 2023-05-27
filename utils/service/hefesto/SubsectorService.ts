import { SubsectorDto } from "~/model/hefesto/Subsector";
import { ApiService } from "../ApiService";
import { apiErrorHandler } from "~/middleware/apiErrorHandler";

export class SubsectorService extends ApiService {
    private urlBase: string = urlHefesto;

    constructor() {
        super();
    }

    async createSubsector(subsector: Partial<SubsectorDto>): Promise<Response> {
        const url = `${this.urlBase}/subsector`;
        return await apiErrorHandler(this.fetch)(url, {
            method: "POST",
            body: JSON.stringify(subsector),
        });
    }

}