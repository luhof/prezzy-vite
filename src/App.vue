<script setup lang="ts">
import GiftSheet from './components/gift-sheet/GiftSheet.vue'
</script>

<template>
  <v-app class="bg-transparent text-white">
    <h1 class="m-8">🧄WarioWare : Get It Together🧄<br/>Prezzy Guide!!</h1>
    <GiftSheet/>
  </v-app>
</template>

<style>
body{
  background: url('assets/bgscroll.png') top left;
  animation: bgYellowScrollDiagonal 20s linear infinite;
  background-color:#22b6b6;
 
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  font-size: 20px;
  line-height: 34px;
  letter-spacing: 0.3px;
}

h1{
  font-size: 60px !important;
  line-height: 85px;
  text-shadow: rgb(0 0 0) 8px 0px 0px, rgb(0 0 0) 7.93758px 0.997398px 0px, rgb(0 0 0) 7.7513px 1.97923px 0px, rgb(0 0 0) 7.44406px 2.93018px 0px, rgb(0 0 0) 7.02066px 3.8354px 0px, rgb(0 0 0) 6.4877px 4.68078px 0px, rgb(0 0 0) 5.85351px 5.45311px 0px, rgb(0 0 0) 5.12797px 6.14035px 0px, rgb(0 0 0) 4.32242px 6.73177px 0px, rgb(0 0 0) 3.44941px 7.21814px 0px, rgb(0 0 0) 2.52258px 7.59188px 0px, rgb(0 0 0) 1.55638px 7.84714px 0px, rgb(0 0 0) 0.565898px 7.97996px 0px, rgb(0 0 0) -0.433417px 7.98825px 0px, rgb(0 0 0) -1.42597px 7.87189px 0px, rgb(0 0 0) -2.39627px 7.63269px 0px, rgb(0 0 0) -3.32917px 7.27438px 0px, rgb(0 0 0) -4.21013px 6.80256px 0px, rgb(0 0 0) -5.02539px 6.22459px 0px, rgb(0 0 0) -5.76223px 5.54948px 0px, rgb(0 0 0) -6.40915px 4.78778px 0px, rgb(0 0 0) -6.95606px 3.95136px 0px, rgb(0 0 0) -7.39442px 3.05329px 0px, rgb(0 0 0) -7.71739px 2.10757px 0px, rgb(0 0 0) -7.91994px 1.12896px 0px, rgb(0 0 0) -7.9989px 0.132735px 0px, rgb(0 0 0) -7.95304px -0.865561px 0px, rgb(0 0 0) -7.78307px -1.85035px 0px, rgb(0 0 0) -7.49165px -2.80627px 0px, rgb(0 0 0) -7.08333px -3.71839px 0px, rgb(0 0 0) -6.56448px -4.57249px 0px, rgb(0 0 0) -5.94318px -5.35524px 0px, rgb(0 0 0) -5.22915px -6.05442px 0px, rgb(0 0 0) -4.43352px -6.65912px 0px, rgb(0 0 0) -3.5687px -7.15991px 0px, rgb(0 0 0) -2.6482px -7.54898px 0px, rgb(0 0 0) -1.68637px -7.82024px 0px, rgb(0 0 0) -0.698222px -7.96947px 0px, rgb(0 0 0) 0.300817px -7.99434px 0px, rgb(0 0 0) 1.29516px -7.89446px 0px, rgb(0 0 0) 2.2693px -7.67139px 0px, rgb(0 0 0) 3.20802px -7.32862px 0px, rgb(0 0 0) 4.09668px -6.87148px 0px, rgb(0 0 0) 4.92142px -6.30711px 0px, rgb(0 0 0) 5.66936px -5.64432px 0px, rgb(0 0 0) 6.32883px -4.89346px 0px, rgb(0 0 0) 6.88954px -4.06623px 0px, rgb(0 0 0) 7.34274px -3.17555px 0px, rgb(0 0 0) 7.68136px -2.23532px 0px, rgb(0 0 0) 7.90012px -1.26021px 0px, rgb(0 0 0) 7.9956px -0.265434px 0px, 6px 6px 0px rgb(0 0 0);
  animation: hAni 3000ms ease-in-out 1000ms infinite;
}

h1, h2, .font-russo{
   font-family:'russo_one', Avenir, Helvetica, Arial, sans-serif;
}



</style>
