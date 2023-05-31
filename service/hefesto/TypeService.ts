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

    async getAllTypes(): Promise<Response> {
        const url = `${this.urlBase}/all`;
        return await apiErrorHandler(this.fetch)(url, {
            method: "GET",
        });
    };

    async updateType(type: Partial<TypeModel>): Promise<Response> {
        const url = `${this.urlBase}/${type.typeId}`;
        return await apiErrorHandler(this.fetch)(url, {
            method: "PUT",
            body: JSON.stringify(type),
        });
    }

    async enableType(type: Partial<TypeModel>): Promise<Response> {
        const url = `${this.urlBase}/enable/${type.id}`;
        return await apiErrorHandler(this.fetch)(url, {
            method: "PUT",
        });
    }

    async disableType(type: Partial<TypeModel>): Promise<Response> {
        const url = `${this.urlBase}/disable/${type.id}`;
        return await apiErrorHandler(this.fetch)(url, {
            method: "PUT",
        });
    }

    async deleteType(type: Partial<TypeModel>): Promise<Response> {
        const url = `${this.urlBase}/delete/${type.id}`;
        return await apiErrorHandler(this.fetch)(url, {
            method: "DELETE",
        });
    };
}