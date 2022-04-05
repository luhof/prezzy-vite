<script lang="ts">
import PlayerPreference from './PlayerPreference.vue'
import GiftSelector from './GiftSelector.vue'

import { computed, ref } from 'vue'
import { useDisplay } from 'vuetify'

export default {
  name: 'GiftSheet',
    components: {GiftSelector, PlayerPreference},
    props: [],
     mounted () {
    
  },
    setup() {
    const display = useDisplay()

    // display thresholds are not reactive
    // and do not need to use .value
      let selectedId = ref<number>(5);
      const changeselectedId = () => {
        selectedId.value++;
      }
      const onGiftSelected = (giftId:number) => {
        selectedId.value=giftId;
        if(display.smAndDown.value){
          dialog.value = true;
        }
      }
      const count = computed(() => {
        return selectedId.value*2;
      });

      let dialog = ref(false);

      return {count, selectedId, onGiftSelected, changeselectedId, dialog}
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
      <PlayerPreference :selectedId="selectedId"/>
    </div>

    <!-- result sheet dialog mobile -->
    <v-overlay
      v-model="dialog"
      opacity="0.1"
      class="flex items-center justify-center"
    >
      <PlayerPreference :selectedId="selectedId" :isDialog="true" @close-dialog="dialog=false"/>
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
