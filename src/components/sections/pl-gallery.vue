<template>
     <div class="pl-gallery">
          <div class="container">
               <div class="pl-gallery__col" :style="{backgroundImage: `url(${require('@/assets/images/gallery/1.png')})`}">
                    <h3>Logística</h3>
                    <span>
                       <p>
                            Escolha entre<br>
                            cif ou fob
                       </p>
                       <p>
                            Escolha sua melhor<br> 
                            logística
                       </p>
                    </span>
               </div>     
               <div class="pl-gallery__col" :style="{backgroundImage: `url(${require('@/assets/images/gallery/2.png')})`}">
                    <h3>Oferta e Demanda</h3>
                    <span>
                       <p>
                            texto qualquer
                       </p>
                       <p>
                            lorem outro<br>ipsum
                       </p>
                    </span>
               </div>   
               <div class="pl-gallery__col" :style="{backgroundImage: `url(${require('@/assets/images/gallery/3.png')})`}">
                    <h3>Lorem ipsum</h3>
                    <span>
                       <p>
                            texto qualquer
                       </p>
                       <p>
                            lorem outro<br>ipsum
                       </p>
                    </span>
               </div>   
               <div class="pl-gallery__col" :style="{backgroundImage: `url(${require('@/assets/images/gallery/4.png')})`}">
                    <h3>Lorem ipsum</h3>
                    <span>
                       <p>
                            texto qualquer
                       </p>
                       <p>
                            lorem outro<br> ipsum
                       </p>
                    </span>
               </div>   
          </div>
     </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss">
.pl-gallery{
    background-color: $grey;
    margin-bottom: 100px;
    &__col{
          width: 25%;
          background-size: cover;
          background-repeat: no-repeat;
          position: relative;
          color: #ffffff;
          overflow: hidden;
          text-transform: uppercase;
          @media (max-width: 992px){
               width: 50%;
          }
          h3{
               position: absolute;
               bottom: 30px;
               left: 30px;
               margin: 0;
               padding: 0;
               font-weight: 400;
               font-size: 16px;
               z-index: 1;
               transition:  ease-in-out 0.3s;
          }
          span{
               position: absolute;
               top: 0;
               left: -100%;
               padding: 0px 50px 0px 30px;
               width: 100%;
               height: 100%;
               display: flex;
               flex-direction: column;
               justify-content: space-between;
               opacity: 0;
               visibility: hidden;
               z-index: 1;
               transition:  ease-in-out 0.5s;
               p:last-child{
                    position: relative;
                    &:after{
                         content: "";
                         position: absolute;
                         width: 1%;
                         height: 300%;
                         background-color: $yellow;
                         top: 0px;
                         bottom: 50px;
                         left: -10px;
                    }
               }
          }
          &:after{
               content: "";
               display: block;
               position: relative;
               padding-top: 100%;  
               background-color: rgba(black, 0.5);  
               z-index: 0;
          }
          &:hover{
               h3{
                    opacity: 0;
                    left: 50%;
                    visibility: hidden;
               }
               span{
                    left: 0;
                    visibility: visible;
                    opacity: 1;
               }
          }
    }
    .container{
         display: flex;
         @media (max-width: 992px){
              flex-flow: row wrap;
         }
    }
}
</style>


