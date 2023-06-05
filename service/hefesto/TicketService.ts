import { Ticket, TicketDTO } from "~/model/hefesto/Ticket";
import { ApiService } from "../ApiService";
import { apiErrorHandler } from "~/middleware/apiErrorHandler";

export class TicketService extends ApiService {
  urlBase: string = `${urlHefesto}/ticket`;

  constructor() {
    super();
  }

  async createTicket(ticket: Partial<TicketDTO>): Promise<Response> {
    const url = `${this.urlBase}`;
    return await apiErrorHandler(this.fetch)(url, {
      method: "POST",
      body: JSON.stringify(ticket),
    });
  }
  
  async getAllTickets(): Promise<Response> {
    const url = `${this.urlBase}/all`;
    return await apiErrorHandler(this.fetch)(url, {
      method: "GET",
    });
  }

  async updateTicket(ticket: Partial<TicketDTO>): Promise<Response> {
    const url = `${this.urlBase}/${ticket.id}`;
    return await apiErrorHandler(this.fetch)(url, {
      method: "PUT",
      body: JSON.stringify(ticket),
    });
  }

  async deleteTicket(ticket: Partial<TicketDTO>): Promise<Response> {
    const url = `${this.urlBase}/delete/${ticket.id}`;
    return await apiErrorHandler(this.fetch)(url, {
      method: "DELETE",
    });
  }
}