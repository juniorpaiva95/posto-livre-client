import Vue from 'vue'
import Vuex from 'vuex'

import {
  auction,
  auth,
  logger,
  notification,
  bid,
  faq,
  station
} from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auction,
    auth,
    faq,
    logger,
    notification,
    bid,
    station
  }
})
