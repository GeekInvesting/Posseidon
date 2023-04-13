// eventBus.ts
import { ref, watch } from 'vue';

interface EventBusType {
  refreshCountries: boolean;
  refreshStates: boolean;
}

const eventBusState: EventBusType = {
  refreshCountries: false,
  refreshStates: false,
};

const eventBus = ref(eventBusState);

export const useEventBus = () => {
  return eventBus;
};

export const emitEventBus = (key: keyof EventBusType, value: boolean) => {
  eventBus.value[key] = value;
};
