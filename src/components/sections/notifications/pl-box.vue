<template>
  <div class="pl-notificationBox">
    <div class="pl-notificationBox__header">
      <div class="pl-notificationBox__header--tabArea">
        <a class="pl-notificationBox__header--tab">NOTIFICAÇÕES</a>
      </div>
    </div>
    <div class="pl-notificationBox__body">
      <div class="pl-notificationBox__component" v-for="item in notificacoes" :key="item.code">
        <div class="pl-notificationBox__component--titleArea">
          <span>{{ item.title }}</span>
          <span
            class="pl-notificationBox__component--dot"
            :class="[
                'pl-notificationBox__component--dot--' + item.class
            ]"
          ></span>
        </div>
        <div class="pl-notificationBox__component--textArea">
          <span>{{ item.message }}</span>
        </div>
        <div class="pl-notificationBox__component--timeArea">
          <span>{{ item.date | relativeTime }}</span>
          <span class="pl-notificationBox__component--id">{{ item.code | formatId(4) }}</span>
        </div>
      </div>
      <div class="pl-notificationBox__component pl-notificationBox__component--button">
        <div class="pl-notificationBox__buttonArea">
          <pl-btn type="wider" text="MOSTRAR MAIS"></pl-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PlBtn from "@/components/atoms/pl-btn";
import moment from "moment";
import { mapGetters } from 'vuex';

export default {
  components: {
    "pl-btn": PlBtn
  },
  data: () => ({
    notificacoes: {
      one: {
        title: "Seu lance está vencendo",
        class: "success",
        message:
          "Muito bom! Continue acompanhando este leilão e feche seu negócio.",
        date: "2018-08-11 08:59:59",
        code: "5"
      },
      two: {
        title: "Seu lance está vencendo",
        class: "success",
        message:
          "Muito bom! Continue acompanhando este leilão e feche seu negócio.",
        date: "2018-08-11 08:59:59",
        code: "41"
      },
      three: {
        title: "Seu lance está vencendo",
        class: "success",
        message:
          "Muito bom! Continue acompanhando este leilão e feche seu negócio.",
        date: "2018-08-11 08:59:59",
        code: "415"
      },
      four: {
        title: "Seu lance está vencendo",
        class: "success",
        message:
          "Muito bom! Continue acompanhando este leilão e feche seu negócio.",
        date: "2018-08-11 08:59:59",
        code: "45121"
      },
      five: {
        title: "Seu lance está vencendo",
        class: "success",
        message:
          "Muito bom! Continue acompanhando este leilão e feche seu negócio.",
        date: "2018-08-11 08:59:59",
        code: "1"
      }
    },
    visualizadas: {}
  }),
  computed: {
    ...mapGetters({ user: 'auth/getUser' }),
    getCurrentUser: function(){
      return this.user
    }
  },
  async created() {
        /* console.log("is the user ok??");
        console.log(this.getCurrentUser); */
        await this.$store.dispatch('notification/fetchNotifications', { user_id:  this.getCurrentUser.id});
        this.notificacoes = await this.$store.getters['notification/getNotifications'];
        console.log("getting the notifications in component");
        console.log(this.notificacoes);
  },

  filters: {
    relativeTime(date) {
      let monthHour =
        moment(date).format("DD [de] MMMM") +
        " ⦁ " +
        moment(date).format("H:mm");
      let dateYear = moment(date).format("DD/MM/Y");

      let fromStart = moment(date, "YYYY-MM-DD hh:mm:ss");
      let fromNow = moment();
      let moreThanADay = fromNow.diff(fromStart, "days");

      moment.updateLocale("pt-br", {
        relativeTime: {
          future: "Em %s",
          past: moreThanADay >= 1 ? "%s" : "Há %s",
          s: "poucos segundos",
          ss: "%d segundos",
          m: "um minuto",
          mm: "%d minutos",
          h: "uma hora",
          hh: "%d horas",
          d: monthHour,
          dd: monthHour,
          M: monthHour,
          MM: monthHour,
          y: dateYear,
          yy: dateYear
        }
      });

      return moment(date, "YYYY-MM-DD hh:mm:ss")
        .startOf(date)
        .fromNow();
    },
    formatId(code, len) {
      code = code.toString();
      if (code.length >= len) return "#" + code;
      else return "#" + ("0000" + code).slice(-len);
    }
  }
};
</script>

<style lang="scss">
.pl-notificationBox {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  &__header {
    border: 1px solid rgba(0, 0, 0, 0.08);
    background-color: $blackBase;
    height: 50px;
    width: 100%;
    @include barlowNormal;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: #ffb119;
    display: flex;
    align-items: center;
    padding: 0 5%;
    cursor: default;
  }

  &__body {
    border: 1px solid #f0f0f0;
    background-color: $white;
    width: 100%;
  }

  &__component {
    height: 109px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    padding: 0 5%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: default;
    &:first-child {
      border-top: none;
    }

    &--titleArea {
      @include robotoBold;
      font-size: 14px;
      line-height: 16px;
      letter-spacing: 0.03em;
      color: $blackBase;
      margin-bottom: 1%;
      display: flex;
      align-items: center;
    }

    &--dot {
      margin-left: 1%;
      height: 5px;
      width: 5px;
      background-color: #bbb;
      border-radius: 50%;
      display: inline-block;

      &--success {
        background-color: #01a32e;
      }
      &--warning {
        background-color: #ffb119;
      }
      &--danger {
        background-color: #e41414;
      }
    }

    &--id {
      margin-left: 1%;
    }
    &--textArea {
      @include robotoNormal;
      font-size: 12px;
      line-height: 14px;
      letter-spacing: 0.03em;
      color: $darkgrey;
      margin-bottom: 2%;
    }
    &--timeArea {
      @include robotoNormal;
      font-size: 10px;
      line-height: 12px;
      letter-spacing: 0.03em;
      text-transform: capitalize;
      color: $darkgrey;
    }

    &--button {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 88px;
    }
  }
}
</style>
