<template>
  <div class="home">
    <home-nav-bar></home-nav-bar>
    
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="">
    </div>

    <!-- <home-search-box :hot-suggests="hotSuggests"></home-search-box> -->
    <home-search-box />

    <home-categories/>

    <home-content/>

    <button @click="moreData()"> 加载更多 </button>
  </div>
</template>

<script setup>

  import { ref } from 'vue'
  import HomeNavBar from '@/views/home/cpns/home-nav-bar.vue'
  import HomeSearchBox from '@/views/home/cpns/home-search-box.vue'
  import HomeCategories from '@/views/home/cpns/home-categories.vue'
  import HomeContent from '@/views/home/cpns/home-content.vue'
  import useHomeStore from '@/stores/modules/home.js'

  // import hyRequest from '@/service/request/index.js'

  // 发送网络请求
  const homeStore = useHomeStore()
  homeStore.fetchHotSuggestData()
  homeStore.fetchCategoriesData()
  // let currentPage = 1
  homeStore.fetchHouseListData()

  const moreData = () => {
    homeStore.fetchHouseListData()
  }

  /*
  // 发送网络请求
  // 1.热门建议
  const hotSuggests = ref([])
  hyRequest.get({
    url: '/home/hotSuggests'
  }).then(res => {
    hotSuggests.value = res.data
  })
  // 2.推荐分类
  const categories = ref([])
  hyRequest.get({
    url: '/home/categories'
  }).then(res => {
    categories.value = res.data
  })
  */

</script>

<style lang="less" scoped>

  .banner {
    img {
      width: 100%;
    }
  }

</style>