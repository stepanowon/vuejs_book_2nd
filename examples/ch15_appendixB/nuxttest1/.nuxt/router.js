import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _54a19629 = () => interopDefault(import('..\\pages\\about.vue' /* webpackChunkName: "pages_about" */))
const _f2bf838a = () => interopDefault(import('..\\pages\\contacts\\index.vue' /* webpackChunkName: "pages_contacts_index" */))
const _2931d109 = () => interopDefault(import('..\\pages\\contacts\\_no.vue' /* webpackChunkName: "pages_contacts__no" */))
const _745970ee = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

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
    component: _54a19629,
    name: "about"
  }, {
    path: "/contacts",
    component: _f2bf838a,
    name: "contacts"
  }, {
    path: "/contacts/:no",
    component: _2931d109,
    name: "contacts-no"
  }, {
    path: "/",
    component: _745970ee,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
