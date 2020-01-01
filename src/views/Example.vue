<template lang="pug">
    form(@submit.prevent='submit')
        input(type='email', placeholder="What's your email", :class='{error: $v.email.$error}' v-model='email' @blur='$v.email.$touch()')
        div(v-if='$v.email.$error')
            p.errorMessage(v-if='!$v.email.email') Please enter a valid email
            p.errorMessage(v-if='!$v.email.required') Email is required
        button(type='submit', :disabled='$v.$invalid') Submit!
        p.errorMessage(v-if='$v.$anyError') Please fill out the required fields

</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
    export default {
      data() {
        return {
          email: null
        }
      },
      validations: {
        email: {
          required,
          email
        }
      },
      methods: {
          submit() {
              this.$v.$touch()
              if (!this.$v.$invalid) {
                  console.log(`Form submitted: ${this.email}`)
              }
          }
      }
    }
</script>

<style >
.errorMessage {
    color: darkred;
}

</style>
