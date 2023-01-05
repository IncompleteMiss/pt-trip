<template>
  <div class="home-search-box">
    <!-- 位置信息 -->
    <div class="location bottom-gray-line">
      <div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
      <div class="position" @click="positionClick">
        <span class="text">我的位置</span>
        <img src="@/assets/img/home/icon_location.png" alt="">
      </div>
    </div>

    <!-- 日期范围 -->
    <div class="section date-range bottom-gray-line" @click="showCalendar = true">
      <div class="start">
        <div class="date">
          <span class="tip">入住</span>
          <span class="time">{{ startDateStr }}</span>
        </div>
      </div>
      <div class="stay">共{{stayCount}}晚</div>
      <div class="end">
        <div class="date">
          <span class="tip">离店</span>
          <span class="time">{{ endDateStr }}</span>
        </div>
      </div>
    </div>
    <van-calendar
      v-model:show="showCalendar"
      type="range"
      color="#ff9854"
      :round='false'
      :formatter="formatter"
      @confirm="onConfirm"
    />

    <!-- 价格/人数选择 -->
    <div class="section price-counter bottom-gray-line">
      <div class="start">价格不限</div>
      <div class="end">人数不限</div>
    </div>
    <!-- 关键字 -->
    <div class="section keyword bottom-gray-line">关键字/位置/名宿名</div>

    <!-- 热门建议 -->
    <div class="section hot-suggests">
      <template v-for="(item, index) in hotSuggests" :key="index">
        <div
          class="item"
          :style="{ color:item.tagText.color, background: item.tagText.background.color }"
        >
          {{ item.tagText.text }}
        </div>
      </template>
    </div>

    <div class="section search-btn">
      <div class="btn" @click="searchBtnClick">开始搜索</div>
    </div>
  </div>
</template>

<script setup>

  import { useRouter } from 'vue-router'
  import useCityStore from '@/stores/modules/city.js'
  import {storeToRefs} from 'pinia'
  import {computed, ref} from 'vue'
  import useHomeStore from '@/stores/modules/home.js'
  import useMainStore from '@/stores/modules/main.js'
  import { formatMonthDay, getDiffDays } from '@/utils/format_date.js'

  const router = useRouter()

  // 定义Props
  /*
  defineProps({
    hotSuggests: {
      type: Array,
      default: () => []
    }
  })
  */

  // 位置/城市点击
  const cityClick = () => {
    router.push('/city')
  }

  const positionClick = () => {
    navigator.geolocation.getCurrentPosition(res => {
      console.log('获取位置成功:', res)
    }, err => {
      console.log('获取位置失败:', err)
    }, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    })
  }

  // 当前城市
  const cityStore = useCityStore()
  const { currentCity } = storeToRefs(cityStore)

  // 日期范围的处理
  const mainStore = useMainStore()
  const { startDate, endDate } = storeToRefs(mainStore)

  const startDateStr = computed(() => formatMonthDay(startDate.value))
  const endDateStr = computed(() => formatMonthDay(endDate.value))
  const stayCount = ref(getDiffDays(startDate.value, endDate.value))

  let showCalendar = ref(false)
  const formatter = (day) => {
    if (day.type === 'start') {
      day.bottomInfo = '入住'
    } else if (day.type === 'end') {
      day.bottomInfo = '离店'
    }
    return day
  }
  const onConfirm = (value) => {
    // 1.设置日期
    const selectStartDate = value[0]
    const selectEndDate = value[1]
    console.log(selectStartDate, selectEndDate)
    mainStore.startDate = selectStartDate
    mainStore.endDate = selectEndDate
    stayCount.value = getDiffDays(selectStartDate, selectEndDate)

    // 2.隐藏日历
    showCalendar.value = false
  }

  // 热门建议
  const homeStore = useHomeStore()
  const { hotSuggests } = storeToRefs(homeStore)

  // 开始搜索
  const searchBtnClick = () => {
    router.push({
      path: '/search',
      query: {
        startDate: startDate.value,
        endDate: endDate.value,
        currentCity: currentCity.value.cityName
      }
    })
  }

</script>

<style lang="less" scoped>

  .home-search-box {
    --van-calendar-popup-height: 100%;
  }

  .location {
    display: flex;
    align-items: center;
    height: 44px;
    padding: 0 20px;

    .city {
      flex: 1;
      font-size: 15px;
      color: #333;
    }

    .position {
      width: 74px;
      display: flex;
      align-items: center;

      .text {
        color: #666;
        font-size: 14px;
      }

      img {
        margin-left: 1px;
        width: 16px;
        height: 16px;
      }
    }
  }

  .section {
    height: 44px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 0 20px;
    color: #999;

    .start {
      flex: 1;
      display: flex;
      height: 44px;
      align-items: center;
    }

    .stay {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-size: 14px;
      font-weight: 500;
      color: #666;
    }

    .end {
      min-width: 30%;
      padding-left: 20px;
      text-align: center;
    }

    .date {
      display: flex;
      flex-direction: column;
      align-items: center;

      .tip {
        font-size: 12px;
        color: #999;
      }

      .time {
        margin-top: 3px;
        color: #333;
        font-size: 15px;
        font-weight: 500;
      }
    }
  }

  .price-counter {
    .start {
      border-right: 1px solid var(--line-color);
    }
  }

  .hot-suggests {
    height: auto;

    .item {
      padding: 4px 8px;
      border-radius: 14px;
      margin: 3px;
      font-size: 12px;
    }
  }

  .search-btn {

    .btn{
      width: 342px;
      height: 38px;
      max-height: 50px;
      font-weight: 500;
      font-size: 18px;
      line-height: 38px;
      text-align: center;
      border-radius: 20px;
      color: #fff;
      // 颜色渐变
      // background-image: linear-gradient(90deg, #fa8c1d, #fcaf3f);
      background-image: var(--theme-liner-gradient);
    }
  }

</style>