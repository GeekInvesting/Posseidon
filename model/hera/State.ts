import { Country } from "./Country";

export interface State {
  id: string;
  stateName: string;
  stateCode: string;
  stateCountry: Country;
  stateEnabled: boolean;
  stateDeleted: boolean;
}
