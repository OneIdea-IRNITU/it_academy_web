<template>
  <div class="event-card">

    <router-link class="back-btn" title="Назад" :to="{path:publicPath}">
      <b-button pill variant="light"><span class="back-btn__text">&lt; Назад</span></b-button>
    </router-link>

    <div v-if="loading">Loading...</div>
    <div v-else>
      <div class="row">
        <div class="col-6 d-flex align-items-start flex-column">
          <h1>{{ event.fullname }}</h1>

          <a class="category">#{{ event.category }}</a>

          <div class="event-dates">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                 class="bi bi-calendar-event" viewBox="0 0 16 16">
              <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
              <path
                  d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
            </svg>
            <span class="startdate"> {{ event.startdate }}</span>
            <span v-if="event.enddate>0" class="enddate"> - {{ event.enddate }}</span>
          </div>

          <div class="organizers">
            <span class="organizers__title">
              {{ event.organizers.length > 1 ? "Организаторы:" : "Организатор:" }}
            </span>
            <span v-for="(organizer, index) in event.organizers" :key="index">
              <router-link class="organizers__link"
                           :to="{path:publicPath, query:{searchText:organizer}}">
                {{ organizer }}</router-link>{{ event.organizers.length - 1 != index ? ', ' : '' }}
            </span>
            
          </div>

          <div class="mt-auto">
            <EventRegistrationForm/>
          </div>
        </div>

        <div class="col-6">
          <div v-if="event.image" class="image">
            <img v-bind:src="event.image">
          </div>
        </div>

      </div>

      <div v-if="event.description" class="row mt-3 mb-3">
        <div class="col-10">
          <h2>О мероприятии</h2>
          <div v-html="event.description" class="description"></div>
        </div>
      </div>


    </div>

  </div>
</template>

<script>
import axios from "axios";
import Timer from "@/components/Timer";
import EventRegistrationForm from "@/components/EventRegistrationForm";
import {publicPath} from "../../vue.config";


export default {
  name: "EventCard",
  components: {
    EventRegistrationForm,
    Timer
  },
  data: function () {
    return {
      loading: true,
      errored: false,
      publicPath: publicPath,
      event: {
        course_id: null,
        fullname: null,
        category: null,
        startdate: null,
        enddate: null,
        description: null,
        image: null,
        organizers: [],
      },
    }
  },
  computed: {},
  mounted() {
    axios
        .get('https://open.istu.edu/api/get_all_events.php?course_id=' + this.$route.params.id)
        .then(response => {
          this.event = response.data[0]

          this.event.organizers = this.event.organizers.split(', ');

          if (this.event.startdate > 0) {
            let startdate = new Date(this.event.startdate * 1000)
            this.event.startdate = startdate.toLocaleString().replace(',', '').slice(0, -3).replace(':00', '')

          }
          if (this.event.enddate > 0) {
            let enddate = new Date(this.event.enddate * 1000)
            this.event.enddate = enddate.toLocaleString().replace(',', '').slice(0, -3).replace(':00', '')
          }

        })
        .catch(error => {
          console.log(error);
          if (error.response.status === 404) {
            this.$router.push({name: '404'});
          }

          this.errored = true;
        })
        .finally(() => (this.loading = false));
  }
}
</script>

<style scoped>
.event-card .image img {
  max-width: 100%;
}

.back-btn {
  color: black;

}
</style>