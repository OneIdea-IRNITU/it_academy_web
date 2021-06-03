<template>
  <div>
    <div v-if="currentTime">
      <span v-if="!FinalComparefinc()">
        Осталось: <span v-if="days">{{ days }}</span> дней<br />
      </span>
     </div>

     <div v-if="!currentTime">
       <span>
      Уже прошло!<br/>
      </span>
     </div>

    <!-- <div class="text-center" v-if="!currentTime">
      Уже сегодня!
    </div> -->

      <!-- 
      deadlineDay
      deadlineMonth
      deadlineYear
      nowDay
      nowMonth
      nowYear
      isExactYear
      isExactMonth
      isExactDay
      FirstCompare
      FinalCompare -->


    <div v-if="FinalComparefinc()" :load="log(FinalComparefinc)">
        Уже сегодня! <br/>
        <span v-if="days">{{ days }}:</span
        ><span v-if="days">{{ hours | formatTime }}:</span><span>{{ minutes | formatTime }}:{{ seconds | formatTime }}</span><br />
    </div>
  </div>
</template>

<script>

import data from '@/views/EventCard' // Import from the js location



export default {
  props: {
    deadline: {
      type: String,
    //   В дефолт вписываем значение "Y-M-D", либо "Y-М-DTH:M:S"
      default: data,
    //   Раскомментить, после оформления подсоса времени с базы
    //   required: true,
    },
    speed: {
      type: Number,
      default: 1000,
    },
  },
  data() {
    return {
    // Куррент тайм - оставшееся время
      currentTime: Date.parse(this.deadline) - Date.parse(new Date()),
    // "Сегодняшнее число/месяц" и "Число/месяц мероприятия"
    //   datacompare: new Date(this.deadline) === new Date(),
      deadlineDay: (new Date(this.deadline)).getDate(),
      deadlineMonth: (new Date(this.deadline)).getMonth()+1,
      deadlineYear: (new Date(this.deadline)).getFullYear(),
      nowDay: (new Date()).getDate(),
      nowMonth: (new Date()).getMonth()+1,
      nowYear: (new Date()).getFullYear(),

      isExactYear: Boolean,
      isExactMonth: Boolean,
      isExactDay: Boolean,

      FirstCompare: Boolean,
      FinalCompare: Boolean,
      data: data,
    };
  },
  mounted() {
    setTimeout(this.countdown, 1000);
  },
  computed: {
    seconds() {
      return Math.floor((this.currentTime / 1000) % 60);
    },
    minutes() {
      return Math.floor((this.currentTime / 1000 / 60) % 60);
    },
    hours() {
      return Math.floor((this.currentTime / (1000 * 60 * 60)) % 24);
    },
    days() {
      return Math.floor(this.currentTime / (1000 * 60 * 60 * 24));
    }
  },
  watch:{
    isExactYearfunc(){
       return this.deadlineYear === this.nowYear
    },
    isExactMonthfunc(){
       return this.deadlineMonth === this.nowMonth
    },
    isExactDayfunc(){
       return this.deadlineDay === this.nowDay
    },
    // FirstCompare(){
    //    return this.isExactYear === this.isExactMonth
    // },
  },

  filters: {
    formatTime(value) {
      if (value < 10) {
        return "0" + value;
      }
      return value;
    }
  },
  methods: {
    countdown() {
      this.currentTime = Date.parse(this.deadline) - Date.parse(new Date());
      if (this.currentTime > 0) {
        setTimeout(this.countdown, this.speed);
      } else {
        this.currentTime = null;
      }
    },
    log(item) {
      console.log(item)
    },
    FinalComparefinc(){
      this.isExactYear = (this.deadlineYear === this.nowYear)
      this.isExactMonth = this.deadlineMonth === this.nowMonth
      this.isExactDay = this.deadlineDay === this.nowDay
    
      this.FirstCompare = this.isExactYear && this.isExactMonth
      this.FinalCompare = this.FirstCompare && this.isExactDay
      return this.FinalCompare
    }
  }
}
</script>

