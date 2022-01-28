
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
  <div class="mr-4 mt-8 mb-4 p-4 border-4 border-white rounded-lg backdrop-blur-md">

    <div class="flex flex-wrap justify-center" id="gift-grid">
    <div class="prezzy-item-wrapper cursor-pointer m-2"
      v-for="gift in gifts" :key="gift.id" @click="selectGift(gift.id)"
      v-tooltip="gift.name"
      v-bind:class="'prezzy-frame_'+gift.rarity+''"
    >
      <div
          class="prezzy-item m-3"
          v-bind:class="'prezzy-item_'+gift.id+'_'"
          
        >
      </div>
    </div>
      
    </div>

  </div>
</template>

<style scoped>


  .prezzy-item-wrapper{
    transition: transform 0.3s cubic-bezier(0, 1.8, 1, 1.8);
    transform: translateY(0.7em);
    background-size:cover;
  }

  .prezzy-item{
    transition: transform 0.1s cubic-bezier(0, 1.8, 1, 1.8);
  }
  
  .prezzy-item-wrapper:hover{
    transform: translateY(0.5em) rotate(-3deg) scale(1.15);
  }

  .prezzy-item-wrapper:hover .prezzy-item{
    transform: scale(1.3);
  }

</style>
