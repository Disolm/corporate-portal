<template>
    <div class="user-view">
        <TheSidebar/>
        <div class="user-view__view">
            <RouterView/>
        </div>
    </div>
</template>
<script>

import {defineComponent} from 'vue';
import TheSidebar from '@/components/TheSidebar.vue';

export default defineComponent({
    components: {TheSidebar},
})
</script>
<style lang="scss">
.user-view {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  @include shadow-01;
  width: $width-desktop;
  height: $height-desktop;
  border-radius: 10px;
    &__view {
        border-left: solid 1px $light-grey;
    }
}
</style>
