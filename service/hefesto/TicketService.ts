import { Ticket, TicketDTO } from "~/model/hefesto/Ticket";
import { ApiService } from "../ApiService";

export class TicketService extends ApiService {
  urlBase: string = `${urlHefesto}/ticket`;

  constructor() {
    super();
  }

  async createTicket(ticket: Partial<TicketDTO>): Promise<Response> {
    const url = `${this.urlBase}`;
    return await this.fetch(url, {
      method: "POST",
      body: JSON.stringify(ticket),
    });
  }
  
}