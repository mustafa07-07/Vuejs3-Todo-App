<template>
  <div v-if="this.totalCount <= 0">
   </div>
  <div class="d-flex justify-content-around mt-1" v-else>
    <div class="btn-group">
      <button type="button" class="btn btn-primary">
        Total : {{ totalCount }}
      </button>
      <button type="button" class="btn btn-warning">
        Uncompleted : {{ unCompletedItemsCount }}
      </button>
      <button type="button" class="btn btn-success">
        Completed : {{ completedItemsCount }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Hero",
  computed: {
    ...mapGetters({
      listItems: "_listItems",
      completedItemsCount: "_completedItemsCount",
      unCompletedItemsCount: "_unCompletedItemsCount",
      totalCount: "_totalCount",
    }),
  },
};
</script>
