<template>
  <div v-if="this.totalCount >= 0" class="col col-lg-8 offset-2 mt-2">
    <div class="d-flex justify-content-between">
      <div class="col m-1 col-md-4 col-sm-4">
        <select
          class="form-select"
          v-model="priority" 
          aria-label=".form-select-lg example"
          label="Please indicate the degree of importance of your task."
        >
          <option value="1">Most Important</option>
          <option value="2">More Important</option>
          <option value="3">Important</option>
        </select>
      </div>
      <div class="col m-1 col-md-8 col-sm-4">
        <input
          type="/text"
          class="form-control"
          v-model="text"
          @keydown.enter="this.add(this.text, this.priority)"
          placeholder="Enter Task"
        />
      </div>
    </div>
    <table class="table table-sm">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Task Name</th>
          <th scope="col">Priority</th>
          <th scope="col">Edit / Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in this.listItems"
          :key="item.id"
          :class="
            item.completed == true
              ? 'list-group-item-success'
              : 'list-group-item-warning'
          "
        >
          <th scope="row">{{ item.id }}</th>
          <td>
            <div class="custom-control custom-checkbox">
              <input
                type="checkbox"
                class="form-check-input kontrol m-2"
                v-model="item.completed"
                :id="`completed_chechbox_${item.id}`"
              />

              <label
                class="custom-control-label"
                :for="`completed_chechbox_${item.id}`"
              >
                {{ item.text }}</label
              >
            </div>
          </td>
          <td>
            <div v-if="item.priority == 1">
              <div
                class="spinner-grow text-danger"
                alt="dsds"
                role="status"
              ></div>
            </div>
            <div v-else-if="item.priority == 2">
              <div class="spinner-grow text-warning" role="status"></div>
            </div>
            <div v-else-if="item.priority == 3">
              <div class="spinner-grow text-primary" role="status"></div>
            </div>
            <div v-else-if="item.priortiy == 4">
              <div class="spinner-grow text-success" role="status"></div>
            </div>
          </td>
          <td>
            <button @click="this.editTodo(item)" class="btn btn-warning">
              <i class="bi-pencil"></i>
            </button>

            <button @click="this.delete(item)" class="btn btn-danger m-2">
              <i class="bi-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div
    v-if="this.totalCount <= 0"
    class="d-flex justify-content-center col-lg-12 mt-5"
  >
    <Indicator />
  </div>
</template>
<script>
import Indicator from "./Indicator";
import { mapGetters } from "vuex";
export default {
  name: "Todo",

  data() {
    return {
      edit: false,
      text: null,
      m: null,
      priority: null,
      editText: null,
    };
  },
  components: {
    Indicator,
  },
  computed: {
    ...mapGetters({
      listItems: "_listItems",
      completedItemsCount: "_completedItemsCount",
      unCompletedItemsCount: "_unCompletedItemsCount",
      totalCount: "_totalCount",
    }),
  },
  methods: {
    delete(item) {
      return this.$store.commit("sil", item);
    },
    editTodo(item) {
      this.edit = !this.edit;
      let comp = item.completed;
      let newValue = prompt("Please enter new task name:", item.text);
      let priority = prompt(
        "Please specify priority between 1 and 3 \r\n 1 most important \r\n 2 more important \r\n 3 important",
        item.priority
      );

      if (
        newValue == null ||
        (newValue == "" && priority < 1) ||
        priority > 3
      ) {
        this.m = "Please enter a valid value.";
        alert(this.m);
      } else {
        this.m = {
          completed: comp,
          deger: newValue,
          id: item.id,
          priority: priority,
        };
      }
      this.update(this.m);
    },
    add(value) {
      if (value != null || value == "") {
        if (this.priority != null) {
          if (this.priority >= 1 || this.priority <= 3) {
            return (
              this.$store.commit("ekle", {
                id: new Date().getTime(),
                text: value,
                priority: this.priority,
                completed: false,
              }),
              (this.text = null)
            );
          } else {
            alert("Please enter valid a value");
          }
        } else {
          alert("Please enter valid a value");
        }
      } else { 
        alert("Please enter valid a value");
      }
    },
    update(value) {
      if (value != null || value == "") {
        return (
          this.$store.commit("guncelle", {
            id: value.id,
            text: value.deger,
            priority: value.priority,
            completed: value.completed,
          }),
          (this.text = null)
        );
      }
    },
  },
};
</script>
<style>
.kontrol {
  border-radius: 50% !important;
  font-size: larger;
  top: -5px;
  position: relative;
}
.box {
  font-size: 25;
}
</style>
