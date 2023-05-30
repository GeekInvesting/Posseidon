import { TypeModel } from "~/model/hefesto/TypeModel";
import { ApiService } from "../ApiService";
import { apiErrorHandler } from "~/middleware/apiErrorHandler";

export class TypeService extends ApiService {
    urlBase: string = `${urlHefesto}/type`;

    constructor() {
        super();
    }

    async createType(type: Partial<TypeModel>): Promise<Response> {
        const url = `${this.urlBase}`;
        return await apiErrorHandler(this.fetch)(url, {
            method: "POST",
            body: JSON.stringify(type),
        });
    };

    
}