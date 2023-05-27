export function apiErrorHandler(fn: (...args: any[]) => Promise<Response>) {
  return async (...args: any[]): Promise<Response | any> => {
    try {
      const response = await fn(...args);
      return response;
    } catch (error) {
      console.error("Erro na chamada de API:", error);
      PosseidonNotif("error", `${error}`)
      //throw error;
      return;
    }
  };
}
