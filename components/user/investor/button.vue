<template>
  <el-button
    plain
    @click="selectInvestor"
    size="large"
    >
    {{ investor.investorName }}
    </el-button>
</template>

<script lang="ts" setup>
import { Investor } from '~/model/atena/Investor';

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

const investor: Ref<Partial<Investor>> = ref({
  investorId: props.investor.investorId || "",
  investorName: props.investor.investorName || "",
  investorEnabled: props.investor.investorEnabled || false,
  investorDeleted: props.investor.investorDeleted || false,
});

watch(props.investor, (newVal) => {
  investor.value = {
    investorId: newVal.investorId || "",
    investorName: newVal.investorName || "",
    investorEnabled: newVal.investorEnabled || false,
    investorDeleted: newVal.investorDeleted || false,
  };
});

const selectInvestor = () => {
  localStorage.setItem("investor", JSON.stringify(investor.value));

  if (origin.value != "nav") {
    setTimeout(() => {
        router.push("/");
      }, 500);
  }
};
</script>
