<template lang="pug">
  div#create
    h1 Create an Event
    form(@submit.prevent='createEvent')

      h3 Which category is your event?
      BaseSelect.field(label='Select a category' :class='{error: $v.event.category.$error}' :options='categories' v-model='event.category', @blur='$v.event.category.$touch()' )
      template(v-if='$v.event.category.$error')
        p.errorMessage(v-if='!$v.event.category.required') Category is required

      h3 Name & describe your event
      BaseInput.field(label='Title' v-model="event.title" type='text' placeholder='Title' :class='{error: $v.event.title.$error}' @blur='$v.event.title.$touch()' )
      template(v-if='$v.event.title.$error')
        p.errorMessage(v-if='!$v.event.title.required') Title is required

      BaseInput.field(label='Description' v-model="event.description" type='text' placeholder='Description')
      
      h3 Where is your event?
      BaseInput.field(label='Location' v-model="event.location" type='text' placeholder='Location')
      
      h3 When is your event?
      .field
        label Date
        datepicker(v-model='event.date', placeholder='Select a date')
       
      BaseSelect.field(label='Select a time' :options='times' v-model='event.time' :class='{error: $v.event.time.$error}' @blur='$v.event.time.$touch()')
      template(v-if='$v.event.time.$error')
        p.errorMessage(v-if='!$v.event.time.required') Time is required

      // input.button.-fill-gradient(type='submit', value='Submit')
      BaseButton(type='submit', buttonClass='-fill-gradient') Submit
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import NProgress from 'nprogress'
import BaseInput from '@/components/BaseInput'
import BaseSelect from '@/components/BaseSelect'
import BaseButton from '@/components/BaseButton'
import {required} from 'vuelidate/lib/validators'
export default {
  components: {
    Datepicker,
    BaseInput,
    BaseSelect,
    BaseButton
  },
  data () {
    const times = []
    for (let i = 0; i <= 24; i++) {
      times.push(i + ':00')
    }
    return {
      times,
      categories: this.$store.state.categories,
      event: this.createFreshEventObject()
    }
  },
  validations: {
    event: {
      category: {required},
      title: {required},
      description: {required},
      location: {required},
      date: {required},
      time: {required}
    }
  },
  methods: {
    createEvent() {
      NProgress.start()
      this.$store.dispatch('event/createEvent', this.event).then(()=> {
        this.$router.push({
          name: 'event-show',
          params: {id: this.event.id}
        })
        this.event = this.createFreshEventObject()
      })
      .catch(() => {
        NProgress.done()
      })
    },
    createFreshEventObject() {
      const user = this.$store.state.user.user
      const id = Math.floor(Math.random() * 10**7 )
      return {
        id: id,
        user: user,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: []
      }
    }
  }
}
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
.errorMessage {
    color: darkred;
}
</style>
