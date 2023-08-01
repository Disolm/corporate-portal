<template>
    <div class="user-info-view">
        <div
                v-if="isShow"
                class="user-info-view__wrapper"
        >
            <div class="user-info-view__img"/>
            <div class="user-info-view__comment">
                <div class="user-info-view__name">
                    {{ user?.name }}
                </div>
                <div class="user-info-view__email">
                    <div class="user-info-view__title">email:</div>
                    <div class="user-info-view__description"> {{ user?.email }}</div>
                </div>
                <div class="user-info-view__phone">
                    <div class="user-info-view__title">phone:</div>
                    <div class="user-info-view__description"> {{ user?.phone }}</div>
                </div>
                <div class="user-info-view__about-me">
                    <div class="user-info-view__title">О себе:</div>
                    <div class="user-info-view__description"> {{ loremText }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {defineComponent} from 'vue';
import {LoremIpsum} from 'lorem-ipsum';

export default defineComponent({
    data() {
        return {
            isShow: false,
            loremText: ''
        }
    },
    computed: {
        user() {
            return this.$store.getters.getUserData(+this.$route.params.id) || {}
        },
        imageUrl() {
            return `${this.user?.img ? 'url(' + this.user.img + ')' : 'var(--default-cover)'}`
        },

    },
    watch: {
      user:{
          immediate: true,
          deep: true,
          handler(){
              this.loremText = this.loremWords()
              this.isShow = true
          }

      }
    },
    methods: {
        loremWords() {
            if (!Object.keys(this.user).length) return ''
            const lorem = new LoremIpsum({
                sentencesPerParagraph: {
                    max: 40,
                    min: 20
                },
                wordsPerSentence: {
                    max: 16,
                    min: 4
                }
            });
            const words = Math.floor(this.user.address.zipcode.split('-')[0] / 500)
            return lorem.generateWords(+words)
        }
    },
    async mounted() {
        if (!this.$store.getters.getUserData(+this.$route.params.id)) {
            await this.$store.commit('getUsersFromServer')
        }
    }


})

</script>
<style lang="scss" scoped>
.user-info-view {
  width: $width-user-view;
  height: calc(100% - 30px);
  overflow: hidden;

  &__wrapper {
    margin: 30px 30px 0 21px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 61px;
  }

  &__img {
    width: 424px;
    height: 286px;
    border: solid 1px $light-grey;
    background-size: 100% 100%;
    background-image: v-bind(imageUrl);
    grid-area: 1 / 1 / 2 / 2;
  }

  &__comment {
    grid-area: 1 / 2 / 2 / 3;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: minmax(0, 1fr);
    grid-row-gap: 10px;
  }

  &__name {
    grid-area: 1 / 1 / 2 / 2;
    @include text-h3;
  }

  &__email {
    grid-area: 2 / 1 / 3 / 2;
    display: flex;
    flex-direction: row;
  }

  &__phone {
    grid-area: 3 / 1 / 4 / 2;
    display: flex;
    flex-direction: row;
  }

  &__about-me {
    grid-area: 4 / 1 / 5 / 2;
    margin-top: 10px;

    & :nth-child(1) {
      margin-bottom: 25px;
    }

  }

  &__title {
    @include text-h5-b;
    margin-right: 1em;
  }

  &__description {
    @include text-h5;
  }

}
</style>
