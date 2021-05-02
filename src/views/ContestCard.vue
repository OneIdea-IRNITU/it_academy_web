<template>
  <div class="contest-card">

    <div v-if="loading">Loading...</div>
    <div v-else>
      <h1>{{ contest.fullname }}</h1>
      <a class="category">#{{ contest.category }}</a>
      <div class="event-dates">
        Дата:
        <span class="startdate">{{ contest.startdate }}</span>
        <span v-if="contest.enddate>0" class="enddate"> - {{ contest.enddate }}</span>
      </div>

      <div class="organizers">Организатор:
        <a href="">{{ contest.organizers }}</a>
      </div>

      <div v-if="contest.image" class="image">
        <img v-bind:src="contest.image">
      </div>
      <div class="description">{{ contest.description }}</div>
    </div>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ContestCard",
  data: function () {
    return {
      loading: true,
      errored: false,
      contest: {
        course_id: null,
        fullname: null,
        category: null,
        startdate: null,
        enddate: null,
        description: null,
        image: null,
        organizers: null,
      },
    }
  },
  computed: {

  },
  mounted() {
    axios
        .get('https://open.istu.edu/api/get_all_events.php?course_id=' + this.$route.params.id)
        .then(response => {
          this.contest = response.data[0]

          if (this.contest.startdate > 0) {
            let startdate = new Date(this.contest.startdate * 1000)
            this.contest.startdate = startdate.toLocaleString().replace(',', '').slice(0, -3)

          }
          if (this.contest.enddate > 0) {
            let enddate = new Date(this.contest.enddate * 1000)
            this.contest.enddate = enddate.toLocaleString().replace(',', '').slice(0, -3)
          }

        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
  }
}
</script>

<style scoped>

</style>