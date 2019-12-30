<template lang="pug">
  .notification-container
    NotificationBar(v-for='notification in notifications' :key='notification.id' :notification="notification")
</template>

<script>
  import NotificationBar from '@/components/NotificationBar.vue'
  import { mapState } from "vuex";
  export default {
    components: {
      NotificationBar
    },
    computed: mapState('notification', ['notifications'])
    

  }
</script>

<style scoped>
.notification-container {
  position: absolute;
  bottom: 0;
  right: 0;
  padding-right: 40px;
}
</style>
