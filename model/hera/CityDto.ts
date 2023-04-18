export interface CityDto {
    id: string;
    cityName: string;
    cityCode: number | null;
    cityState: string;
    cityEnabled: boolean;
    cityDeleted: boolean;
}