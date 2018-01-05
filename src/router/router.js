import Vue from 'vue'
import Router from 'vue-router'
import Page from '../components/page/hello.vue'

Vue.use(Router)

const router = new Router({
    routes: [
        { path: '/', name: 'Root', component: Page },
    ]
})

export default router
