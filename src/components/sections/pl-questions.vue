<template>
  <div class="pl-questions">
    <div class="container">
      <div class="col pl-questions__titleArea">
        <div class="pl-questions__title">
          <pl-title>{{title}}</pl-title>
        </div>
      </div>

      <div class="col pl-questions__boxArea">
        <div class="pl-questions__box">
          <div class="pl-questions__item" v-for="(value, index) in faq.questions" :key="value.name" @click="onToggle">
            <p class="pl-questions__question">
              <span>{{value.question}}</span>
              <img src="images/icons/other-icons/expand.svg" class="icon">
            </p>
            <div v-for="(avalue, aIndex) in value.answers.answers" :key="avalue.name" class="pl-questions__answer">
              <p>{{avalue.answer}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PLTitle from "@/components/atoms/pl-title";
export default {
  components: {
    "pl-title": PLTitle
  },
  props: {
    title: String,
  },
    data: () => ({
        faq: [],
    }),
    mounted() {
        this.$store.dispatch('faq/fetchFaqs').then(faqs => {
            this.faq = faqs;
            console.log("this is the faqs");
            console.log(faqs);
        });
    },
  methods: {
    //jQuery Method
    onToggle(event) {
      var item = event.target.closest(".pl-questions__item");
      
      $(".pl-questions__answer", item).slideToggle(500);

      var arrow = item.querySelector(".icon");
      if(arrow.classList.contains("flip")){
        arrow.classList.remove('flip');
        return;
      }
      arrow.className += ' flip';
    }
  }
};
</script>
<style lang="scss">
//flip animation
.flip{
  transform: rotate(-180deg);
}
.pl-questions{
  margin-bottom: 50px !important;
  @include grid-media($smartphone-grid){
    display: inline-block;
    margin: auto;
    margin-top: 50px;
    width: 100%;
    h1{
      margin-top: 0px;
    }
  }
  &__title {
    font-weight: lighter;
    font-family: $barlow-family;
  }
  &__question {
    width: 100%;
    font-family: $barlow-family;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid $middlegrey;
    padding: 15px;
    margin-bottom: 0!important;
    line-height: 15px;
    font-weight: bold;
    text-transform: uppercase;
    color: $middlegrey;
    display: flex;
    align-items: center;
    line-height: 20px;
    cursor: pointer;
    span {
      width: 90%;
      text-align: left;
    }
    img {
      width: 10%;
      height: 30px;

      -moz-transition: transform 0.5s;
      -webkit-transition: transform 0.5s;
      transition: transform s;
    }
  }
  &__answer {
    border: 1px solid $middlegrey;
    padding: 10px;
    font-family: $roboto-family;
    width: 100%;
    background: #ffffff;
    display: none;
    p {
      color: $middlegrey;
    }
  }
}
</style>