import { Exchange, ExchangeDto } from "~/entities/hefesto/Exchange";
import { ApiService } from "../ApiService";
import { apiErrorHandler } from "~/middleware/apiErrorHandler";
import { urlHefesto } from "../BaseUrl";

export const createExchange = async (exchange: ExchangeDto) => {
  const response = await fetch(`${urlHefesto}/exchange`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "authorization": "Bearer " + localStorage.getItem("token")
    },
    body: JSON.stringify(exchange),
  });

  return response;
};

export const updateExchange = async (exchange: ExchangeDto) => {
  //console.log(exchange);
  const response = await fetch(`${urlHefesto}/exchange/${exchange.exchangeId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "authorization": "Bearer " + localStorage.getItem("token")
    },
    body: JSON.stringify(exchange),
  });

  return response;
}

export const getAllExchanges = async () => {
  const response = await fetch(`${urlHefesto}/exchange/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "authorization": "Bearer " + localStorage.getItem("token")
    }
  });

  return response;
}

export const enableExchange = async (exchangeId: string) => {
  const response = await fetch(`${urlHefesto}/exchange/enable/${exchangeId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "authorization": "Bearer " + localStorage.getItem("token")
    }
  });

  return response;
}

export const disableExchange = async (exchangeId: string) => {
  const response = await fetch(`${urlHefesto}/exchange/disable/${exchangeId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "authorization": "Bearer " + localStorage.getItem("token")
    }
  });

  return response;
}

export const deleteExchange = async (exchangeId: string) => {
  const response = await fetch(`${urlHefesto}/exchange/${exchangeId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "authorization": "Bearer " + localStorage.getItem("token")
    }
  });

  return response;
}

export class ExchangeService extends ApiService {
  urlBase: string = `${urlHefesto}/exchange`;

  constructor() {
    super();
  }

  async listExchangeCode(): Promise<Response> {
    const url = `${this.urlBase}/all/code`;
    return await apiErrorHandler(this.fetch)(url, {
      method: "GET",
    });
  }
}
