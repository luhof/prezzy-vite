
<script lang="ts">
  import { ref } from "vue";
  import giftsjson from '../../assets/gifts.json'
  import { Gift } from '../../types/gift'

  import '../../assets/prezzysheet.css'

  export default{
    name: 'GiftSelector',
    components: {},
    emits: ['gift-selected'],
    props: ['selectedId'],
    setup(props:any, { emit }:any) {
        
        const gifts:Gift[] = [];
        for (const key of Object.keys(giftsjson)) {
          gifts.push({
            id: parseInt(key),
            name: giftsjson[key].name,
            description: giftsjson[key].description,
            rarity: giftsjson[key].rarity
          });
        }

        const selectGift = (giftId:number) => {
          emit('gift-selected', giftId);
        }

        return { selectGift, gifts }
    }
  }

</script>

<template>
  Gift selector with the gift {{selectedId}}<br/>
  
  <div class="flex flex-wrap">
    <div
      class="prezzy-item m-3"
      v-bind:class="'prezzy-item_'+gift.id+'_'"
      v-for="gift in gifts" :key="gift.id" @click="selectGift(gift.id)"
    >
      {{gift.name}}
    </div>
  </div>
</template>

<style scoped>
  
</style>
