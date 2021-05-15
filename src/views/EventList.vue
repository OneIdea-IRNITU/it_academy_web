<template>
  <div>
    <h1>Список мероприятий</h1>
    <div>
      <router-link to="contest/33">Перейти к конкурсу с id 33</router-link>
    </div>
    <div>
      <router-link to="contest/73">Перейти к конкурсу с id 73</router-link>
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
  mounted() {
    axios
        .get('https://open.istu.edu/api/get_all_events.php')
        .then(response => {
          this.events = response.data
          console.log(this.events)
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
  }
}
</script>

<style scoped>

</style>