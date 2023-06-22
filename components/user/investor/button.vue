//UserInvestorButton
<template>
  <el-button
    plain
    @click="selectInvestor"
    size="large"
    >
    {{ investor }}
    </el-button>
</template>

<script lang="ts" setup>
import { emitEventBus } from '~/events/eventBus';
import {InvestorHera} from "~/model/hera/InvestorHera";

const router = useRouter();

const props = defineProps({
  investor: {
    type: Object,
    default: () => ({}),
  },
  origin: {
    type: String,
    default: "nav",
  },
});

const origin = ref(props.origin);

const investor: Ref<Partial<InvestorHera>> = ref({
  id: props.investor.id || "",
  investorName: props.investor.investorName || "",
  investorEnabled: props.investor.investorEnabled || false,
  investorDeleted: props.investor.investorDeleted || false,
});

watch(props.investor, (newVal) => {
  investor.value = {
    id: newVal.id || "",
    investorName: newVal.investorName || "",
    investorEnabled: newVal.investorEnabled || false,
    investorDeleted: newVal.investorDeleted || false,
  };
});

const selectInvestor = () => {
  localStorage.setItem("investor", JSON.stringify(investor.value));

  if (origin.value == "signin") {
    setTimeout(() => {
        router.push("/");
      }, 500);
  }

  if (origin.value == "navUser") {
    emitEventBus("dialogInvestor", true);
  }
};

</script>
