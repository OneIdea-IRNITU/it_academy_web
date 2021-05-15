<template>
  <div>
    <h1>Список мероприятий</h1>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div class="row">

        <div class="card  col-12 col-md-6 col-lg-4" v-for="event in events" :key="event.course_id">
          <router-link v-if="event.image" v-bind:to="'contest/' + event.course_id">
            <img class="card-img-top" v-bind:src="event.image" alt="Card image cap">
          </router-link>

          <div class="card-body d-flex flex-column">
            <router-link v-bind:to="'contest/' + event.course_id">
              <h5 class="card-title">{{ event.fullname }}</h5>
            </router-link>

            <a class="category">#{{ event.category }}</a>

            <p class="card-text">
              <span class="startdate"> {{ event.startdate }}</span>
              <span v-if="event.enddate>0" class="enddate"> - {{ event.enddate }}</span>
            </p>

            <div class="mt-auto">
              <router-link v-bind:to="'contest/' + event.course_id">
                <button class="btn btn-primary ">
                  Подробнее
                </button>
              </router-link>
            </div>
          </div>
        </div>


      </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EventList",
  data: function () {
    return {
      loading: true,
      errored: false,
      events: [{
        category: null,
        course_id: null,
        description: null,
        enddate: null,
        fullname: null,
        image: null,
        organizers: null,
        startdate: null,
      }],
    }
  },
  computed: {},
  mounted() {
    axios
        .get('https://open.istu.edu/api/get_all_events.php')
        .then(response => {
              let events = [];
              response.data.forEach(function (event) {

                if (event.startdate > 0) {
                  let startdate = new Date(event.startdate * 1000)
                  event.startdate = startdate.toLocaleString().replace(',', '').slice(0, -3)

                }
                if (event.enddate > 0) {
                  let enddate = new Date(event.enddate * 1000)
                  event.enddate = enddate.toLocaleString().replace(',', '').slice(0, -3)
                }

                events.push(event)
              })
              this.events = events
            }
        )
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
  },

}
</script>

<style scoped>
</style>