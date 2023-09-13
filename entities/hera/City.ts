import { State } from './State';

export interface City {
    id: string;
    cityName: string;
    cityCode: number;
    cityState: State;
    cityEnabled: boolean;
    cityDeleted: boolean;
}