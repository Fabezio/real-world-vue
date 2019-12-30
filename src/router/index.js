import Vue from 'vue';
import VueRouter from 'vue-router';
import EventShow from '@/views/EventShow.vue';
import EventList from '@/views/EventList.vue';
import EventCreate from '@/views/EventCreate.vue';
import NProgress from 'nprogress';
import store from '@/store/store';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'event-list',
    component: EventList,
    props: true
  },
  {
    path: '/event/create',
    name: 'event-create',
    component: EventCreate
  },
  {
    path: '/event/:id',
    name: 'event-show',
    component: EventShow,
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      store.dispatch('event/fetchEvent', routeTo.params.id)
        .then(event => {
          routeTo.params.event = event
          next()
        })
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start()
  next()
})
router.afterEach(() => {
  NProgress.done()
})

export default router
