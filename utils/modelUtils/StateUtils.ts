import {State} from "~/model/hera/State";
import {StateDto} from "~/model/hera/StateDto";

export function StateUtils() {
  const stateToDto = (state: State): StateDto => {
    return {
      id: state.id,
      stateName: state.stateName,
      stateCode: state.stateCode,
      countryName: state.stateCountry.countryName,
      stateEnabled: state.stateEnabled,
      stateDeleted: state.stateDeleted,
    };
  };

  return {
    stateToDto,
  };
}
