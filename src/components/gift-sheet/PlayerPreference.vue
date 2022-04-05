<script lang="ts">
import { computed, Prop } from 'vue'

import giftsjson from '../../assets/gifts.json'

import Character from '../../types/character'
import CharactersList from '../../assets/characters'

import playerprefsjson from '../../assets/playerprefs.json'

import '../../assets/playersheet.css'


export default{
    name: 'PlayerPreference',
    components: {},
    props: ['selectedId'],
    setup(props:{selectedId:number}) {
      

      const getCharactersFromString = (charactersStr:number|string) =>{
        const newString = charactersStr.toString();
        let charactersArray:Character[] = [];
        const charactersIndex = newString.split(",");
        charactersIndex.map((characterId)=>{
          const character:Character|undefined = (CharactersList.find((elem) => elem.id == parseInt(characterId)));
          charactersArray.push(character as Character);
        })
        return charactersArray;
      }

      let giftInfo = computed(() => {
        const currentGift = (giftsjson as any)[props.selectedId];
        return currentGift;
      });

      let jobPoints = computed(() => {
        switch((giftsjson as any)[props.selectedId].rarity){
          case 1:
            return "11-19"
            break;
           case 2:
            return "24-36"
            break;
           case 3:
            return "48-72"
            break;
           case 4:
            return "400-600"
            break;
           case 5:
            return "1600-2400"
            break;
        }
        
      })

      let preferences = computed(() => {
        //get current object
        //TODO not very clean...
        const currentPreferences = playerprefsjson[props.selectedId-1];
        const result = {
          5 : getCharactersFromString(currentPreferences["5"]),
          4 : getCharactersFromString(currentPreferences["4"]),
          3 : getCharactersFromString(currentPreferences["3"]),
          2 : getCharactersFromString(currentPreferences["2"]),
          1 : getCharactersFromString(currentPreferences["1"]),
        };
        return result;
      });

      return {preferences, giftInfo, jobPoints}
    }
}
</script>

<template>
<div class= "  sticky top-0 p-4">
  <div class="m-4 border-4 border-white rounded-lg backdrop-blur-md shadow-2xl">
    <div class="gift-info">
      <div class="gift-header p-4">
      <div class="flex">
        <div class="gift-id mr-2">
        N°{{selectedId}}
        </div>
        <div class="gift-name">
          {{giftInfo.name}}
        </div>
      </div>
      </div>
      <div class="gift-description bg-white bg-opacity-50 backdrop-blur-sm text-black flex items-center p-4">
        <div>
          <div
              class="prezzy-item bouncing-item"
              v-bind:class="'prezzy-item_'+selectedId+'_'"
          >
          </div>
        </div>
        <p class="ml-4">
          {{giftInfo.description}}
        </p>
      </div>
      <div class="gift-rating p-4">
        <div class="flex justify-center m-1">
          <img
            v-bind:src='giftInfo.rarity > 2 ? "/goldstar.png":"/bluestar.png"'
            v-for="i in giftInfo.rarity" :key="i"
          />
        </div>
        <div class="flex justify-center jobpoints">
          ({{jobPoints}} Job Points)
        </div>
      </div>

      
    </div>
    <div v-for="(preference, index) in preferences" :key="preference.id" class="flex">
      <div class="flex items-center">
        <img class="star-icon" v-bind:src='"/stars/"+index+"stars.png"'/>
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
 
  .gift-header, .gift-rating{
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
