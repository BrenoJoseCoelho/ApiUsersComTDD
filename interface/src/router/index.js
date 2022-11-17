import { createRouter, createWebHistory } from 'vue-router'
//import HomeView from '../views/HomeView.vue'
import CreateUser from '../views/CreateUser.vue'
import UsersList from '../views/UsersList.vue'
import EditUser from '../views/EditUser.vue'

const routes = [
  {
    path: '/',
    name: 'UsersList',
    component: UsersList
  },
  {
    path: '/useredit/:name',
    name: 'UserEdit',
    component: EditUser
  },
  {
    path: '/register',
    name: 'CreateUser',
    component: CreateUser
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
