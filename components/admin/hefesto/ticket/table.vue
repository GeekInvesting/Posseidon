<template>
  <el-dialog
    v-model="dialogVisible"
    title="Ticket"
    width="90%"
    :before-close="handleClose"
  >
    <span>
      <AdminHefestoTicketForm
        :key="componentKey"
        :initialData="ticket"
        :ticket-save="typeSave"
      />
    </span>
  </el-dialog>
  <el-table
    :data="tickets"
    class="custom-loading-svg w-full md:w-3/4 lg:w-1/2 xl:w-1/3 grid grid-flow-row auto-rows-max"
    v-loading="loading"
    :element-loading-svg="svg"
    element-loading-svg-view-box="-10, -10, 50, 50"
  >
    <el-table-column prop="ticketCode" label="Code" sortable />
    <el-table-column
      prop="ticketCompany.companyName"
      label="Company"
      sortable
    />
    <el-table-column
      prop="ticketSubsector.sectorModel.sectorName"
      label="Sector"
      sortable
    />
    <el-table-column
      prop="ticketSubsector.subsectorName"
      label="Subsector"
      sortable
    />
    <el-table-column prop="ticketType.typeCode" label="Type" sortable />
    <el-table-column
      prop="ticketExchange.exchangeCode"
      label="Exchange"
      sortable
    />
    <el-table-column prop="ticketEnabled" label="Enable">
      <template #default="{ row }">
        <span>{{ row.ticketEnabled ? "Enable" : "Disable" }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="ticketDeleted" label="Deleted">
      <template #default="{ row }">
        <span>{{ row.ticketDeleted ? "Deleted" : "" }}</span>
      </template>
    </el-table-column>
    <el-table-column label="Actions">
      <template #default="{ row }">
        <el-dropdown size="lager" placement="auto-end">
          <el-button circle>
            <Icon name="ic:baseline-format-list-bulleted" />
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <el-tooltip
                  class="box-item"
                  effect="dark"
                  content="Edit Ticket"
                  placement="right"
                >
                  <el-button @click="edit(row)">
                    <Icon name="ic:twotone-mode-edit" />
                  </el-button>
                </el-tooltip>
              </el-dropdown-item>
              <div v-if="!row.ticketDeleted">
                <el-dropdown-item>
                  <el-tooltip
                    class="box-item"
                    effect="dark"
                    :content="
                      row.ticketEnabled ? 'Disable Ticket' : 'Enable Ticket'
                    "
                    placement="right"
                  >
                    <el-button @click="toggle(row)">
                      <Icon
                        :name="
                          row.ticketEnabled
                            ? 'ic:sharp-block'
                            : 'ic:sharp-check'
                        "
                      />
                    </el-button>
                  </el-tooltip>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-tooltip
                    class="box-item"
                    effect="dark"
                    content="Delete Ticket"
                    placement="right"
                  >
                    <el-button @click="remove(row)">
                      <Icon name="ic:sharp-delete" />
                    </el-button>
                  </el-tooltip>
                </el-dropdown-item>
              </div>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { useEventBus } from "~/events/eventBus";
import { Ticket } from "~/model/hefesto/Ticket";
import { TicketService } from "~/service/hefesto/TicketService";

const dialogVisible = ref(false);
const componentKey = ref("");
const ticket: Ref<Ticket> = ref({} as Ticket);
const tickets: Ref<Ticket[]> = ref([]);
const typeSave: Ref<"create" | "update"> = ref("update");
const loading = ref(false);
const svg = Loading().svg;

const ticketService = new TicketService();

onMounted(() => {
  fetchTickets();
});

const handleClose = () => {
  ElMessageBox.confirm(`Are you sure to close this Ticket?`)
    .then(() => {
      hideDialog();
    })
    .catch((error) => {
      //console.log(error);
      PosseidonNotif("warning", `${error} this operation.`);
    })
    .finally(() => {
      loading.value = false;
    });
};

const hideDialog = () => {
  dialogVisible.value = false;
  componentKey.value = "";
  typeSave.value = "update";
};

const edit = (row: Ticket) => {
  loading.value = true;
  typeSave.value = "update";
  componentKey.value = row.id;
  ticket.value = row;
  dialogVisible.value = true;
};

const toggle = (row: Ticket) => {
  //TODO: Toggle Ticket
  loading.value = true;

  ElMessageBox.confirm(
    `Are you sure to ${row.ticketEnabled ? "disable" : "enable"} this Ticket?`,
    `${row.ticketCode}`,
    {
      confirmButtonText: `${row.ticketEnabled ? "Disable" : "Enable"}`,
      cancelButtonText: "Cancel",
      type: "warning",
    }
  )
    .then(async () => {
      let response;

      row.ticketEnabled
        ? (response = await ticketService.disableTicket(row))
        : (response = await ticketService.enableTicket(row));

      response
        ? PosseidonNotif(
            "success",
            `Ticket ${row.ticketCode} ${
              row.ticketEnabled ? "disabled" : "enabled"
            }.`
          )
        : null;
    })
    .catch((error) => {
      //console.log(error);
      PosseidonNotif("warning", `${error} this operation.`);
    })
    .finally(() => {
      fetchTickets();
      loading.value = false;
    });
};

const remove = (row: Ticket) => {
  loading.value = true;

  ElMessageBox.confirm(
    `Are you sure to delete this Ticket?`,
    `Delete ${row.ticketCode}`,
    { confirmButtonText: "Delete", cancelButtonText: "Cancel", type: "warning" }
  )
    .then(async () => {
      let response = await ticketService.deleteTicket(row);

      response
        ? PosseidonNotif("success", "Ticket deleted.")
        : PosseidonNotif("error", "Ticket not deleted.");
    })
    .catch((error) => {
      //console.log(error);
      PosseidonNotif("warning", `${error} this operation.`);
    })
    .finally(() => {
      fetchTickets();
      loading.value = false;
    });
};

const fetchTickets = async () => {
  loading.value = true;

  let response = await ticketService.getAllTickets();
  response ? (tickets.value = await response.json()) : (tickets.value = []);

  dialogVisible.value = false;
  loading.value = false;
};

watch(
  () => useEventBus().value.refreshTickets,
  (value) => {
    if (value) {
      fetchTickets();
      useEventBus().value.refreshTickets = false;
    }
  }
);
</script>
