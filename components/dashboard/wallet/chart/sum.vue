<template>
  <el-card
      class="flex justify-center items-center rounded-lg"
      shadow="hover"
      v-loading="loading"
      :element-loading-svg="svg"
      element-loading-svg-view-box="-10, -10, 50, 50"
  >
    <canvas id="chartSum" class="w-96"></canvas>
  </el-card>
</template>

<script lang="ts" setup>
import { Chart, registerables } from 'chart.js';
import {ref, onMounted, Ref} from 'vue';
import {DashboardService} from "~/service/demeter/dashboard.service";
import {DashCountEntity} from "~/entities/demeter/dash-count.entity";

Chart.register(...registerables);

const count_data: Ref<DashCountEntity[]> = ref([]);

let chartSum: any;
const svg = Loading().svg;
let loading = ref(false);

const chartConfig = {
  type: 'doughnut',
  data: {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
      },
      {
        label: 'Percent Sum',
        data: [],
        backgroundColor: ['#f6c23e', '#1cc88a', '#36b9cc', '#4e73df', '#5a5c69'],
      },
    ],
  },
  options: {
    animation: false,
    parsing: false,
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    plugins: {
      decimation: {
        enabled: true,
        algorithm: 'lttb',
        samples: 50
      },
      tooltip: {
        callbacks: {
          label: ({datasetIndex, parsed, label}: {
            datasetIndex: number,
            parsed: any,
            label: string
          }) => {
            let value = parsed;
            if (datasetIndex === 1) {
              value += ' %';
            }
            return `${label}: ${value}`;
          }
        }
      },
      title: {
        display: true,
        text: 'Total Tickers',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          font: {
            size: 11,
          }
        }
      },
    },
    responsive: true,
  }
};

onMounted(async () => {
  const ctx = document.getElementById('chartSum');
  chartSum = new Chart(ctx, chartConfig);
  updateCount().then(r => r);
});

const updateCount = async () => {
  loading.value = true;
  const dashboardService = new DashboardService();
  const getInvestor = new GetInvestor();
  const investorId = getInvestor.investorId();
  const response = await dashboardService.dashCount(investorId)
  response
      ? count_data.value = await response.json()
      : count_data.value = [];
  chartSum.data.labels = count_data.value.map(item => item.ticket);
  chartSum.data.datasets[0].data = count_data.value.map(item => item.sum);
  chartSum.data.datasets[1].data = count_data.value.map(item => item.percent_sum * 100);
  chartSum.update();
  loading.value = false;
}
</script>
