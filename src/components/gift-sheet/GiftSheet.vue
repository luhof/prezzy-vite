<script lang="ts">
import PlayerPreference from './PlayerPreference.vue'
import GiftSelector from './GiftSelector.vue'

import { computed, ref } from 'vue'

export default {
    name: 'GiftSheet',
    components: {GiftSelector, PlayerPreference},
    props: [],
    setup() {
      let selectedId = ref<number>(5);
      const changeselectedId = () => {
        selectedId.value++;
      }
      const onGiftSelected = (giftId:number) => {
        selectedId.value=giftId;
      }
      const count = computed(() => {
        return selectedId.value*2;
      });

      return {count, selectedId, onGiftSelected, changeselectedId}
    }
}
</script>

<template>
  <div id="giftSheet-wrapper" class="flex p-5">
    <div id="giftSheet-selector" class="grow">
      <GiftSelector :selectedId="selectedId" @gift-selected="onGiftSelected"/>
    </div>
    <div id="giftSheet-result">
      <PlayerPreference :selectedId="selectedId"/>
    </div>

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
