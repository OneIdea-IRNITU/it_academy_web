<template>
  <div>
    <h1>Список мероприятий</h1>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div class="row mt-3 mb-3">
        <div class="col-md-12">
          <b-form-input class="search" type="search" v-model="searchText"
                        placeholder="Найти мероприятие"></b-form-input>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3 mb-3 search_filters">
          <b-form-select
              :disabled="useFilters"
              v-model="dateFilter"
              :options="dateFilters"
          ></b-form-select>

        </div>
      </div>
      <div class="row ">
        <div v-if="!sortedEvents.length">
          <div class="col">
            <p>Ничего не нашли</p>
          </div>
        </div>

        <div v-else class="col-12 col-md-6 col-lg-4 mb-4" v-for="event in sortedEvents" :key="event.course_id">
          <div class="card h-100 ">
            <div class="event__img">
              <router-link v-bind:to="'event/' + event.course_id">
                <img class="card-img-top"
                     v-bind:src="event.image ? event.image: require('@/assets/moocs-benefitting.gif')"
                     alt="Card image cap">
              </router-link>
            </div>

            <div class="card-body d-flex flex-column">
              <router-link class="event__title" v-bind:to="'event/' + event.course_id">
                <h5 class="card-title">{{ event.fullname }}</h5>
              </router-link>

              <a class="category"><small>#{{ event.category }}</small></a>

              <p class="card-text">
                <img :src="require('@/assets/calendar_icon.svg')" alt="Календарь">
                <small class="startdate"> {{ event.startdate_formatted }}</small>
                <small v-if="event.enddate_formatted>0" class="enddate"> - {{ event.enddate_formatted }}</small>
              </p>

              <div class="mt-auto">

                <router-link v-bind:to="'event/' + event.course_id">
                  <button class="btn btn-primary col-6">
                    Подробнее
                  </button>
                </router-link>

              </div>
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
                  event.startdate_formatted = startdate.toLocaleString().replace(',', '').slice(0, -3).replace('00:00', '')

                }
                if (event.enddate > 0) {
                  let enddate = new Date(event.enddate * 1000)
                  event.enddate_formatted = enddate.toLocaleString().replace(',', '').slice(0, -3).replace('00:00', '')
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

.search {
  /*padding: 14px;*/
}

.search_filters select {
  color: #2185FB;
}

.event__img img {
  border-radius: 12px 12px 0 0;
  object-fit: cover;
  width: 100%;
  height: 318px;
}

.event__title {
  color: black;
}


</style>