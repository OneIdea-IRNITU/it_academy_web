<template>
  <div>
    <b-button v-b-modal.modal-prevent-closing variant="primary" class="btn-lg">Подавть заявку</b-button>

    <b-modal
        id="modal-prevent-closing"
        ref="modal"
        title="Регистрация на мероприятие"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
        ok-only
        ok-title="Отправить"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
            id="input-group-1"
            label="Email"
            label-for="input-1"
            :state="emailState"
            invalid-feedback="Введите корректный email"
        >
          <b-form-input
              id="input-1"
              v-model="form.email"
              type="email"
              placeholder="Введите email"
              :state="emailState"
              required
          ></b-form-input>
        </b-form-group>


        <b-form-group
            id="input-group-2"
            label="Фамилия"
            label-for="input-2"
            invalid-feedback="Обязательное поле"
            :state="lastnameState"
        >
          <b-form-input
              id="input-2"
              v-model="form.lastname"
              placeholder="Введите фимилию"
              :state="lastnameState"
              required
          ></b-form-input>
        </b-form-group>

        <b-form-group
            id="input-group-3"
            label="Имя"
            label-for="input-3"
            invalid-feedback="Обязательное поле"
            :state="firstnameState"
        >
          <b-form-input
              id="input-2"
              v-model="form.firstname"
              placeholder="Введите имя"
              :state="firstnameState"
              required
          ></b-form-input>
        </b-form-group>

        <b-form-group
            id="input-group-4"
            label="Отчество"
            label-for="input-4"
            invalid-feedback="Обязательное поле"
            :state="surnameState"
        >
          <b-form-input
              id="input-2"
              v-model="form.surname"
              placeholder="Введите отчество"
              :state="surnameState"
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        email: '',
        lastname: '',
        firstname: '',
        surname: '',
      },
      lastnameState: null,
      firstnameState: null,
      surnameState: null,
      emailState: null,

      name: '',
      nameState: null,
      submittedNames: []
    }
  },
  methods: {
    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity()
      if (!valid) {

        if (!this.validEmail(this.form.email)) {
          this.emailState = false
        } else {
          this.emailState = true
        }

        if (!this.form.lastname) {
          this.lastnameState = false
        } else {
          this.lastnameState = true
        }

        if (!this.form.firstname) {
          this.firstnameState = false
        } else {
          this.firstnameState = true
        }

        if (!this.form.surname) {
          this.surnameState = false
        } else {
          this.surnameState = true
        }
      }

      return valid
    },
    resetModal() {
      this.form = {
        lastname: '',
        firstname: '',
        surname: '',
        email: ''
      }
      this.lastnameState = null
      this.firstnameState = null
      this.surnameState = null
      this.emailState = null
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault()
      this.handleSubmit()
    },
    handleSubmit() {
      if (!this.checkFormValidity()) {
        return
      }

      this.submitForm()


      this.$nextTick(() => {
        this.$bvModal.hide('modal-prevent-closing')
      })
    },
    submitForm() {
      this.form.lastname = this.ucFirst(this.form.lastname)
      this.form.firstname = this.ucFirst(this.form.firstname)
      this.form.surname = this.ucFirst(this.form.surname)
      const data = JSON.stringify(this.form);
      axios.post('https://open.istu.edu/api/apply.php', data)
          .then((response) => {
            this.flashMessage.success({
              title: 'Заявка успешно отправлена',
              message: response.data
            });
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
    },
    ucFirst(str) {
      if (!str) return str;
      return str[0].toUpperCase() + str.slice(1);
    }
  }
}
</script>



