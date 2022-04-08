<script lang="ts">
import { computed } from 'vue'

import CharactersList from '../../assets/characters'

import '../../assets/playersheet.css'
import { useStore } from 'vuex'


export default{
    name: 'PlayerPreference',
    components: {},
    emits: ['close-dialog'],
    props: ['selectedId', 'isDialog'],
    setup(props:{isDialog:boolean}, {emit}:any) {
      
      const store = useStore()
      const charactersList = CharactersList;

      const showCloseButton = props.isDialog;

      let giftInfo = computed(() => store.getters.GET_GIFT(store.state.selectedId));
      let jobPoints = computed(() => {
        switch(giftInfo.value.rarity){
          case 1:
            return "11-19"
           case 2:
            return "24-36"
           case 3:
            return "48-72"
           case 4:
            return "400-600"
           case 5:
            return "1600-2400"
           default:
             return "???"
        }
      })

      let preferences = computed(() => {
        return store.getters.GET_PREFERENCES(giftInfo.value.id);
      });

      const closeDialog = () => {
         emit('close-dialog');
      }

      return {preferences, giftInfo, jobPoints, showCloseButton, closeDialog, charactersList}
    }
}
</script>

<template>
<div class= "w-full p-4 flex items-center md:w-auto h-auto sticky top-0">
  <div class="bg-white/50 shadow-2xl backdrop-blur-md rounded-lg md:mt-4 ">
    <div class="gift-info rounded-lg">
      <div class="gift-header flex items-center justify-between p-2 rounded-tl-lg rounded-tr-lg md:p-4">
        <div class="flex font-russo">
          <div class="gift-id mr-2">
          N°{{giftInfo.id}}
          </div>
          <div class="gift-name">
            {{giftInfo.name}}
          </div>
        </div>
        <div @click="closeDialog()" v-if="isDialog">
          <v-icon
            large
            class="cursor-pointer"
          >
            mdi-close-thick
          </v-icon>
        </div>
      </div>
      <div class="gift-description bg-white bg-opacity-50 backdrop-blur-sm text-black flex items-center p-2 md:p-4">
        <div>
          <div
              class="prezzy-item bouncing-item"
              v-bind:class="'prezzy-item_'+giftInfo.id+'_'"
          >
          </div>
        </div>
        <p class="ml-4 text-xs md:text-sm">
          {{giftInfo.description}}
        </p>
      </div>
      <div class="p-1 gift-rating md:p-4">
        <div class="flex justify-center m-1">
          <img
            v-bind:src='giftInfo.rarity > 2 ? "./goldstar.png":"./bluestar.png"'
            v-for="i in giftInfo.rarity" :key="i"
          />
        </div>
        <div class="flex justify-center jobpoints">
          ({{jobPoints}} Job Points)
        </div>
      </div>

      
    </div>
    <div v-for="(preference, index) in preferences.ratings" :key="index" class="flex justify-center">
      <div class="flex items-center">
        <img class="star-icon" v-bind:src='"stars/_"+(index+1)+"star.png"'/>
      </div>
      <div class="flex">
        <div class="character-avatar-wrapper flex items-center"  v-for="character in preference" :key="character.id">
          <div
            class="character-avatar"
            v-bind:class="'bgface-'+character.file"
          >
             <v-tooltip
              activator="parent"
              anchor="top"
              >
                {{character.name}}
          </v-tooltip>
          </div>
        </div>
      </div>
    </div>

    <v-btn @click="closeDialog()" v-if="isDialog" class="gift-button cursor-pointer m-2">
      CLOSE
    </v-btn>
      
  </div>
</div>
</template>

<style scoped>

  .character-avatar-wrapper{
    height:64px;
  }
  .character-avatar{
    margin : 0.5rem;
  }
 
  .gift-header, .gift-rating, .gift-button{
    background-color : #007f9a;
  }
  .gift-name{
    color : #f1feae;
  }

  .gift-description{
    font-size:14px;
    min-height:75px;
  }

  .jobpoints{
    font-size:14px;
    color:#f1feae;
  }

  .bouncing-item{
    animation: h2Ani 1s ease-in-out 1000ms infinite;
  }

  .star-icon{
    width:26px!important;
    height:26px!important;
    max-width:none;
  }
</style>
