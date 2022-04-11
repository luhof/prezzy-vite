
<script lang="ts">
  import { computed, ref } from "vue";

  import { Gift } from '../../types/gift'
  import { useStore } from 'vuex'

  import '../../assets/prezzysheet.css'
  import { SET_SELECTED_ID } from '../../store/mutations-types';

  export default{
    name: 'GiftSelector',
    components: {},
    emits: ['gift-selected'],
    setup(props:any, { emit }:any) {
        const store = useStore()

        const selectGift = (giftId:number) => {
          store.commit(SET_SELECTED_ID, giftId);
          emit('gift-selected');
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

        const sortGifts = (giftList:Gift[], selectedSort:string):Gift[] => {
          switch(selectedSort){
            case "rarasc":
              return giftList.sort((a, b) => {
                return a.id > b.id ? 1 : -1;
              })
            case "rardesc":
              return giftList.sort((a, b) => {
                return a.id < b.id ? 1 : -1;
              })
            case "alphaasc":
              return giftList.sort((a, b) => {
                return a.name > b.name ? 1 : -1;
              })
            case "alphadesc":
              return giftList.sort((a, b) => {
                return a.name < b.name ? 1 : -1;
              })
            default:
              return giftList;
          }
        }

        const filterGifts = (gifts:Gift[], currentSearch:string):Gift[] => {
          if (currentSearch != '' && currentSearch) {
          return gifts.filter((item) => {
            return item.name
              .toLowerCase()
              .includes(currentSearch.toLowerCase())
            })
         }
          else return gifts;
        }

        const filteredResult = computed(() => {
          const gifts:Gift[] = store.getters['GET_GIFTS_LIST'];
          const sortedGifts:Gift[] = sortGifts(gifts, orderOption.value);
          return filterGifts(sortedGifts, currentSearch.value);
      });

      return { selectGift, orderOption, orderOptionList, currentSearch, filteredResult }
    }
  }

</script>

<template>
  <div class="mt-8 mb-4 p-4 rounded-lg backdrop-blur-md shadow-2xl">
    
    <div class="toolbar flex">

      <div class="w-full flex flex-col lg:flex-row">
        <!-- order by -->
        <div class="items-center flex mb-6 w-full lg:w-1/2">
          <div class="w-1/3">
            <label
              for="order-option"
              class="block font-bold mb-1 pr-4 shrink-0">
              Order by
            </label>
          </div>
          <div class="w-2/3">
            <select
              v-model="orderOption" @update:modelValue="updateOrder"
              class="bg-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight"
              id="order-option"
            >
              <option class="text-black" v-for="option in orderOptionList" :key="option.value" :value="option.value">
                {{ option.text }}
              </option>
          </select>
          </div>
        </div>
        <!-- quick search -->
         <div class="items-center flex mb-6 w-full lg:w-1/2">
          <div class="w-1/3">
            <label
              class="block font-bold mb-1 pr-4 shrink-0"
              for="search-input"
            >
              Search
            </label>
          </div>
          <div class="w-2/3">
            <input
              class="bg-gray-200 rounded w-full py-2 px-4 text-gray-700"
              style="caret-color:auto"
              id="search-input"
              v-model="currentSearch" placeholder="Search..."
            />
          </div>
        </div>
      </div>

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

      <div v-if="filteredResult.length <= 0">
        No result :(
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
