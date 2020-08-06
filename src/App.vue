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
    ></pl-footer>
  </div>
</template>

<script>
import PlHeader from "@/components/layout/pl-default";
import PlHeaderDistributor from "@/components/layout/pl-distributor";
import PlHeaderStation from "@/components/layout/pl-station";
import PlFooter from "@/components/layout/pl-footer";
import { mapGetters } from "vuex";
import Pusher from "pusher-js"; // import Pusher
import Swal from "sweetalert2";

export default {
  data: () => ({
    connected: false,
    wsCalled: false,
    chart: null,
    pusher: null,
    app: null,
    port: 6001,
    apps: [
      {
        id: "123456",
        name: "Posto Livre",
        key: "ABCDEFG",
        host: process.env.VUE_APP_API_URL,
        path: '/laravel-websockets',
        statisticsEnabled: true
      }
    ],
    form: {
      channel: null,
      event: null,
      data: null
    },
    logs: []
  }),
  computed: {
    ...mapGetters({
      user: "auth/getUser",
      station: "auth/getStation"
    }),
    distributor: function() {
      /* console.log("printing user in distributor check"); */
      if (this.user && !this.wsCalled) {
        console.log(this.user.roles);
        console.log("connecting with socket");
        this.connect();
        this.wsCalled = true;
      }
      return this.user !== null && this.user.roles[0].name == "distributor";
    },
    station: function() {
      /* console.log("printing user in gas_station check"); */
      if (this.user && !this.wsCalled) {
        console.log(this.user.roles);
        console.log("connecting with socket");
        this.connect();
        this.wsCalled = true;
      }
      return this.user !== null && this.user.roles[0].name == "gas_station";
    }
  },
  methods: {
    async connect() {
      this.app = this.apps[0];
      this.pusher = new Pusher('ABCDEFG', {
        wsHost:
          this.app.host === null ? window.location.hostname : this.app.host,
        wsPort: this.port === null ? 6001 : this.port,
        wssPort: this.port === null ? 6001 : this.port,
        // wsPath: this.app.path === null ? "" : this.app.path,
        disableStats: true,
        authEndpoint: "http://localhost/laravel-websockets/auth",
        auth: {
          headers: {
            "X-App-ID": this.app.id
          }
        },
        enabledTransports: ["ws"]
      });
      this.pusher.connection.bind("state_change", states => {
        $("div#status").text("Channels current state is " + states.current);
      });
      this.pusher.connection.bind("connected", () => {
        // console.log("PUSHER CONNECTED");
        this.connected = true;
      });
      this.pusher.connection.bind("disconnected", () => {
        this.connected = false;
        this.logs = [];
      });
      this.pusher.connection.bind("error", event => {
        if (event.error.data.code === 4100) {
          $("div#status").text("Maximum connection limit exceeded!");
          this.connected = false;
          this.logs = [];
          throw new Error("Over capacity");
        }
      });
      
      this.pusher
        .subscribe(`private-Api.User.Models.User.${this.user.id}`)
        .bind("Illuminate\\Notifications\\Events\\BroadcastNotificationCreated", function(data) {
            console.log('Data', data);
            // alert(JSON.stringify(data));`
            Swal.fire({
              position: "bottom-end",
              type: "success",
              title: data.data.message,
              timer: 3000,
              toast: true
            });

          }
        );
    },
  },
  components: {
    "pl-header": PlHeader,
    "pl-footer": PlFooter,
    "pl-header-d": PlHeaderDistributor,
    "pl-header-s": PlHeaderStation
  }
};
</script>

<style lang="scss">
@import "./stylesheets/css/background-topography.css";

body {
  background-color: #ffffff;
}
</style>
