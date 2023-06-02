//componente/admin/hefesto/exchange/form.vue
<template>
  <el-dialog
    v-model="dialogVisible"
    title="Exchange"
    width="85%"
    :before-close="handleClose"
  >
    <span>
      <AdminHefestoExchangeForm
        :key="componentKey"
        :initialData="exchangeDto"
        :typeSave="typeSave"
      />
    </span>
  </el-dialog>
  <el-table
    :data="exchanges"
    class="custom-loading-svg w-full md:w-3/4 lg:w-1/2 xl:w-1/3 grid grid-flow-row auto-rows-max"
    v-loading="loading"
    :element-loading-svg="svg"
    element-loading-svg-view-box="-10, -10, 50, 50"
  >
    <el-table-column prop="exchangeName" label="Name" sortable />
    <el-table-column prop="exchangeCode" label="Code" sortable />
    <el-table-column prop="exchangeCurrency" label="Currency" sortable />
    <el-table-column
      prop="exchangeCountry.countryName"
      label="Country"
      sortable
    />
    <el-table-column prop="exchangeEnabled" label="Enable">
      <template #default="{ row }">
        <span>{{ row.exchangeEnabled ? "Enable" : "Disable" }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="exchangeDeleted" label="Deleted">
      <template #default="{ row }">
        <span>{{ row.exchangeDeleted ? "Deleted" : "" }}</span>
      </template>
    </el-table-column>
    <el-table-column label="Actions">
      <template #default="{ row }">
        <el-dropdown size="large" placement="top">
          <el-button circle>
            <Icon name="ic:baseline-format-list-bulleted" />
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <el-tooltip
                  class="box-item"
                  effect="dark"
                  content="Edit Exchange"
                  placement="right"
                >
                  <el-button @click="edit(row)">
                    <Icon name="ic:twotone-mode-edit" />
                  </el-button>
                </el-tooltip>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-tooltip
                  class="box-item"
                  effect="dark"
                  :content="
                    row.exchangeEnabled ? 'Disable Exchange' : 'Enable Exchange'
                  "
                  placement="right"
                >
                  <el-button @click="toggle(row)">
                    <Icon
                      v-if="row.exchangeEnabled"
                      name="ic:twotone-person-add-disabled"
                    />
                    <Icon v-else name="ic:twotone-person-add" />
                  </el-button>
                </el-tooltip>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-tooltip
                  class="box-item"
                  effect="dark"
                  content="Delete Exchange"
                  placement="right"
                >
                  <el-button @click="remove(row)">
                    <Icon name="ic:twotone-delete" />
                  </el-button>
                </el-tooltip>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { useEventBus } from "~/events/eventBus";
import { Exchange, ExchangeDto } from "~/model/hefesto/Exchange";
import { exchangeToDto } from "~/utils/modelUtils/ExchangeUtils";
import {
  disableExchange,
  enableExchange,
  getAllExchanges,
  deleteExchange,
} from "~/service/hefesto/ExchangeService";

const dialogVisible: Ref<boolean> = ref(false);
const componentKey: Ref<string> = ref("");
const exchangeDto: Ref<ExchangeDto> = ref({} as ExchangeDto);
const typeSave: Ref<"create" | "update"> = ref("update");
const exchanges: Ref<Exchange[]> = ref([]);
const loading: Ref<boolean> = ref(false);
const svg = Loading().svg;

onMounted(() => {
  fetchExchanges();
});

const handleClose = (done: () => void) => {
  ElMessageBox.confirm(`Are you sure to close this Exchange?`)
    .then(() => {
      hideDialog();
      done();
    })
    .catch((error) => {
      //console.log(error);
      PosseidonNotif("warning", `${error} this operation.`);
    });
};

const fetchExchanges = async () => {
  loading.value = true;
  try {
    const response = await getAllExchanges();
    if (!response.ok) throw new Error(`Error - ${response.text()}`);
    exchanges.value = await response.json();
    //console.log(exchanges.value);
  } catch (error) {
    console.log(error);
    PosseidonNotif("error", `${error}`);
  } finally {
    loading.value = false;
  }
};

const edit = (exchange: Exchange) => {
  exchangeDto.value = exchangeToDto(exchange);
  typeSave.value = "update";
  dialogVisible.value = true;
  componentKey.value = exchange.id;
  //console.log(exchange);
};

const toggle = (exchange: Exchange) => {
  loading.value = true;
  try {
    if (exchange.exchangeEnabled) {
      ElMessageBox.confirm(`Are you sure to disable this Exchange?`)
        .then(async () => {
          exchange.exchangeEnabled = false;
          const response = await disableExchange(exchange.id);

          if (!response.ok) throw new Error(`Error - ${response.text()}`);

          PosseidonNotif("success", `Exchange disabled successfully.`);
        })
        .catch((error) => {
          //console.log(error);
          PosseidonNotif("warning", `${error} this operation.`);
        });
    } else {
      ElMessageBox.confirm(`Are you sure to enable this Exchange?`)
        .then(async () => {
          exchange.exchangeEnabled = true;
          const response = await enableExchange(exchange.id);
          if (!response.ok)
            throw new Error(
              `Error ${response.status} - ${
                response.statusText
              } - ${response.text()}`
            );
          PosseidonNotif("success", `Exchange enabled successfully.`);
        })
        .catch((error) => {
          //console.log(error);
          PosseidonNotif("warning", `${error} this operation.`);
        });
    }
  } catch (error) {
    console.log(error);
    PosseidonNotif("error", `${error}`);
  } finally {
    fetchExchanges();
    loading.value = false;
  }
};

const remove = (exchange: Exchange) => {
  loading.value = true;
  try {
    ElMessageBox.confirm(`Are you sure to delete this Exchange?`)
      .then(async () => {
        exchange.exchangeDeleted = true;
        const response = await deleteExchange(exchange.id);

        if (!response.ok) throw new Error(`Error - ${response.text()}`);

        PosseidonNotif("success", `Exchange deleted successfully.`);
      })
      .catch((error) => {
        //console.log(error);
        PosseidonNotif("warning", `${error} this operation.`);
      });
  } catch (error) {
    console.log(error);
    PosseidonNotif("error", `${error}`);
  } finally {
    fetchExchanges();
  }
};

watch(
  () => useEventBus().value.refreshExchange,
  (newValue) => {
    if (newValue) {
      hideDialog();
      fetchExchanges();
      useEventBus().value.refreshExchange = false;
    }
  }
);

const hideDialog = () => {
  dialogVisible.value = false;
  componentKey.value = "";
  exchangeDto.value = {} as ExchangeDto;
};
</script>