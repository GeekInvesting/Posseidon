import { City } from "~/model/hera/City"
import { CityDto } from "~/model/hera/CityDto"

export function CityUtils() {

    const cityToDto = (city: City) :CityDto => {
        return {
            id: city.id,
            cityName: city.cityName,
            cityCode: city.cityCode,
            cityState: city.cityState.stateName,
            cityCountry: city.cityState.stateCountry.countryName,
            cityEnabled: city.cityEnabled,
            cityDeleted: city.cityDeleted,
        }
    }

    return {
        cityToDto,
    }
}