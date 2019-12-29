<template lang="pug">
div
  .event-header
    span.eyebrow @{{ event.time }} on {{ event.date }}
    h1.title {{ event.title }}
    h5 Organized by {{ event.organizer ? event.organizer.name : '' }}
    h5 Category: {{ event.category }}
  BaseIcon(name='map')
    h2 Location
  address {{ event.location }}
  h2 Event details
  p {{ event.description }}
  h2
    | Attendees
    span.badge.-fill-gradient {{ event.attendees.length }}
  ul.list-group
    li.list-item(v-for='(attendee, index) in event.attendees', :key='index')
      b {{ attendee.name }}

</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  props: ['id'],
  created() {
    this.fetchEvent(this.id)
  },
  computed: mapState({
    event: state => state.event.event
  }),
  methods: mapActions('event', ['fetchEvent'])
  
    
}
</script>

<style scoped>
.location {
  margin-bottom: 0;
}
.location > .icon {
  margin-left: 10px;
}
.event-header > .title {
  margin: 0;
}
.list-group {
  margin: 0;
  padding: 0;
  list-style: none;
}
.list-group > .list-item {
  padding: 1em 0;
  border-bottom: solid 1px #e5e5e5;
}
</style>
