<template>
  <div class="detail top-page" ref="detailRef">
    <tab-control
      ref="tabControlRef"
      v-if="showTabControl"
      class="tabs"
      :titles="names"
      @tabItemClick="tabClick"
    />
    <!-- 获取房间ID -->
    <!-- <h2>detail: {{ $route.params.id }}</h2> -->

    <!-- 导航 -->
    <van-nav-bar
      title="房屋详情"
      left-text="旅途"
      left-arrow
      @click-left="onClickLeft()"
    />

    <div class="main" v-if="mainPart" v-memo="[mainPart]">
      <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics"/>
      <detail-infos name="描述" :ref="getSectionRef" :top-infos="mainPart.topModule"/>
      <detail-facility name="设施" :ref="getSectionRef" :house-facility="mainPart.dynamicModule.facilityModule.houseFacility"/>
      <!-- <detail-landlord ref="landlordRef" :landlord="mainPart.dynamicModule.landlordModule"/> -->
      <detail-landlord name="房东" :ref="getSectionRef" :landlord="mainPart.dynamicModule.landlordModule"/>
      <detail-comment name="评论" :ref="getSectionRef" :comment="mainPart.dynamicModule.commentModule"/>
      <detail-notice name="须知" :ref="getSectionRef" :order-rules="mainPart.dynamicModule.rulesModule.orderRules"/>
      <detail-map name="周边" :ref="getSectionRef" :position="mainPart.dynamicModule.positionModule"/>
      <detail-introduce :price-introduce="mainPart.introductionModule"/>
    </div>

    <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="">
      <div class="text">旅途，永无止境</div>
    </div>

    <div class="bottom">
      <detail-bottom :current-house="currentHouse"/>
    </div>
  </div>
</template>

<script setup>

  import { computed, ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  import { getDetailInfos } from '@/service/index.js'

  import DetailSwipe from '@/views/detail/cpns/detail_01-swipe.vue'
  import DetailInfos from '@/views/detail/cpns/detail_02-infos.vue'
  import DetailFacility from '@/views/detail/cpns/detail_03-facility.vue'
  import DetailLandlord from '@/views/detail/cpns/detail_04-landlord.vue'
  import DetailComment from '@/views/detail/cpns/detail_05-comment.vue'
  import DetailNotice from '@/views/detail/cpns/detail_06-notice.vue'
  import DetailMap from '@/views/detail/cpns/detail_07-map.vue'
  import DetailIntroduce from '@/views/detail/cpns/detail_08-introduce.vue'
  import DetailBottom from '@/views/detail/cpns/detail_09-bottom.vue'
  import TabControl from '@/components/tab-control/tab-control.vue'

  import useScroll from '@/hooks/useScroll.js'

  const router = useRouter()
  const route = useRoute()
  const houseId = route.params.id

  // 在js代码中获取房间id
  console.log(route.params.id)

  // 发送网络请求获取数据
  const detailInfos = ref({})
  const mainPart = computed(() => detailInfos.value.mainPart)
  const currentHouse = computed(() => detailInfos.value.currentHouse)

  getDetailInfos(houseId).then(res => {
    detailInfos.value = res.data
  })

  // 监听返回按钮的点击
  const onClickLeft = () => {
    router.back()
  }

  // tabControl相关的操作
  const detailRef = ref()
  const { scrollTop } = useScroll(detailRef)
  const showTabControl = computed(() => {
    return scrollTop.value >= 300
  })

  const tabControlRef = ref()

  // const landlordRef = ref()
  /*
  let sectionEls = []
  const getSectionRef = (value) => {
    sectionEls.push(value.$el)
  }
  */
  const sectionEls = ref({})
  // 挂载和卸载此元素时均会执行此函数，卸载时value为null
  const getSectionRef = (value) => {
    if (!value) {
      return
    }
    const name = value.$el.getAttribute('name')
    sectionEls.value[name] = value.$el
  }
  const names = computed(() => {
    return Object.keys(sectionEls.value)
  })

  const tabClick = (index) => {
    const tabControlHeight = tabControlRef.value.$el.offsetHeight

    // let instance = sectionEls[index].offsetTop

    const key = Object.keys(sectionEls.value)[index]
    const el = sectionEls.value[key]
    let instance = el.offsetTop

    if (index !== 0) {
      instance = instance - tabControlHeight
    }

    detailRef.value.scrollTo({
      // landlordRef.value.$el: 拿到组件元素中的根元素
      top: instance,
      behavior: 'smooth'
    })
  }

  // 监听滚动，滚动时匹配对应的tabControl的index
  watch(scrollTop, (newValue) => {
    // 1.获取所有的区域的offsetTops
    const els = Object.values(sectionEls.value)
    const values = els.map(el => el.offsetTop)

    // 2.根据newValue去匹配想要的索引
    let index = values.length - 1
    for (let i = 0; i < values.length; i++) {
      if (values[i] > newValue + 44) {
        index = i - 1
        break
      }
    }
    console.log(index)
    if (tabControlRef.value?.currentIndex !== index) {
      tabControlRef.value?.setCurrentIndex(index)
    }
  })

</script>

<style lang="less" scoped>

  .tabs {
    position: fixed;
    z-index: 99;
    left: 0;
    right: 0;
    top: 0;
    background-color: #ffffff;
  }

  .footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
    height: 120px;

    img {
      width: 123px;
    }

    .text {
      margin-top: 12px;
      font-size: 12px;
      color: #7688a7;
    }
  }

</style>