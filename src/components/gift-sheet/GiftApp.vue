<script lang="ts">
import PlayerPreference from './PlayerPreference.vue'
import GiftSelector from './GiftSelector.vue'

import { ref } from 'vue'
import { useDisplay } from 'vuetify'
import { useStore } from 'vuex'


export default {
  name: 'GiftApp',
    components: {GiftSelector, PlayerPreference},
    props: [],
     mounted () {

    },
    setup() {
    const display = useDisplay()
    const store = useStore()

    // display thresholds are not reactive
    // and do not need to use .value
      const gifts = store.getters.GET_GIFTS_LIST;
      let selectedId = store.state.selectedId;

      const onGiftSelected = () => {
        if(display.smAndDown.value){
          dialog.value = true;
        }
      }

      let dialog = ref(false);

      return {selectedId, onGiftSelected, dialog}
    }
}
</script>

<template>

  <div id="giftSheet-wrapper" class="w-full flex p-5 flex-col md:flex-row">
    <div id="giftSheet-selector" class="w-full">
      <GiftSelector :selectedId="selectedId" @gift-selected="onGiftSelected"/>
    </div>

    <!-- result sheet desktop -->
    <div id="giftSheet-result" class="hidden md:block">
      <PlayerPreference/>
    </div>

    <!-- result sheet dialog mobile -->
    <v-overlay
      v-model="dialog"
      opacity="0.1"
      class="flex items-center justify-center"
    >
      <PlayerPreference :isDialog="true" @close-dialog="dialog=false"/>
    </v-overlay>

  </div>
  <div class="m-4">
    Made with 🧄 by Lucas Hörand<br/>
    <a class="underline" href="https://lucas.cool" target="_blank">Website</a>&nbsp;
    <a class="underline" href="https://twitter.com/luhof" target="_blank">Twitter</a>&nbsp;
    <a class="underline" href="https://itch.io/luhof" target="_blank">Itch.io</a>&nbsp;
    <a class="underline" href="https://github.com/luhof" target="_blank">GitHub</a>&nbsp;
  </div>
  
</template>

<style scoped>
  #giftSheet-wrapper{
    max-width:1280px;
    margin:auto;
  }
  #giftSheet-result{
    flex-basis:360px;
    flex-shrink:0;
  }
  
</style>
