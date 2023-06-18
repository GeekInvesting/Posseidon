import { Country } from "../hera/Country";

export interface Exchange {
    exchangeId: string;
    id: string;
    exchangeName: string;
    exchangeCode: string;
    exchangeCurrency: string;
    exchangeCountry: Country;
    exchangeEnabled: boolean;
    exchangeDeleted: boolean;
}

export interface ExchangeDto {
    exchangeId: string;
    exchangeName: string;
    exchangeCode: string;
    exchangeCurrency: string;
    exchangeCountry: string;
    exchangeEnabled: boolean;
    exchangeDeleted: boolean;
}