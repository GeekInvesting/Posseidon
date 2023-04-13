import { Country } from "./Country";

export interface State {
  id: string;
  stateName: string;
  stateCode: string;
  stateCountry: string;
  stateEnabled: boolean;
  stateDeleted: boolean;
}
