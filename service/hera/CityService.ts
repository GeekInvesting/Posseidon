import { apiErrorHandler } from "~/middleware/apiErrorHandler";
import { ApiService } from "../ApiService";
import { urlHera } from "../BaseUrl";

export class CityService extends ApiService {
    baseUrl = `${urlHera}/city`;
    constructor() {
        super();
    }
    async getAllCitiesNameByState(stateName: string): Promise<Response> {
        const url = `${this.baseUrl}/name/state/${stateName}`;
        return await apiErrorHandler(this.fetch)(url, {
            method: "GET",
        });
    }
}