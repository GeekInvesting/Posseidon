// eventBus.ts
import { ref, watch } from 'vue';

export interface EventBusType {
  refreshCountries: boolean;
  refreshStates: boolean;
  refreshCities: boolean;
  refreshLogin: boolean;
  dialogInvestor: boolean;
  dialogCreate: boolean;
  refreshExchange: boolean;
  refreshSectors: boolean;
  refreshSubsectors: boolean;
  refreshTypes: boolean;
  refreshCompanies: boolean;
  refreshTickets: boolean;
  refreshInvestors: boolean;
  refreshUsers: boolean;
  refreshOperations: boolean;
}

const eventBusState: EventBusType = {
  refreshCountries: false,
  refreshStates: false,
  refreshCities: false,
  refreshLogin: false,
  dialogInvestor: false,
  dialogCreate: false,
  refreshExchange: false,
  refreshSectors: false,
  refreshSubsectors: false,
  refreshTypes: false,
  refreshCompanies: false,
  refreshTickets: false,
  refreshInvestors: false,
  refreshUsers: false,
  refreshOperations: false,
};


const eventBus = ref(eventBusState);

export const useEventBus = () => {
  return eventBus;
};

export const emitEventBus = (key: keyof EventBusType, value: boolean) => {
  eventBus.value[key] = value;
};
