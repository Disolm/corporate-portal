<template>
    <div class="sidebar">
        <div class="sidebar__title">Поиск сотрудников</div>
        <div class="sidebar__input-block">
            <input
                    v-model="value"
                    type="text"
                    placeholder="Введите Id или имя"
                    class="sidebar__input"
                    ref="inputRef"
            />
        </div>
        <div class="sidebar__search-results">
            <div class="sidebar__title">Результаты</div>
            <div class="sidebar__status">{{ statusMessage }}</div>
            <UiPreview
                    class="sidebar__preview-users"
                    v-for="user in users"
                    :key="user.id"
                    :user="user"
            />

        </div>
    </div>
</template>

<script>
import {defineComponent} from 'vue';
import UiPreview from './UiPreview.vue'
import UserInfoView from '../views/UserInfoView.vue'

// const WAIT = 1000;
const API_URL = 'https://jsonplaceholder.typicode.com/users'
export default defineComponent({
    components: {
        UiPreview,
        UserInfoView,
    },
    name: 'sidebar',
    data() {
        return {
            value: '',
            users: null,
        }
    },
    watch: {
        value(newValue) {
            this.users = this.searchUser(newValue)
        }
    },
    computed: {
        statusMessage() {
            if (!this.usersData?.length) return 'загрузка данных'
            if (!this.users?.length && !this.value) return 'начните поиск'
            if (!this.users?.length && this.value) return 'ничего не найдено'
        },
        usersData() {
            return this.$store.getters.getUsers
        }
    },
    methods: {
        async getUsersFromServer() {
            await this.$store.dispatch('getUsersFromServer')
        },
        searchUser(value) {
            const valueArr = value.split(',').map(val => val.trim()).filter(val => !!val)
            const valueArrShielding = valueArr.map(val => val.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"))

            const flag = 'gi'
            const regexpArr = valueArrShielding.map(val => {
                return new RegExp(val, flag)
            })

            return this.usersData.filter(user => {
                return regexpArr.some(reg => {
                    const coincidence = reg.test(user.name + user.id)
                    reg.lastIndex = 0
                    return coincidence
                })
            })
        },
    },
    mounted() {
        this.$refs.inputRef.focus()
        this.getUsersFromServer()
    }

})
</script>
<style lang="scss" scoped>
.sidebar {
  width: $width-sidebar;
  padding: 27px 20px 0 20px;
  height: calc(100% - 27px - 20px);
  overflow: hidden;

  &__title {
    @include text-h3;
    margin: 14px 0;
  }

  &__status {
    @include text-h5;
  }

  &__input {
    width: 190px;
    //height: 49px;
    border: solid 2px $dark-white;
    border-radius: 8px;
    padding: 16px 24px;
    gap: 16px;
  }
}
</style>
