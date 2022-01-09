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
  <div>Gift Sheet of Doom :)</div>
  <button @click="changeselectedId">click here to modify selectedId</button>
  <div id="giftSheet-wrapper" class="grid grid-cols-2 gap-4 m-4">
    <div id="giftSheet-selector">
      <GiftSelector :selectedId="selectedId" @gift-selected="onGiftSelected"/>
    </div>
    <div id="giftSheet-result">
      <PlayerPreference :selectedId="selectedId"/>
    </div>
  </div>
  
</template>

<style scoped>

</style>
