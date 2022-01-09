
<script lang="ts">
  import { ref } from "vue";
  import giftsjson from '../../assets/gifts.json'
  import { Gift } from '../../types/gift'
  export default{
    name: 'GiftSelector',
    components: {},
    emits: ['gift-selected'],
    props: ['selectedId'],
    setup(props:any, { emit }:any) {
        
        console.log(props);
        const name = ref('mario');
        const age = ref(30);

        const gifts:Gift[] = giftsjson.map(gift => {
          return {
            id: parseInt(gift.id),
            name: gift.name,
            age: parseInt(gift.age)
          }
        });

        const handleClick = () => {
          name.value = 'luigi';
          age.value = 35;
        }

        const selectGift = (giftId:number) => {
          emit('gift-selected', giftId);
        }

        return { handleClick, selectGift, gifts }
    }
  }

</script>

<template>
<button @click="handleClick">click moi stp</button>
  Gift selector with the gift {{selectedId}}<br/>
  
  <ul>
    <li v-for="gift in gifts" :key="gift.name" @click="selectGift(gift.id)">
      {{gift.name}}
    </li>
  </ul>
</template>

<style scoped>

</style>
