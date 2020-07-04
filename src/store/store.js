import Vue from 'vue'
import Vuex from 'vuex'

import {
  auction,
  auth,
  logger,
  notification,
  bid,
  faq,
  fuel,
  station
} from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auction,
    auth,
    faq,
    fuel,
    logger,
    notification,
    bid,
    station
  }
})
