<template>
  <div class="contest-card">

    <div v-if="loading">Loading...</div>
    <div v-else>
      <div class="row">
        <div class="col-6 d-flex align-items-start flex-column">
          <h1>{{ contest.fullname }}</h1>

          <a class="category">#{{ contest.category }}</a>

          <div class="event-dates">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                 class="bi bi-calendar-event" viewBox="0 0 16 16">
              <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
              <path
                  d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
            </svg>
            <span class="startdate"> {{ contest.startdate }}</span>
            <span v-if="contest.enddate>0" class="enddate"> - {{ contest.enddate }}</span>
          </div>

          <div class="organizers">Организатор:
            <a class="organizer-items">{{ contest.organizers }}</a>
          </div>

          <div class="mt-auto">
            <button type="button" class="btn btn-primary mt-3 btn-lg">Подавть заявку</button>
          </div>
        </div>

        <div class="col-6">
          <div v-if="contest.image" class="image">
            <img v-bind:src="contest.image">
          </div>
        </div>

      </div>

      <div v-if="contest.description" class="row mt-3 mb-3">
        <div class="col-10">
          <h2>О мероприятии</h2>
          <div v-html="contest.description" class="description"></div>
        </div>
      </div>


    </div>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EventCard",
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
  computed: {},
  mounted() {
    axios
        .get('https://open.istu.edu/api/get_all_events.php?course_id=' + this.$route.params.id)
        .then(response => {
          this.contest = response.data[0]

          if (this.contest.startdate > 0) {
            let startdate = new Date(this.contest.startdate * 1000)
            this.contest.startdate = startdate.toLocaleString().replace(',', '').slice(0, -3).replace('00:00', '')

          }
          if (this.contest.enddate > 0) {
            let enddate = new Date(this.contest.enddate * 1000)
            this.contest.enddate = enddate.toLocaleString().replace(',', '').slice(0, -3).replace('00:00', '')
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
.contest-card .image img {
  max-width: 100%;
}
</style>