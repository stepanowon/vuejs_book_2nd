import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _20134caa = () => interopDefault(import('..\\pages\\about.vue' /* webpackChunkName: "pages_about" */))
const _0453ccb6 = () => interopDefault(import('..\\pages\\contacts.vue' /* webpackChunkName: "pages_contacts" */))
const _46cd7f97 = () => interopDefault(import('..\\pages\\contacts\\_no\\index.vue' /* webpackChunkName: "pages_contacts__no_index" */))
const _0fae3470 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about",
    component: _20134caa,
    name: "about"
  }, {
    path: "/contacts",
    component: _0453ccb6,
    name: "contacts",
    children: [{
      path: ":no",
      component: _46cd7f97,
      name: "contacts-no"
    }]
  }, {
    path: "/",
    component: _0fae3470,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
