<template>
  <div class="flex-center p-4 bg-white routed-lg shadow-md mx-5 md:mx-5 lg:mx-10 xl:mx-20">
    <el-form
      class="mb-4"
      v-loading="loading"
      :element-loading-svg="svg"
      element-loading-svg-view-box="-10, -10, 50, 50">
      <el-form-item label="Name" prop="investorName" class="mb-4">
        <el-input
          v-model="investor.investorName"
          class="shadow-sm"
          placeholder="JOAO"
        />
      </el-form-item>
      <el-form-item label="Document" prop="investorDoc" class="mb-4">
        <el-input
          v-model="investor.investorDoc"
          class="shadow-sm"
          placeholder="000.000.000-00"
        />
        </el-form-item>
        <el-form-item label="Adress" prop="investorAdress" class="mb-4">
        <el-input
          v-model="investor.investorAdress"
          class="shadow-sm"
          placeholder="RUA JOAO"
        />
        </el-form-item>
        <el-form-item label="Country" prop="investorCity.citystate.stateCountry.countryName" class="mb-4">
          <el-select
            v-model="countryValue"
            class="shadow-sm"
            placeholder="BRASIL"
            @change="
              () => {
                fetchStates(countryValue);
              }"
          >
            <el-option
              v-for="item in countries"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="State" prop="investorCity.citystate.stateName" class="mb-4">
          <el-select
            v-model="stateValue"
            class="shadow-sm"
            :placeholder="!states.length ? 'Select a country first' : 'PARANA'"
            :disabled="!states.length"
            @change="
              () => {
                fetchCities(stateValue);
              }"
          >
            <el-option
              v-for="item in states"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="City" prop="investorCity" class="mb-4">
          <el-select
            v-model="cityValue"
            class="shadow-sm"
            :placeholder="!cities.length ? 'Select a state first' : 'CURITIBA'"
            :disabled="!cities.length"
            @change="
              () => {
                investor.investorCity = cityValue;
              }"
          >
            <el-option
              v-for="item in cities"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="isAdmin" label="User" prop="investorUser" class="mb-4">
          <el-select
            v-model="userValue"
            class="shadow-sm"
            placeholder="JOAO"
            :disabled="!users.length"
            @change="
              () => {
                investor.investorUser = userValue;
              }"
          >
            <el-option
              v-for="item in users"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="shadow-sm"
            @click="submit"
          >
            Submit
          </el-button>
        </el-form-item>
    </el-form>
  </div>
    <el-checkbox
      v-if="props.investorSave === 'create'"
    v-model="anotherInvestor"
    label="Create another investor"
    class="mb-4"
    />
</template>

<script lang="ts" setup>
import { InvestorDto, InvestorHera } from '~/model/hera/InvestorHera';
import { CityService } from '~/service/hera/CityService';
import { CountryService } from '~/service/hera/CountryService';
import { StateService } from '~/service/hera/StateService';
import { UserService } from '~/service/atena/UserService';
import { InvestorHeraService } from '~/service/hera/InvestorService';
import { emitEventBus } from '~/events/eventBus';

const loading = ref(false);
const svg = Loading().svg;
const isAdmin = ref(false);
const anotherInvestor = ref(false);

const investorService = new InvestorHeraService();

onMounted(() => {
  fetchCountries();
  admin();
})

const props = defineProps({
  initialData: {
    type: Object as PropType<InvestorHera>,
      default: () => ({} as InvestorHera),
    },
  investorSave: {
    type: String,
    default: 'create',
  }
})

const investor = ref<InvestorDto>({
  id: props.initialData.id || '',
  investorName: props.initialData.investorName || '',
  investorDoc: props.initialData.investorDoc || '',
  investorAdress: props.initialData.investorAdress || '',
  investorCity: props.initialData.investorCity?.cityName || '',
  investorDeleted: props.initialData.investorDeleted || false,
  investorEnabled: props.initialData.investorEnabled || true,
  investorUser: props.initialData.investorUser || '',
})

watch(props.initialData, (newValue) => {
  investor.value = {
    id: newValue.id || '',
    investorName: newValue.investorName || '',
    investorDoc: newValue.investorDoc || '',
    investorAdress: newValue.investorAdress || '',
    investorCity: newValue.investorCity?.cityName || '',
    investorDeleted: newValue.investorDeleted || false,
    investorEnabled: newValue.investorEnabled || true,
    investorUser: newValue.investorUser || '',
  }
})

const admin = () => {
  const getLogin = new GetLogin();
  isAdmin.value = getLogin.isAdmin();
  isAdmin.value ? fetchUsers() : null;
}

const submit = () => {
  //TODO: implement submit method
  loading.value = true;

  ElMessageBox.confirm(
    `Are you sure to ${props.investorSave} this investor?`,
    {
      confirmButtonText: `${props.investorSave}`,
      cancelButtonText: 'Cancel',
      type: 'info',
    }
  ).then( async () => {
    let response;

    props.investorSave === 'create'
      ? response = await investorService.createInvestor(investor.value)
      : null // response = await investorService.updateInvestor(investor.value);

    response
    ? PosseidonNotif(`success`, `Investor ${props.investorSave}d successfully`)
    : null

    emitEventBus('refreshInvestors', true);
  }).catch((error) => {
    PosseidonNotif(`error`, `Investor ${props.investorSave} failed`);
    console.log(error);
  }).finally(() => {
    loading.value = false;
    anotherInvestor.value 
    ? emptyForm() 
    : emitEventBus('dialogCreate', true);
  })
}

const emptyForm = () => {
  investor.value = {
    id: '',
    investorName: '',
    investorDoc: '',
    investorAdress: '',
    investorCity: '',
    investorDeleted: false,
    investorEnabled: true,
    investorUser: '',
  }
  countryValue.value = '';
  stateValue.value = '';
  cityValue.value = '';
  userValue.value = '';
}

const countryValue = ref('');
const countries:Ref<string[]> = ref([]);
const countryService = new CountryService();
const fetchCountries = async () => {
  let response = await countryService.getAllCountriesName();
  const data = await response.json();
  countries.value = data;
}

const stateValue = ref('');
const states:Ref<string[]> = ref([]);
const stateService = new StateService();
const fetchStates = async (countryName: string) => {
  let response = await stateService.getAllStatesNameByCountry(countryName);
  const data = await response.json();
  states.value = data;
}

const cityValue = ref('');
const cities:Ref<string[]> = ref([]);
const cityService = new CityService();
const fetchCities = async (stateName: string) => {
  let response = await cityService.getAllCitiesNameByState(stateName);
  const data = await response.json();
  cities.value = data;
}

const userValue = ref('');
const users:Ref<string[]> = ref([]);
const userService = new UserService();
const fetchUsers = async () => {
  let response = await userService.getAllUsers();
  const data = await response.json();
  const usersNames = data.map((data: { userName: any; }) => data.userName);
  users.value = usersNames;
}
</script>