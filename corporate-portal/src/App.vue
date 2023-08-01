

<template>
    <div class="wrapper">

        <header>
            <TheHead/>
        </header>

        <RouterView/>
    </div>

</template>
<script setup>
import {RouterView} from 'vue-router'
import TheHead from '@/components/TheHead.vue';
</script>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}

</style>
