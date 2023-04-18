import { Country } from "~/model/hera/Country";
import { State } from "~~/model/State";
import { StateDto } from "~~/model/StateDto";

export function StateUtils() {
  const stateToDto = (state: State): StateDto => {
    const stateDto: StateDto = {
      id: state.id,
      stateName: state.stateName,
      stateCode: state.stateCode,
      countryName: state.stateCountry.countryName,
      stateEnabled: state.stateEnabled,
      stateDeleted: state.stateDeleted,
    };
    return stateDto;
  };

  return {
    stateToDto,
  };
}
