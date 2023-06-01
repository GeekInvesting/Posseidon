import { Company } from "~/model/hefesto/Company";
import { ApiService } from "../ApiService";

export class CompanyService extends ApiService {
    urlBase: string = `${urlHefesto}/company`;

    constructor() {
        super();
    }

    async createCompany(company: Partial<Company>): Promise<Response> {
        const url = `${this.urlBase}`;
        return await this.fetch(url, {
            method: "POST",
            body: JSON.stringify(company),
        });
    };

    
}