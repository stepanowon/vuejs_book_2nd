import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _224bf7ea = () => interopDefault(import('..\\pages\\about.vue' /* webpackChunkName: "pages_about" */))
const _77505f06 = () => interopDefault(import('..\\pages\\contacts.vue' /* webpackChunkName: "pages_contacts" */))
const _09adbb78 = () => interopDefault(import('..\\pages\\contacts\\_no\\index.vue' /* webpackChunkName: "pages_contacts__no_index" */))
const _4203d2af = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

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
    component: _224bf7ea,
    name: "about"
  }, {
    path: "/contacts",
    component: _77505f06,
    name: "contacts",
    children: [{
      path: ":no",
      component: _09adbb78,
      name: "contacts-no"
    }]
  }, {
    path: "/",
    component: _4203d2af,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
