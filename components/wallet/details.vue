<template>
  <div class="flex flex-rows">
    <div class="shadow-md container mx-auto basis-1/8 p-3 hover:italic">
      Amount:
      <p class="normal-nums font-bold">{{ walletAverage.amount }}</p>
    </div>
    <div class="shadow-md container mx-auto basis-1/8 p-3 hover:italic">
      Average Price:
      <p class="normal-nums font-bold">{{
          walletAverage.averagePrice.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
        }}</p>
    </div>
    <div class="shadow-md container mx-auto basis-1/8 p-3 hover:italic">
      Total:
      <p class="normal-nums font-bold">{{
          walletAverage.total.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
        }}</p>
    </div>
  </div>
  <div class="flex flex-rows">
    <div class="shadow-md container mx-auto basis-1/8 p-3 hover:italic">
      Current Price:
      <p class="normal-nums font-bold">{{
          walletAverage.currentPrice.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
        }}</p>
    </div>
    <div class="shadow-md container mx-auto basis-1/8 p-3 hover:italic">
      Result:
      <p
        class="normal-nums font-bold"
        :class="resultPositive ? 'text-green-600' : 'text-red-600'"
      >
        {{ walletAverage.result.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}) }}
      </p>
    </div>
    <div class="shadow-md container mx-auto basis-1/8 p-3 hover:italic">
      Result Percent:
      <p
        class="normal-nums font-bold"
        :class="resultPositive ? 'text-green-600' : 'text-red-600'"
      >
        {{ walletAverage.resultPercent.toLocaleString('pt-BR', {style: 'percent', minimumFractionDigits: 2}) }}
      </p>
    </div>
  </div>
  <div class="flex flex-rows">
    <div class="shadow-md container mx-auto basis-1/8 p-3 hover:italic">
      Profit:
      <p
        class="normal-nums font-bold"
        :class="profitPositive ? 'text-green-600' : 'text-red-600'"
      >
        {{ walletAverage.profit.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}) }}
      </p>
    </div>
    <div class="shadow-md container mx-auto basis-1/8 p-3 hover:italic">
      Profitability:
      <p
        class="normal-nums font-bold"
        :class="profitPositive ? 'text-green-600' : 'text-red-600'"
      >
        {{ walletAverage.profitability.toLocaleString('pt-BR', {style: 'percent', minimumFractionDigits: 2}) }}
      </p>
    </div>
      <div class="shadow-md container mx-auto basis-1/8 p-3 hover:italic" v-if="yieldTotal > 0">
        Yield Total:
        <p
          class="normal-nums font-bold"
          :class="yieldTotal >= 0 ? 'text-green-600' : 'text-red-600'"
        >
          {{ yieldTotal.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}) }}
        </p>
      </div>
      <div class="shadow-md container mx-auto basis-1/8 p-3 hover:italic" v-if="yieldTotal > 0">
        Yield Percent:
        <p
          class="normal-nums font-bold"
          :class="yieldPercent >= 0 ? 'text-green-600' : 'text-red-600'"
        >
          {{ yieldPercent.toLocaleString('pt-BR', {style: 'percent', minimumFractionDigits: 2}) }}
        </p>
      </div>
  </div>
  <div class="flex flex-rows">
    <span class="shadow-md container mx-auto basis-1/8 p-3 hover:italic">
      Hello Grafic
    </span>
  </div>
  <div class="grid grid-cols-2">
    <span class="shadow-md container mx-auto basis-1/8 p-3 hover:italic">
      <WalletListWallet
        :investor-id="walletAverage.investorId"
        :broker-id="walletAverage.brokerId"
        :ticket-id="walletAverage.ticketId"
        class="justify-center"
      />
    </span>
    <span class="shadow-md container mx-auto basis-1/8 p-3 hover:italic">
      <WalletListYieldCalc
        :investor-id="walletAverage.investorId"
        :broker-id="walletAverage.brokerId"
        :ticket-id="walletAverage.ticketId"
        class="justify-center"
      />
    </span>
  </div>
</template>

<script lang="ts" setup>
import {WalletAverageEntity} from "~/model/zeus/wallet-average.entity";
import {YieldService} from "~/service/zeus/yield.service";

const resultPositive = ref(true)
const profitPositive = ref(true)
const yieldTotal = ref(0)
const yieldPercent = ref(0)

const yieldService = new YieldService();

onMounted(() => {
  fetchYieldCalc().then(r => r);
  //console.log('walletAverange', walletAverange.value)
  resultPositive.value = walletAverage.value.result >= 0
  profitPositive.value = walletAverage.value.profit >= 0
})

const props = defineProps({
  initialData: {
    type: Object,
    required: true,
  },
})

const walletAverage: Ref<WalletAverageEntity> = ref({
  investorId: props.initialData.investorId || '',
  Investor: props.initialData.Investor,
  ticketId: props.initialData.ticketId || '',
  Ticket: props.initialData.Ticket,
  brokerId: props.initialData.brokerId || '',
  Broker: props.initialData.Broker,
  amount: props.initialData.amount || 0,
  averagePrice: props.initialData.averagePrice || 0,
  total: props.initialData.total || 0,
  currentPrice: props.initialData.currentPrice || 0,
  result: props.initialData.result || 0,
  resultPercent: props.initialData.resultPercent || 0,
  profit: props.initialData.profit || 0,
  profitability: props.initialData.profitability || 0,
})

watch(() => props.initialData, (value) => {
  walletAverage.value = {
    investorId: value.investorId || '',
    Investor: value.Investor,
    ticketId: value.ticketId || '',
    Ticket: value.Ticket,
    brokerId: value.brokerId || '',
    Broker: value.Broker,
    amount: value.amount || 0,
    averagePrice: value.averagePrice || 0,
    total: value.total || 0,
    currentPrice: value.currentPrice || 0,
    result: value.result || 0,
    resultPercent: value.resultPercent || 0,
    profit: value.profit || 0,
    profitability: value.profitability || 0,
  }
})

const fetchYieldCalc = async () => {
  const response = await yieldService.calcYield(
    walletAverage.value.ticketId,
    walletAverage.value.brokerId,
    walletAverage.value.investorId,
  );
  yieldTotal.value = await response.text() as unknown as number || 0;
  yieldPercent.value = (yieldTotal.value / walletAverage.value.total);
}
</script>
