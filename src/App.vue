<template>
  <div class="app">
    <!-- 匹配的为home组件中的name属性 -->
    <router-view v-slot="props">
      <keep-alive include="home">
        <component :is="props.Component"></component>
      </keep-alive>
    </router-view>

    <tab-bar v-show="!route.meta.hideTabBar"></tab-bar>
    <!-- <tab-bar/> -->

    <loading/>
  </div>
</template>

<script setup>

  import { useRoute } from 'vue-router'

  import TabBar from '@/components/tab-bar/tab-bar.vue'
  import Loading from '@/components/loading/loading.vue'

  const route = useRoute()

</script>

<style scoped>

</style>
