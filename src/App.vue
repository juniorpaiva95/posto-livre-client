<template>
  <div id="app" class="pl-app">
    <pl-header-s :type="true" v-if="station"></pl-header-s>
    <pl-header-d :type="true" v-else-if="distributor"></pl-header-d>
    <pl-header v-else></pl-header>
    <router-view></router-view>
    <pl-footer 
      :options="[
      'Como Funciona',
      'Quem Somos',
      'Começar']"
      :links="[
      '/#comofunciona',
      '/#',
      '/login']"
      >
    </pl-footer>
  </div>
</template>

<script>
import PlHeader from "@/components/layout/pl-default";
import PlHeaderDistributor from "@/components/layout/pl-distributor";
import PlHeaderStation from "@/components/layout/pl-station";
import PlFooter from "@/components/layout/pl-footer";
import { mapGetters } from 'vuex'

export default {
  data: () => ({
  }),
  computed: {
		...mapGetters({
      user: 'auth/getUser',
    }),
    distributor: function(){
      return this.user && this.user.last_name == "Distribuidor";
    },
    station: function(){
      return this.user && this.user.last_name == "Posto";
    }
  },
  components: {
    "pl-header": PlHeader,
    "pl-footer": PlFooter,
    "pl-header-d": PlHeaderDistributor,
    "pl-header-s": PlHeaderStation
  }
}
</script>

<style lang="scss">
@import './stylesheets/css/background-topography.css';

body {
  background-color: #ffffff;
}
</style>
