<template>
  <div>
    <div class="text-center" v-if="currentTime">
      <span v-if="days">
        Days: {{ days }}<br/>
      </span>
      <span v-if="hours">
        Hours: {{ hours | formatTime }} <br/>
      </span>
      Minutes: {{ minutes | formatTime }} <br/>
      Seconds: {{ seconds | formatTime }} <br/>
        <br/>
        Осталось: <span v-if="days">{{ days }}</span> дней<br />
     </div>
    <!-- <div class="text-center" v-if="!currentTime">
      Уже сегодня!
    </div> -->
    <div class="text-center" v-if= lastCompare>
        Уже сегодня!
    </div>
  </div>
</template>

<script>
export default {
  props: {
    deadline: {
      type: String,
    //   В дефолт вписываем значение "Y-M-D", либо "Y-М-DTH:M:S"
      default: "2021-05-31T15:24:00",
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
      deadlineDay: (this.deadline).getDate,
      deadlineMonth: (this.deadline).getMonth,
      deadlineYear: (this.deadline).getFullYear,
      nowDay: (new Date).getDate(),
      nowMonth: (new Date).getMonth(),
      nowYear: (new Date).getFullYear(),
    // Сравнение предыдущих переменных для вывода "Мероприятие Сегодня"
      isExactYear: this.deadlineYear === this.nowYear,
      isExactMonth: this.deadlineMonth === this.nowMonth,
      isExactDay: this.deadlineDay === this.nowDay,
    // Всё совпало, всё TRUE
      lastCompare: this.isExactYear === this.isExactMonth === this.isExactDay,
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
    }
  }
}
console.log(new Date("2021-05-31T15:24:00").getFullYear() === (new Date).getFullYear())
</script>

