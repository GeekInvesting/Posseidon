import { Exchange } from "~/model/hefesto/Exchange";

export const createExchange = async (exchange: Exchange) => {
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

export const updateExchange = async (exchange: Exchange) => {
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
