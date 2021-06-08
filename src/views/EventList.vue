<template>
  <div>
    <h1>Список мероприятий</h1>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div class="row mt-3 mb-3">
        <div class="col-md-6">
          <b-form-input type="search" v-model="searchText" placeholder="Поиск..."></b-form-input>
        </div>
      </div>
      <div class="row">
        <div class="col-md-2 mb-3">
          <b-form-select
              :disabled="useFilters"
              v-model="dateFilter"
              :options="dateFilters"
          ></b-form-select>

        </div>
      </div>
      <div class="row">
        <div v-if="!sortedEvents.length">
          <div class="col">
            <p>Ничего не нашли</p>
          </div>
        </div>
        <div v-else class="card  col-12 col-md-6 col-lg-4" v-for="event in sortedEvents" :key="event.course_id">
          <div class="event__img">
            <router-link v-bind:to="'event/' + event.course_id">
              <img class="card-img-top"
                   v-bind:src="event.image ? event.image: require('@/assets/moocs-benefitting.gif')"
                   alt="Card image cap">
            </router-link>
          </div>

          <div class="card-body d-flex flex-column">
            <router-link v-bind:to="'event/' + event.course_id">
              <h5 class="card-title">{{ event.fullname }}</h5>
            </router-link>

            <a class="category">#{{ event.category }}</a>

            <p class="card-text">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                   class="bi bi-calendar-event" viewBox="0 0 16 16">
                <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
                <path
                    d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
              </svg>
              <span class="startdate"> {{ event.startdate_formatted }}</span>
              <span v-if="event.enddate_formatted>0" class="enddate"> - {{ event.enddate_formatted }}</span>
            </p>

            <div class="mt-auto">
              <router-link v-bind:to="'event/' + event.course_id">
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
      dateFilter: 'upcoming',
      searchText: '',
      dateFilters: [
        {text: 'Предстоит', value: 'upcoming'},
        {text: 'Прошло', value: 'past'}
      ],
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
  created() {
    if (this.$route.query.searchText) {
      this.searchText = this.$route.query.searchText;
    }
  },
  computed: {
    useFilters() {
      let searchText = this.searchText.toLowerCase()
      if (searchText) {
        return true
      } else {
        return false
      }
    },
    sortedEvents() {
      let now = new Date();
      let dateFilter = this.dateFilter
      let searchText = this.searchText.toLowerCase()


      let events = this.events.filter((elem) => {
        if (searchText) {
          return elem.fullname.toLowerCase().includes(searchText) || elem.organizers.toLowerCase().includes(searchText)
        } else {
          let startDate = new Date(elem.startdate * 1000)

          if (dateFilter === 'upcoming') {
            return now < startDate;
          } else if (dateFilter === 'past') {
            return now >= startDate;
          }
        }
      }).sort((a, b) => {
        let aStartDate = new Date(a.startdate * 1000)
        let bStartDate = new Date(b.startdate * 1000)

        // сначала, актуальные
        if (aStartDate > now && bStartDate <= now) return -1;
        if (aStartDate <= now && bStartDate > now) return 1;

        //если актуальные мероприятие
        if (aStartDate > now && bStartDate > now) {
          if (a.startdate > b.startdate) return 1;
          if (a.startdate === b.startdate) return 0;
          if (a.startdate < b.startdate) return -1;
        }

        //если прошедшие мероприятие
        if (aStartDate <= now && bStartDate <= now) {
          if (a.startdate > b.startdate) return -1;
          if (a.startdate === b.startdate) return 0;
          if (a.startdate < b.startdate) return 1;
        }

      })
      return events
    }
  },
  mounted() {
    axios
        .get('https://open.istu.edu/api/get_all_events.php')
        .then(response => {
              let events = [];
              response.data.forEach(function (event) {

                if (event.startdate > 0) {
                  let startdate = new Date(event.startdate * 1000)
<<<<<<< HEAD
                  event.startdate = startdate.toLocaleString().replace(',', '').slice(0, -3).replace(':00', '')
=======
                  event.startdate_formatted = startdate.toLocaleString().replace(',', '').slice(0, -3).replace('00:00', '')
>>>>>>> develop

                }
                if (event.enddate > 0) {
                  let enddate = new Date(event.enddate * 1000)
<<<<<<< HEAD
                  event.enddate = enddate.toLocaleString().replace(',', '').slice(0, -3).replace(':00', '')
=======
                  event.enddate_formatted = enddate.toLocaleString().replace(',', '').slice(0, -3).replace('00:00', '')
>>>>>>> develop
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

.event__img {
  padding-top: 10px;
  min-height: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>