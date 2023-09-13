import { Company } from "~/entities/hefesto/Company";
import { ApiService } from "../ApiService";
import { urlHefesto } from "../BaseUrl";

export class CompanyService extends ApiService {
    urlBase: string = `${urlHefesto}/company`;

    constructor() {
        super();
    };

    async createCompany(company: Partial<Company>): Promise<Response> {
        const url = `${this.urlBase}`;
        return await this.fetch(url, {
            method: "POST",
            body: JSON.stringify(company),
        });
    };

    async getAllCompanies(): Promise<Response> {
        const url = `${this.urlBase}/all`;
        return await this.fetch(url, {
            method: "GET",
        });
    };

    async updateCompany(company: Partial<Company>): Promise<Response> {
        const url = `${this.urlBase}/${company.id}`;
        return await this.fetch(url, {
            method: "PUT",
            body: JSON.stringify(company),
        });
    };

    async deleteCompany(company: Partial<Company>): Promise<Response> {
        const url = `${this.urlBase}/delete/${company.id}`;
        return await this.fetch(url, {
            method: "DELETE",
        });
    };

    async enableCompany(company: Partial<Company>): Promise<Response> {
        const url = `${this.urlBase}/enable/${company.id}`;
        return await this.fetch(url, {
            method: "PUT",
        });
    };

    async disableCompany(company: Partial<Company>): Promise<Response> {
        const url = `${this.urlBase}/disable/${company.id}`;
        return await this.fetch(url, {
            method: "PUT",
        });
    };

    async listCompanyName(): Promise<Response> {
        const url = `${this.urlBase}/all/name`;
        return await this.fetch(url, {
            method: "GET",
        });
    }
}
