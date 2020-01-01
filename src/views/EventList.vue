<template lang="pug">
  div
    h1 Events for {{user.user.name}}
    EventCard(v-for='event in event.events' :key='event.id' :event='event')
    template(v-if='page != 1')
      router-link(:to='{name: "event-list", query: {page: page - 1}}' rel='prev') Prev Page
      template(v-if='hasNextPage')  | 
    template(v-if='hasNextPage')
      router-link(:to='{name: "event-list", query: {page: page + 1}}' rel='next') Next Page
    
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import store from '@/store/store'
import {mapState} from 'vuex'

function getPageEvents(routeTo, next) {
  const currentPage = parseInt(routeTo.query.page) || 1
    store.dispatch('event/fetchEvents', {
      page: currentPage
    })
    .then(() => {
      routeTo.params.page  = currentPage
      next()
    })
}

export default {
  props: {
    page: {
      type: [ Number],
      required: true
    },
  },
  components: {
    EventCard
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next)
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next)
  },
  computed: {
    hasNextPage() {
      return (this.event.eventsTotal > this.page * this.event.perPage)
    },
    ...mapState(['event', 'eventsTotal', 'user'])
  },
}
</script>

<style scoped>

</style>
