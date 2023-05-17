// eventBus.ts
import { ref, watch } from 'vue';

interface EventUserType {
    showUserComponent: number;
}

const eventUserState: EventUserType = {
    showUserComponent: 0,
};


const eventBus = ref(eventUserState);

export const useEventUser = () => {
  return eventBus;
};

export const emitEventUser = (key: keyof EventUserType, value: number) => {
  eventBus.value[key] = value;
};
