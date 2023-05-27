// eventBus.ts
import { ref, watch } from 'vue';

interface EventBusType {
  refreshCountries: boolean;
  refreshStates: boolean;
  refreshCities: boolean;
  refreshLogin: boolean;
  dialogInvestor: boolean;
  refreshExchange: boolean;
  refreshSectors: boolean;
  refreshSubsectors: boolean;
}

const eventBusState: EventBusType = {
  refreshCountries: false,
  refreshStates: false,
  refreshCities: false,
  refreshLogin: false,
  dialogInvestor: false,
  refreshExchange: false,
  refreshSectors: false,
  refreshSubsectors: false,
};


const eventBus = ref(eventBusState);

export const useEventBus = () => {
  return eventBus;
};

export const emitEventBus = (key: keyof EventBusType, value: boolean) => {
  eventBus.value[key] = value;
};
