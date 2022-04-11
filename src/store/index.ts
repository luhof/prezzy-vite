import { createStore } from 'vuex'
import { GET_GIFTS_LIST, GET_GIFT, GET_PREFERENCES } from './mutations-types'
import { SET_SELECTED_ID } from './mutations-types'

import giftsjson from '../assets/gifts.json'
import playerprefsjson from '../assets/playerprefs.json'
import CharactersList from '../assets/characters'
import Character from '../types/character'


export default createStore({
  state: {
    selectedId: 1,
    gifts: giftsjson,
    characters: CharactersList
  },
  getters: {
    [GET_GIFTS_LIST] (state){
      return state.gifts
    },
    [GET_GIFT]: (state) => (id:number) => {
      return state.gifts.find(gift => gift.id == id);
    },
    [GET_PREFERENCES]: (state) => (giftId:number) => {
      //copy to avoid modifying base json file
      const currentPreferences = JSON.parse(JSON.stringify(playerprefsjson[giftId-1]));
      // quick conversion between string of indexes to array to 
      // TODO : fix value format in data or create ratings service
      const arrayOfCharacterIndexes:Array<string> = (Object.values(currentPreferences.ratings) as string[])
      const ratings:Array<Array<Character>> = arrayOfCharacterIndexes.map(rating=> {
        return rating.split(",").map((characterId:string) => {
          const character:Character | undefined = CharactersList.find(
            (elem) => elem.id == parseInt(characterId)
          );
          if (character === undefined) {
            throw new TypeError('Unknown character ID found!');
          }
          return character;
        })
      })
      return {
        id:currentPreferences.id,
        ratings: ratings
      };
    }
  },
  mutations: {
    [SET_SELECTED_ID] (state, selectedId) {
      state.selectedId = selectedId;
    }
  },
  actions: {
  },
  modules: {
  }
})
