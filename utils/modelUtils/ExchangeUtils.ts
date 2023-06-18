import { Exchange } from "~/modelService/hefesto/Exchange";

export const exchangeToDto = (exchange: Exchange) => {
  return {
    exchangeId: exchange.id,
    exchangeName: exchange.exchangeName,
    exchangeCode: exchange.exchangeCode,
    exchangeCurrency: exchange.exchangeCurrency,
    exchangeCountry: exchange.exchangeCountry.countryName,
    exchangeEnabled: exchange.exchangeEnabled,
    exchangeDeleted: exchange.exchangeDeleted,
  };
};
