import { Country } from "~/modelService/hera/Country";
import { State } from "~/modelService/hera/State";
import { StateDto } from "~/modelService/hera/StateDto";

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
