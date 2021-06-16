<template>
  <div>
    <div class="back-btn">
      <router-link class="back-btn__link" title="Назад" :to="{path:publicPath}">
        <b-button class="back-btn__button" variant="light"><span class="back-btn__text"><img class="back-btn__image"
                                                                                             :src="require('@/assets/back_btn_icon.svg')"
                                                                                             alt="Календарь"> Назад</span>
        </b-button>
      </router-link>
    </div>
    <div class="event-card">
      <div v-if="loading">Loading...</div>
      <div v-else>
        <div class="row event-card__info">
          <div class="col-lg-6 d-flex align-items-start flex-column">
            <h1 class="event-card__title">{{ event.fullname }}</h1>

            <router-link class="event-card__category"
                         :to="{path:publicPath, query:{searchText:event.category}}">
              #{{ event.category }}
            </router-link>

            <div class="event-card__items">
              <div class="event-card__item">
                <img :src="require('@/assets/calendar_icon.svg')" alt="Календарь">
                <span class="event-card__startdate"> {{ event.startdate_formatted }}</span>
                <span v-if="event.enddate_formatted>0" class="event-card__enddate"> - {{
                    event.enddate_formatted
                  }}</span>
              </div>

              <div class="event-card__item">
                <Timer :event="event"/>
              </div>

              <div class="event-card__item">
                <span class="event-card__org-title">
                  {{ event.organizers.length > 1 ? "Организаторы:" : "Организатор:" }}
                </span>
                <span v-for="(organizer, index) in event.organizers" :key="index">
              <router-link class="event-card__org-link"
                           :to="{path:publicPath, query:{searchText:organizer}}">
                {{ organizer }}
              </router-link>{{ event.organizers.length - 1 != index ? ', ' : '' }}
            </span>
              </div>
            </div>

          </div>

          <div class="col-lg-6 ">
            <div>
              <img class="event-card__image"
                   :src="event.image ? event.image: '//open.istu.edu/pluginfile.php/1/theme_fordson/headerdefaultimage/1618822616/moocs-benefitting.gif'"
              >
            </div>
          </div>
        </div>

        <div class="event-card__registration-form">
          <EventRegistrationForm :startdate="event.startdate"/>
        </div>


        <div v-if="event.description" class="row event-card__description">
          <div class="col-10">
            <h2 class="event-card__description-title">О мероприятии</h2>
            <div v-html="event.description" class="description"></div>
          </div>
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

            let Day_formatted = startdate.getDate()
            if(Day_formatted < 10){Day_formatted ='0'+Day_formatted+'.'}
            else{Day_formatted =Day_formatted+'.'}
            let Month_formatted = startdate.getMonth() + 1
            if(Month_formatted < 10){Month_formatted ='0'+Month_formatted+'.'}
            else{Month_formatted =Month_formatted+'.'}
            let Year_formatted = startdate.getFullYear()
            let Hours_formatted = startdate.getHours()
            if(Hours_formatted === 0){Hours_formatted=''}
            else{Hours_formatted = ' ' + Hours_formatted + ':00'}

            this.event.startdate_formatted = Day_formatted + Month_formatted + Year_formatted + Hours_formatted

          }
          if (this.event.enddate > 0) {
            let enddate = new Date(this.event.enddate * 1000)
            this.event.enddate_formatted = enddate.toLocaleString().replace(',', '').slice(0, -3).replace('00:00', '')
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

.back-btn__button {
  padding-top: 14px !important;
  padding-bottom: 14px !important;
}

.back-btn__text {
  font-size: 18px !important;
  line-height: 21px !important;
  padding: 0 27px;
  color: #BCBCBE;
}

.back-btn__image {
  margin-right: 15px;
}

.event-card__info {
  margin-top: 69px;
}

.event-card__title {
  margin-bottom: 35px;
}

.event-card__items {
  margin-bottom: 30px;
}

.event-card__item {
  margin: 8px 0;
}

.event-card__registration-form {
  margin-top: 22px;
}

.event-card__description {
  margin-top: 66px;
}

.event-card__description-title{
  margin-bottom: 35px;
}
</style>