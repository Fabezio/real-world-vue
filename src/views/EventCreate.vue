<template lang="pug">
  div#create
    h1 Create an Event
    form(@submit.prevent='createEvent')
      label Select a category
      select(v-model='event.category')
        option(v-for='cat in categories', :key='cat') {{ cat }}
      h3 Name & describe your event
      .field
        label Title
        input(v-model='event.title', type='text', placeholder='Add an event title')
      .field
        label Description
        input(v-model='event.description', type='text', placeholder='Add a description')
      h3 Where is your event?
      .field
        label Location
        input(v-model='event.location', type='text', placeholder='Add a location')
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
export default {
  components: {
    Datepicker
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
      this.$store.dispatch('event/createEvent', this.event).then(()=> {
        this.$router.push({
          name: 'event-show',
          params: {id: this.event.id}
        })
        this.event = this.createFreshEventObject()
      })
      .catch(() => {})
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
