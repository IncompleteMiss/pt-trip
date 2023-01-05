<template>
  <div class="content">
    <h2 class="title">热门精选</h2>
    <div class="list">
      <template v-for="item in houseList" :key="item.data.houseId">
        <home-item-v9 v-if="item.discoveryContentType === 9" :item-data="item.data" />
        <home-item-v3 v-else-if="item.discoveryContentType === 3" :item-data="item.data" />
      </template>
    </div>
  </div>
</template>

<script setup>

  import HomeItemV9 from '@/components/house-item-v9/house-item-v9.vue'
  import HomeItemV3 from '@/components/house-item-v3/house-item-v3.vue'
  import useHomeStore from '@/stores/modules/home.js'
  import { storeToRefs } from 'pinia'

  const homeStore = useHomeStore()
  const { houseList } = storeToRefs(homeStore)

</script>

<style lang="less" scoped>

  .content {
    padding: 10px 8px;
    margin: 1px 0;

    .title {
      font-size: 22px;
      padding: 0 10px 5px;
    }

    .list {
      display: flex;
      flex-wrap: wrap;
    }
  }

</style>