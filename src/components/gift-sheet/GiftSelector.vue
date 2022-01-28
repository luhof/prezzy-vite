
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
          let giftToAdd:any = (giftsjson as any)[key] as any;
          gifts.push({
            id: parseInt(key),
            name: giftToAdd.name,
            description: giftToAdd.description,
            rarity: giftToAdd.rarity
          });
        }

        const selectGift = (giftId:number) => {
          emit('gift-selected', giftId);
        }

        let orderOption = "rardown";

        const changedOrderOption = () => {
          console.log("changed", orderOption);
        }

        return { selectGift, gifts, orderOption, changedOrderOption }
    }
  }

</script>

<template>
  <div class="mr-4 mt-8 mb-4 p-4 border-4 border-white rounded-lg backdrop-blur-md shadow-2xl">
    <!--
    <div class="toolbar flex">

      <div>
      Order by:
      <select class="text-black" v-model="orderOption" @change="changedOrderOption">
        <option value="rardown">Rarity (asc)</option>
        <option value="rarup">Rarity (desc)</option>
        <option value="alpha">Alphabetically</option>
      </select>
      </div>

    </div>
    -->

    <div class="flex flex-wrap justify-center" id="gift-grid">
      <div class="prezzy-item-wrapper cursor-pointer m-2"
        v-for="gift in gifts" :key="gift.id" @click="selectGift(gift.id)"
        
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
