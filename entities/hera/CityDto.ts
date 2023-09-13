export interface CityDto {
    id: string;
    cityName: string;
    cityCode: number | null;
    cityState: string;
    cityCountry: string;
    cityEnabled: boolean;
    cityDeleted: boolean;
}