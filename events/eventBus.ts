// eventBus.ts
import { ref, watch } from 'vue';

interface EventBusType {
  refreshTable: boolean;
}

const eventBusState: EventBusType = {
  refreshTable: false,
};

const eventBus = ref(eventBusState);

export const useEventBus = () => {
  return eventBus;
};

export const emitEventBus = (key: keyof EventBusType, value: boolean) => {
  eventBus.value[key] = value;
};
