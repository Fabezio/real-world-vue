<template lang="pug">
  div#create
    h1 Create an Event
    form(@submit.prevent='createEvent')
      label Select a category
      select(v-model='event.category')
        option(v-for='cat in categories', :key='cat') {{ cat }}
      h3 Name & describe your event

      BaseInput.field(label='Title' v-model="event.title" type='text' placeholder='Title')
      BaseInput.field(label='Description' v-model="event.description" type='text' placeholder='Description')
      
      
      h3 Where is your event?
      BaseInput.field(label='Location' v-model="event.location" type='text' placeholder='Location')
      
      h3 When is your event?
      .field
        label Date
        datepicker(v-model='event.date', placeholder='Select a date')
      .field 
        label Select a time
        select(v-model='event.time')
          option(v-for='time in times', :key='time') {{ time }}
      input.button.-fill-gradient(type='submit', value='Submit')
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import NProgress from 'nprogress'
import BaseInput from '@/components/BaseInput'
export default {
  components: {
    Datepicker,
    BaseInput
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
</style>
