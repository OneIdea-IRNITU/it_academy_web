<template>
  <div class="event-card">

    <router-link class="back-btn" title="Назад" :to="{path:publicPath}">
      <b-button pill variant="light"><span class="back-btn__text">&lt; Назад</span></b-button>
    </router-link>

    <div v-if="loading">Loading...</div>
    <div v-else>
      <div class="row event-card__info">
        <div class="col-6 d-flex align-items-start flex-column">
          <h1 class="event-card__title">{{ event.fullname }}</h1>

          <a class="event-card__category">#{{ event.category }}</a>

          <div class="event-card__dates">
            <img :src="require('@/assets/calendar_icon.svg')" alt="Календарь">
            <span class="event-card__startdate"> {{ event.startdate }}</span>
            <span v-if="event.enddate>0" class="event-card__enddate"> - {{ event.enddate }}</span>
          </div>


          <Timer :event="event" />

          <div class="event-card__organizers organizers">
            <span class="organizers__title">
              {{ event.organizers.length > 1 ? "Организаторы:" : "Организатор:" }}
            </span>
            <span v-for="(organizer, index) in event.organizers" :key="index">
              <router-link class="organizers__link"
                           :to="{path:publicPath, query:{searchText:organizer}}">
                {{ organizer }}</router-link>{{ event.organizers.length - 1 != index ? ', ' : '' }}
            </span>
          </div>

          <div class="mt-auto event-card__registration-form">
            <EventRegistrationForm/>
          </div>
        </div>

        <div class="col-6">
          <div v-if="event.image" >
            <img class="event-card__image" v-bind:src="event.image">
          </div>
        </div>

      </div>

      <div v-if="event.description" class="row mt-3 mb-3 event-card__description">
        <div class="col-10">
          <h2>О мероприятии</h2>
          <div v-html="event.description" class="description"></div>
        </div>
      </div>


    </div>
  </div>
  <!-- </div> -->
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
            this.event.startdate = startdate.toLocaleString().replace(',', '').slice(0, -3).replace(':00:00', '')

          }
          if (this.event.enddate > 0) {
            let enddate = new Date(this.event.enddate * 1000)
            this.event.enddate = enddate.toLocaleString().replace(',', '').slice(0, -3).replace(':00:00', '')
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
.event-card__image {
  max-width: 100%;
}

.back-btn {
  color: black;

}
</style>