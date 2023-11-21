import { UnauthorizedError } from "~/utils/error/unauthorized.utils";

export function apiErrorHandler(fn: (...args: any[]) => Promise<Response>) {
  return async (...args: any[]): Promise<Response | any> => {
    try {
      const [response] = await Promise.all([fn(...args)]);
      return response;
    } catch (error: Response | any) {
      console.error("Erro na chamada de API:", error);
      console.log(error.status);
      if (error.status == 401) {
        const unauthorizedError = new UnauthorizedError();
        unauthorizedError.directUnauthorized('Restricted area, please login');
        return;
      }
      PosseidonNotif("error", `${error}`)

      return;
    }
  };
}
