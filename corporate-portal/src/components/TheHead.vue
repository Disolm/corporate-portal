<template>
    <div class="head">
        <router-link to="/" class="head__logo">
            Жилфонд
        </router-link>
        <div class="head__page">{{ namePage }}</div>
    </div>
</template>
<script>
export default {
    name: 'TheHead',
    computed: {
        namePage() {
             if (this.$route.name?.split('.')[0] === 'user') return 'Пользователь'
             if (this.$route.name === '/') return 'Главная'
        },

    },
}

</script>
<style lang="scss" scoped>
.head {
  width: $width-desktop;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  margin: 46px 0 30px 0;

  &__logo {
    text-decoration: none;
    @include text-h1;
  }

  &__page {
    @include text-h3-l
  }
}
</style>


