<template>
  <div class="search-bar">
    <div class="select-time">
      <div class="item start">
        <div class="name">住</div>
        <div class="date">{{ startDateStr }}</div>
      </div>
      <div class="item end">
        <div class="name">离</div>
        <div class="date">{{ endDateStr }}</div>
      </div>
    </div>
    <div class="content">
      <div class="keyWord">关键字/位置/民宿</div>
    </div>
    <div class="right">
      <i class="icon-search"></i>
    </div>
  </div>
</template>

<script setup>

  import useMainStore from '@/stores/modules/main.js'
  import { formatMonthDay } from '@/utils/format_date.js'
  import { computed } from 'vue'
  import { storeToRefs } from 'pinia'

  const mainStore = useMainStore()
  const { startDate, endDate } = storeToRefs(mainStore)
  const startDateStr = computed(() => formatMonthDay(startDate.value, 'MM.DD'))
  const endDateStr = computed(() => formatMonthDay(endDate.value, 'MM.DD'))

</script>

<style lang="less" scoped>

  .search-bar {
    display: flex;
    align-items: center;

    height: 45px;
    line-height: 45px;

    padding: 0 10px;
    font-size: 14px;
    color: #999999;

    border-radius: 6px;
    background-color: #f2f4f6;

    .select-time {
      display: flex;
      flex-direction: column;

      .item {
        display: flex;
        align-items: center;
        line-height: normal;
        font-size: 10px;

        .name {
          font-size: 10px;
        }

        .date {
          position: relative;
          color: #333333;
          margin: 0 10px 0 3px;
          font-weight: 500;
        }
      }

      .end .date::after {
        content: '';
        width: 0;
        height: 0;
        border: 4px solid;
        border-color: rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) #666;
        -webkit-border-radius: 3px;
        border-radius: 3px;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
        position: absolute;
        bottom: 0;
        right: -12px;
      }
    }

    .content {
      position: relative;
      flex: 1;
      padding: 0 6px;
      text-align: left;
      border-left: 1px solid #ffffff;

      .keyWord {
        max-width: 155px;
        font-size: 12px;
      }
    }

    .right {
      display: flex;
      align-items: center;
    }

    .icon-search {
      width: 24px;
      height: 24px;
      display: inline-block;

      background-image: url("../../assets/img/home/home-sprite.png");
      background-position: -29px -151px;
      background-size: 207px 192px;
    }
  }

</style>