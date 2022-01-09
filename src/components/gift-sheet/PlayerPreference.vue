<script lang="ts">
import { computed, Prop } from 'vue'
export default{
    name: 'PlayerPreference',
    components: {},
    props: ['selectedId'],
    setup(props:{selectedId:number}) {
      let count = computed(() => {
        return props.selectedId*2;
      });

      return {count}
    }
}
</script>

<template>
<div class="bg-red-300">
  PlayerPref {{selectedId}}<br/>
  computed : {{count}}
</div>
</template>

<style scoped>

</style>
