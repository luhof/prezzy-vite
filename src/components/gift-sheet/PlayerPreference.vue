<script lang="ts">
import { reactive } from "vue"
import { computed, Prop } from 'vue'

import giftsjson from '../../assets/gifts.json'
import { Gift } from '../../types/gift'


import Character from '../../types/characters'
import CharactersList from '../../assets/characters'

import playerprefsjson from '../../assets/playerprefs.json'

import '../../assets/playersheet.css'


export default{
    name: 'PlayerPreference',
    components: {},
    props: ['selectedId'],
    setup(props:{selectedId:number}) {
      
      const getClassNameForIndex = (index:string) => {
        switch(parseInt(index)){
          case 1 :
            return 'text-blue-500';
            break;
          case 2 :
            return 'text-green-500';
            break;
          case 3 :
            return 'text-yellow-500';
            break;
          case 4 :
            return 'text-orange-500';
            break;
          case 5 : 
            return 'text-pink-500';
            break;
        }
      } 

      const getCharactersFromString:Character[] = (charactersStr:string) =>{
        let charactersArray:Character[] = [];
        const charactersIndex = charactersStr.split(",");
        charactersIndex.map((characterId)=>{
          const character:Character= CharactersList.find((elem) => elem.id == parseInt(characterId));
          charactersArray.push(character);
        })
        return charactersArray;
      }

      let preferences = computed(() => {
        //get current object
        const currentPreferences = playerprefsjson[props.selectedId-1];
        const result = {
          5 : getCharactersFromString(currentPreferences["5"]),
          4 : getCharactersFromString(currentPreferences["4"]),
          3 : getCharactersFromString(currentPreferences["3"]),
          2 : getCharactersFromString(currentPreferences["2"]),
          1 : getCharactersFromString(currentPreferences["1"]),
        }
        return result;
      });

      return {preferences, getClassNameForIndex}
    }
}
</script>

<template>
<div class="bg-red-300 sticky top-0">
  <div>
    <div v-for="(preference, index) in preferences" class="flex">
    {{index}}
      <div v-bind:class="getClassNameForIndex(index)">
        <span>↑</span>
        <span v-if="parseInt(index) > 3">↑</span>
        <span v-if="parseInt(index) > 4">↑</span>
      </div>
      <div class="flex">
        <div
          class="character-avatar"
          v-for="character in preference" :key="character.id"
          v-bind:class="'bg-'+character.file"
          v-tooltip="character.name"
        >
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
  .character-avatar{
    margin : 0.5rem;
  }
</style>
