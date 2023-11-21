import {State} from "~/entities/hera/State";
import {StateDto} from "~/entities/hera/StateDto";

export function StateUtils() {
  const stateToDto = (state: State): StateDto => {
    return {
      _id: state.id,
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
