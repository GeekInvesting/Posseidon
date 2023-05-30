//utils/service/ApiService.ts
export class ApiService {

  constructor() {
  };

  async fetch(url: string, options: RequestInit): Promise<Response> {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "authorization": "Bearer " + localStorage.getItem("token"),
        ...(options.headers || {}),
      },
    });

    if (!response.ok) {
      throw new Error(`${ await response.text()}`);
    }

    return response;
  }
}
