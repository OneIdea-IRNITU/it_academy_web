<template>
  <div>
    <b-button v-if="this.last_days !== null" v-b-modal.modal-prevent-closing variant="primary" class="btn col-9 col-md-4">Подать заявку</b-button>

    <b-modal
        id="modal-prevent-closing"
        ref="modal"
        title="Регистрация на мероприятие"
        @show="resetModal"
        @hidden="resetModal"
        hide-footer
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
              :state="surnameState"
              required
          ></b-form-input>
        </b-form-group>
        <b-form-group
            id="input-group-5"
            label-for="checkbox-1"
            invalid-feedback="Обязательное поле"
            :state="consentState"
        >
          <b-form-checkbox
              id="checkbox-1"
              v-model="form.consent_to_personal_data"
              name="consentToPersonalData"
              :state="consentState"
              required
          >
            Даю
            <ConsentToPersonalData linkText="согласие"/>
            на обработку персональных данных

          </b-form-checkbox>
        </b-form-group>

        <b-button class="modal__ok-btn" variant="primary" block @click="handleOk">Отправить</b-button>
      </form>
    </b-modal>
     <b-button disabled variant="primary" class="btn col-9 col-md-4">Регистрация окончена</b-button>
  </div>
</template>

<script>
import axios from "axios";
import ConsentToPersonalData from "@/components/ConsentToPersonalData"

export default {
  components: {
    ConsentToPersonalData
  },
  props: {
    startdate: null,
  },
  data() {
    return {
      form: {
        email: '',
        lastname: '',
        firstname: '',
        surname: '',
        consent_to_personal_data: false
      },
      lastnameState: null,
      firstnameState: null,
      surnameState: null,
      emailState: null,
      consentState: null,

      name: '',
      nameState: null,
      submittedNames: [],

      last_days: null,
    }
  },
  mounted() {
    let now = new Date()
    let startdate = new Date(this.startdate*1000)
    if (startdate >= now){
      let nullDate = new Date(this.startdate*1000).setHours(0,0,0,0)
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

        if (!this.form.consent_to_personal_data) {
          this.consentState = false
        } else {
          this.consentState = true
        }

      }

      return valid
    },
    resetModal() {
      this.form = {
        lastname: '',
        firstname: '',
        surname: '',
        email: '',
        consent_to_personal_data: false
      }
      this.lastnameState = null
      this.firstnameState = null
      this.surnameState = null
      this.emailState = null
      this.consentState = null
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

<style scoped>
.modal__ok-btn{
  margin-top: 76px ;
}
</style>




