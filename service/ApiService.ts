//utils/service/ApiService.ts
import {UnauthorizedError} from "~/utils/error/unauthorized.utils";

export class ApiService {

  constructor() {
  };
  unauthorized = new UnauthorizedError();

  async fetch(url: string, options: RequestInit): Promise<Response> {
    // TODO: add timeout response
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "authorization": "Bearer " + localStorage.getItem("token"),
        ...(options.headers || {}),
      },
    });

    if (response.status === 401) {
      this.unauthorized.directUnauthorized('Restricted area, please login');
    }
    if (!response.ok) {
      const body = await response.json();
      throw new Error(`${ body.message || response.statusText}`);
    }

    return response;
  }
}
