<template>
  <div class="categories">
    <template v-for="item in categories" :key="item.id">
      <div class="item">
        <img :src="item.pictureUrl" alt="">
        <div class="text">{{ item.title }}</div>
      </div>
    </template>
  </div>
</template>

<script setup>

  import useHomeStore from '@/stores/modules/home.js'
  import { storeToRefs } from 'pinia'

  const homeStore = useHomeStore()
  const { categories } = storeToRefs(homeStore)

</script>

<style lang="less" scoped>

  .categories {
    position: relative;
    display: flex;
    overflow-x: auto;
    height: 80px;
    padding: 0 10px;
    margin-top: 8px;
    // 当前选择器的伪类或者伪元素
    // 隐藏滚动条
    &::-webkit-scrollbar{
      display: none
    }

    .item {
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 70px;
      text-align: center;

      img {
        width: 32px;
        height: 32px;
      }

      .text {
        font-size: 12px;
        margin-top: 8px;
      }
    }
  }

</style>