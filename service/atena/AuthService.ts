import { apiErrorHandler } from "~/middleware/apiErrorHandler";
import { ApiService } from "../ApiService";
import { urlAtena } from "../BaseUrl";

export class AuthService extends ApiService {
  constructor() {
    super();
  }
  private baseUrl = `${urlAtena}/auth`;

  async login(userEmail: string, userPassword: string): Promise<Response> {
    const url = `${this.baseUrl}/login`;
    return await apiErrorHandler(this.fetch)(url, {
      method: "POST",
      body: JSON.stringify({ userEmail, userPassword }),
    });
  }

  async validateToken(): Promise<Response> {
    const url = `${this.baseUrl}/validate`;
    return await apiErrorHandler(this.fetch)(url, {
      method: "POST",
    });
  }
}
