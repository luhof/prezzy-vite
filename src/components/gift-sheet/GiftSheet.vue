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
  <div id="giftSheet-wrapper" class="flex m-4">
    <div id="giftSheet-selector" class="col-span-1">
      <GiftSelector :selectedId="selectedId" @gift-selected="onGiftSelected"/>
    </div>
    <div id="giftSheet-result">
      <PlayerPreference :selectedId="selectedId"/>
    </div>
  </div>
  
</template>

<style scoped>

</style>
