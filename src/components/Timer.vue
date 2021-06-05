<template>
  <div>
    <div v-if="currentTime">
      <span v-if="!FinalComparefinc()">
        Осталось: <span v-if="days">{{ days }}</span> дней<br />
      </span>
     </div>

     <div v-if="!currentTime">
       <span>
      Уже прошло<br/>
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

import axios from "axios";


export default {
  props: {
    // event: {
    //     course_id: null,
    //     fullname: null,
    //     category: null,
    //     startdate: null,
    //     enddate: null,
    //     description: null,
    //     image: null,
    //     organizers: null,
    //   },
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

      stack: '',
      unstack: '',
      cut: '',
      cutFull: '',
      rotateDayToMonth:'',
      rotateDayToYear:'',

      FirstCompare: Boolean,
      FinalCompare: Boolean,
      timez: '',
      deadline: null,
      speed: {
        type: Number,
        default: 1000,
    },
    };
  },
  mounted() {
    setTimeout(this.countdown, 1000);
    
    axios
      .get('https://open.istu.edu/api/get_all_events.php?course_id=' + this.$route.params.id)
      .then(response => {
        this.event = response.data[0]

        if (this.event.startdate > 0) {
          let startdate = new Date(this.event.startdate * 1000)
          this.timez = startdate.toLocaleString().slice(0, -3).replace(/\//g, '-').replace(/, /g,"T");
  
          // Приводим к формату Y-М-DTH:M:S
          let i = 0;
          while (this.timez[i] !== 'T'){
            this.stack += this.timez[i];
              i++;
          }
          this.stack = this.stack.split("").reverse().join("");
          this.rotateDayToMonth = this.stack.slice(5, this.stack.length).split("").reverse().join("")
          this.rotateDayToYear = this.stack.slice(0, 5)
          this.stack = this.rotateDayToYear + this.rotateDayToMonth +'-'

          for(i = 0;i<=this.stack.length;i++){
            if(this.stack[i] !== '-'){
              this.cut += this.stack[i]
            }else{
              if (this.cut.length === 1){
                this.cut = '0'+ this.cut;
              }
              if (this.cut.length === 4){
                this.cutFull += this.cut.split("").reverse().join("") + '-'
                this.cut = ''
              }else{
                this.cutFull += this.cut + '-'
                this.cut = ''
              }
            }
          }
          this.cutFull = this.cutFull.slice(0,-1)
          this.unstack = this.timez.slice(this.stack.length, this.timez.length)
          this.timez = this.cutFull + 'T' + this.unstack

          this.deadline = this.timez;
          
          console.log(this.timez);
          console.log(this.timez);



        }
        if (this.event.enddate > 0) {
          let enddate = new Date(this.event.enddate * 1000)
          this.event.enddate = enddate.toLocaleString().slice(0, -3).replace(/-/g,"-").replace(/, /g,"T");
        }

      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
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
    },
  }
}
</script>

