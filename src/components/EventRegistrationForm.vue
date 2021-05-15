<template>
  <div class="eventRegistrationForm">
    <b-button v-b-modal.modal-center variant="primary" class="btn-lg">Подавть заявку</b-button>

    <b-modal id="modal-center"
             centered
             title="Регистрация на мероприятие"
             hide-footer="true"
    >
      <div>
        <b-form @submit="onSubmit">
          <b-form-group
              id="input-group-1"
              label="Email"
              label-for="input-1"
          >
            <b-form-input
                id="input-1"
                v-model="form.email"
                type="email"
                placeholder="Введите email"
                required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Фамилия" label-for="input-2">
            <b-form-input
                id="input-2"
                v-model="form.lastname"
                placeholder="Введите фимилию"
                required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-3" label="Имя" label-for="input-3">
            <b-form-input
                id="input-2"
                v-model="form.firstname"
                placeholder="Введите имя"
                required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-4" label="Отчество" label-for="input-4">
            <b-form-input
                id="input-2"
                v-model="form.surname"
                placeholder="Введите отчество"
            ></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary" >Регистрация</b-button>

        </b-form>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "EventRegistrationForm",
  data: function () {
    return {
      form: {
        lastname: '',
        firstname: '',
        surname: '',
        email: ''
      }
    }

  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      alert(JSON.stringify(this.form))
    },
  }
}
</script>

<style scoped>

</style>