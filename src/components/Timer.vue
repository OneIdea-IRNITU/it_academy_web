<template>
  <div>
    <div v-if="this.last_days === null">
      <span>
      Мероприятие завершено<br/>
      </span>
     </div>

    <div v-else-if="this.last_days === 0">
        Уже сегодня!
    </div>

    <div v-else>
        {{ sklonenie_ostalos(last_days) }} <span>{{ last_days }}</span> {{ sklonenie_dney(last_days) }}
     </div>

    
  </div>
</template>

<script>

export default {
  props: {
    event: {
        course_id: null,
        fullname: null,
        category: null,
        startdate: null,
        enddate: null,
        description: null,
        image: null,
        organizers: null,
        enddate_formatted: null,
        startdate_formatted: null
      },
  },
  data() {
    return {
      last_days: null,
    };
  },
  mounted() {
    let now = new Date()
    let startdate = new Date(this.event.startdate*1000)
    if (startdate >= now){
      let nullDate = new Date(this.event.startdate*1000).setHours(0,0,0,0)
      let nullNow = new Date().setHours(0,0,0,0)
      if (nullDate === nullNow){
        this.last_days = 0
      }
      else{ 
        this.last_days = Math.ceil(((startdate) - now)/(1000 * 60 * 60 * 24))
      }
    }
  },

  methods: {
    log(item) {
      console.log(item)
    },
    sklonenie_dney(n) {  
    let text_forms = ['день', 'дня', 'дней']
    n = Math.abs(n) % 100; var n1 = n % 10;
    if (n > 10 && n < 20) { return text_forms[2]; }
    if (n1 > 1 && n1 < 5) { return text_forms[1]; }
    if (n1 == 1) { return text_forms[0]; }
    return text_forms[2];
},
    sklonenie_ostalos(n) {  
    let text_forms = ['Осталось:', 'Остался:']
    n = Math.abs(n) % 100; var n1 = n % 10;
    if (n1 == 1) { return text_forms[1]; }
    return text_forms[0];
}
  }
}
</script>

