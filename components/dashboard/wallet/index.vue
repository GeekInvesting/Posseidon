<template>
  <el-row :gutter="16">
    <el-col :span="8">
      <div class="statistic-card">
        <el-statistic value="">
          <template #title>
            <div class="flex center ">
              <DashboardWalletChartCount />
            </div>
          </template>
        </el-statistic>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="statistic-card">
        <el-statistic value="">
          <template #title>
            <div class="flex center ">
              <DashboardWalletChartSum />
            </div>
          </template>
        </el-statistic>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="statistic-card">
        <el-statistic value="">
          <template #title>
            Hello Chart
          </template>
        </el-statistic>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
</script>
