
<script lang="ts">
  import { computed, ref } from "vue";
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

        const orderOption = ref('rarasc');
        let currentSearch = ref('');

        const orderOptionList = ref([
         {
           text:"ID/Rarity ↑",
           value:"rarasc"
         },
         {
           text:"ID/Rarity ↓",
           value:"rardesc"
         },
         {
           text:"Name ↑",
           value:"alphaasc"
         },
         {
           text:"Name ↓",
           value:"alphadesc"
         },
        ]);

        const filteredResult = computed(() => {
          let sortedGifts = gifts;
          switch(orderOption.value){
            case "rarasc":
              sortedGifts = gifts.sort((a, b) => {
                return a.id > b.id ? 1 : -1;
              })
            break;
            case "rardesc":
              sortedGifts = gifts.sort((a, b) => {
                return a.id < b.id ? 1 : -1;
              })
            break;
            case "alphaasc":
              sortedGifts = gifts.sort((a, b) => {
                return a.name > b.name ? 1 : -1;
              })
            break;
            case "alphadesc":
              sortedGifts = gifts.sort((a, b) => {
                return a.name < b.name ? 1 : -1;
              })
            break;
            default:
              sortedGifts = gifts;
              break;
          }
          if (currentSearch.value != '' && currentSearch.value) {
          return sortedGifts.filter((item) => {
            return item.name
              .toLowerCase()
              .includes(currentSearch.value.toLowerCase())
          })
        }
        else return sortedGifts;
     
  
      });

      return { selectGift, orderOption, orderOptionList, currentSearch, filteredResult }
    }
  }

</script>

<template>
  <div class="mr-4 mt-8 mb-4 p-4 rounded-lg backdrop-blur-md shadow-2xl">
    
    <div class="toolbar flex">

      <div class="w-full flex">
        <!-- order by -->
        <div class="flex md:items-center mb-6 w-1/2">
          <div class="w-1/3">
            <label
              for="order-option"
              class="block font-bold mb-1 pr-4">
              Order by
            </label>
          </div>
          <div class="w-2/3">
            <select
              v-model="orderOption" @update:modelValue="updateOrder"
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="order-option"
            >
              <option class="text-black" v-for="option in orderOptionList" :key="option.value" :value="option.value">
                {{ option.text }}
              </option>
          </select>
          </div>
        </div>
        <!-- quick search -->
         <div class="flex md:items-center mb-6 w-1/2">
          <div class="w-1/3">
            <label
              class="block font-bold mb-1 pr-4"
              for="search-input"
            >
              Search
            </label>
          </div>
          <div class="w-2/3">
            <input
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="search-input"
              v-model="currentSearch" placeholder=""
            />
          </div>
        </div>
        <!--
        <span>order by: </span>
        <select v-model="orderOption" @update:modelValue="updateOrder">
          <option class="text-black" v-for="option in orderOptionList" :key="option.value" :value="option.value">
            {{ option.text }}
          </option>
        </select>-->
      </div>
      <!--
      <div>
        <span>search : </span>
        <input v-model="currentSearch" placeholder="edit me" />
      </div>-->

    </div>
    

    <div class="flex flex-wrap justify-center" id="gift-grid">
      <div class="prezzy-item-wrapper cursor-pointer m-2"
        v-for="gift in filteredResult" :key="gift.id" @click="selectGift(gift.id)"
        v-bind:class="'prezzy-frame_'+gift.rarity+''"
      >
        <div
            class="prezzy-item m-3"
            v-bind:class="'prezzy-item_'+gift.id+'_'"
        >
          <v-tooltip
          activator="parent"
          anchor="top"
          >
            {{gift.name}}
          </v-tooltip>
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
