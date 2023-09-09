import {ApiService} from "~/service/ApiService";
import {urlAtena} from "~/service/BaseUrl";
import {apiErrorHandler} from "~/middleware/apiErrorHandler";
import {SchedulerEntity} from "~/model/atena/scheduler.entity";

export class SchedulerService extends ApiService {
    constructor() {
        super();
    }

    urlBase = `${urlAtena}/report`;

    async findAll() {
        const url = `${this.urlBase}/all`;
        return await apiErrorHandler(this.fetch)(url, {
            method: 'GET',
        });
    }

    async findAllNotAdmin(userId: string) {
        const url = `${this.urlBase}/all-not-admin`;
        return await apiErrorHandler(this.fetch)(url, {
            method: 'GET',
            headers: {
                userId
            }
        });
    }

    update(schedulerUpdate: SchedulerEntity) {
        const { id, ...schedulerUpdateDto } = schedulerUpdate;
        const url = `${this.urlBase}/${id}`;
        return apiErrorHandler(this.fetch)(url, {
            method: 'PATCH',
            body: JSON.stringify(schedulerUpdateDto),
        });
    }
}
