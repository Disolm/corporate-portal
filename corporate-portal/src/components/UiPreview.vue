<template>
    <router-link class="ui-preview ui-preview_link" :to="{ name: 'user.info', params: {id: user.id} }">
        <div class="ui-preview__photo">
            <div
                    class="ui-preview__img"
            />
        </div>
        <div class="ui-preview__comment">
            <div class="ui-preview__username">
                {{ user.name }}
            </div>
            <div class="ui-preview__email">
                {{ user.email }}
            </div>
        </div>
    </router-link>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
    name: 'ui-preview',
    props: {
        user: {
            type: Object,
            required: true,
        }
    },
    computed: {
        imageUrl() {
            return `${this.user.img ? 'url(' + this.user.img + ')' : 'var(--default-cover)'}`
        },

    }

})
</script>
<style lang="scss" scoped>
.ui-preview {
  width: 240px;
  //width: 100%;
  height: 70px;
  margin-bottom: 18px;
  @include shadow-01;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  border-radius: 10px;
  border: solid 1px $white;


  &:hover, &:active {
    background-color: $light-grey;
    border: solid 1px $light-grey;
  }

  &_link {
    text-decoration: none;
  }

  &__comment {
    overflow: hidden;
    margin: 0 15px;
  }

  &__username {
    @include text-h3;
  }

  &__email {
    @include text-h3-l;
  }

  &__img {
    border-right: solid 1px $light-grey;

    width: 70px;
    height: 70px;
    background-color: $white;
    background-image: v-bind(imageUrl);
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
}
</style>
