<template>
  <div class="home">
    <home-nav-bar></home-nav-bar>
    
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="">
    </div>

    <!-- <home-search-box :hot-suggests="hotSuggests"></home-search-box> -->
    <home-search-box />

    <home-categories/>

    <div class="search" v-if="isShowSearchBar">
      <search-bar/>
    </div>

    <home-content/>

  </div>
</template>

<script setup>

  import {computed, onMounted, onUnmounted, ref, watch} from 'vue'

  import HomeNavBar from '@/views/home/cpns/home-nav-bar.vue'
  import HomeSearchBox from '@/views/home/cpns/home-search-box.vue'
  import HomeCategories from '@/views/home/cpns/home-categories.vue'
  import HomeContent from '@/views/home/cpns/home-content.vue'
  import SearchBar from '@/components/search-bar/search-bar.vue'

  import useHomeStore from '@/stores/modules/home.js'
  import useScroll from '@/hooks/useScroll.js'

  // import hyRequest from '@/service/request/index.js'

  // 发送网络请求
  const homeStore = useHomeStore()
  homeStore.fetchHotSuggestData()
  homeStore.fetchCategoriesData()
  // let currentPage = 1
  homeStore.fetchHouseListData()

  /*
    useScroll(() => {
      homeStore.fetchHouseListData()
  })
  */

const { isReachBottom, scrollTop } = useScroll()
watch( isReachBottom, (newValue) => {
  if (newValue) {
    homeStore.fetchHouseListData().then(() => {
      isReachBottom.value = false
    })
  }
})

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

  // 搜索框显示的控制
  /*
  const isShowSearchBar = ref(false)
  watch(scrollTop, (newTop) => {
    isShowSearchBar.value = newTop > 100
  })
  */

  // 定义的可响应式数据，依赖另外一个可响应式的数据，那么可以使用计算属性(computed)
  const isShowSearchBar = computed(() => {
    return scrollTop.value > 360
  })

</script>

<style lang="less" scoped>

  .banner {
    img {
      width: 100%;
    }
  }
  
  .search {
    position: fixed;
    z-index: 9;
    top: 0;
    left: 0;
    right: 0;
    height: 45px;
    padding: 16px 16px 10px;
    background-color: #fff;
  }

</style>