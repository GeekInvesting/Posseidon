<template>
  <el-dialog
    v-model="dialogVisible"
    title="City"
    width="85%"
    :before-close="handleClose"
  >
    <span>
      <AdminCityForm :key="componentKey" :initial-data="cityDto" type-save="update" />
    </span>
  </el-dialog>
  <el-table
    :data="cities"
    class="custom-loading-svg w-full md:w-3/4 lg:w-1/2 xl:w-1/3 grid grid-flow-row auto-rows-max"
    v-loading="loading"
    :element-loading-svg="svg"
    element-loading-svg-view-box="-10, -10, 50, 50"
  >
  <el-table-column prop="cityName" label="Name" sortable></el-table-column>
  <el-table-column prop="cityCode" label="Code" sortable></el-table-column>
  <el-table-column
    prop="cityState.stateName"
    label="State"
    sortable
  ></el-table-column>
  <el-table-column
    prop="cityState.stateCountry.countryName"
    label="Country"
    sortable
  ></el-table-column>
  <el-table-column prop="cityEnabled" label="Enable">
    <template #default="{ row }">
      <span>{{ row.cityEnabled ? "Enable" : "Disable" }}</span>
    </template>
  </el-table-column>
  <el-table-column prop="cityDeleted" label="Deleted">
    <template #default="{ row }">
      <span>{{ row.cityDeleted ? "Deleted" : "" }}</span>
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
                content="Edit City"
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
                :content="row.cityEnabled ? 'Disable City' : 'Enable City'"
                placement="right"
              >
                <el-button @click="toggle(row)">
                  <Icon v-if="row.cityEnabled" name="ic:twotone-person-add-disabled" />
                  <Icon v-else name="ic:twotone-person-add" />
                </el-button>
              </el-tooltip>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-tooltip
                class="box-item"
                effect="dark"
                content="Delete City"
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
import { CityDto } from '~/modelService/hera/CityDto';
import { ApiHera } from '~/utils/api/hera';
import { useEventBus } from '~/events/eventBus';
import { City } from '~/modelService/hera/City';
import { CityUtils } from '~/utils/modelUtils/CityUtils';

let cityDto: Ref<CityDto> = ref({} as CityDto);
let cities: City[] = [];

const componentKey: Ref<string> = ref("");
const dialogVisible: Ref<boolean> = ref(false);
const loading: Ref<boolean> = ref(false);
const svg = Loading().svg;

onMounted(() => {
  fetchCities();
});

const hideDialog = () => {
  dialogVisible.value = false;
};

watch(
  () => useEventBus().value.refreshCities,
  (newValue) => {
    if (newValue) {
      fetchCities();
      hideDialog();
      useEventBus().value.refreshCities = false;
    }
  }
)

const handleClose = (done: () => void) => {
  ElMessageBox.confirm(`Are you sure to close this City?`)
    .then(() => {
      done();
    })
    .catch((error) => {
      //console.log(error);
      Notif().notfWarn("Warn", `${error} this operation.`);
    });
};

const fetchCities = async () => {
  loading.value = true;
  try {
    const response = await ApiHera().getAllCity();

    if (!response.ok) throw new Error(await response.text());

    cities = await response.json();
  } catch (error) {
    Notif().notfError("Error", `${error}`);
  }

  loading.value = false;
}

const edit = (city: City) => { 
  cityDto.value = CityUtils().cityToDto(city);
  componentKey.value = city.id;
  dialogVisible.value = true;
};

const toggle = (city: City) => { 
  if (city.cityEnabled) {
    request("disable", "PUT", city);
  } else {
    request("enable", "PUT", city);
  }
}

const remove = (city: City) => { 
  request("delete", "DELETE", city);
}

const request = async (type:any, method:any, city: City) => {
  loading.value = true;
  try {
    const cityRequest = CityUtils().cityToDto(city);
    const response = await ApiHera().requestCity(type, method, cityRequest);

    if (!response.ok) throw new Error(await response.text());

    Notif().notfSuccess("Success", `${type} City.`);
    fetchCities();
  } catch (error) {
    Notif().notfError("Error", `${error}`);
  }

  fetchCities();
  loading.value = false;
}

</script>