<template>
  <div class="swipe">
    <van-swipe class="swipe-list" :autoplay="3000" indicator-color="white">
      <template v-for="(item, index) in swipeData" :key="index">
        <van-swipe-item class="item">
          <img :src="item.url" alt="">
        </van-swipe-item>
      </template>
      <!-- 自定义作用域插槽 -->
      <template #indicator="props">
      <!--
        <div class="indicator">
          {{ props.active + 1 }}/{{ props.total }}
        </div>
      -->
        <div class="indicator">
          <template v-for="(value, key, index) in swipeGroup" :key="key">
            <span
              class="item"
              :class="{ active: swipeData[props.active]?.enumPictureCategory == key }"
            >
              <span class="text">{{ getName(value[0].title) }}</span>
              <span
                class="count"
                v-if="swipeData[props.active]?.enumPictureCategory == key"
              >
                {{ ' ' + getCategoryIndex(swipeData[props.active]) }}/{{ value.length }}
              </span>
            </span>
          </template>
        </div>
      </template>
    </van-swipe>
  </div>
</template>

<script setup>

  const props = defineProps({
    swipeData:  {
      type: Array,
      default: () => []
    }
  })
  
  // 对数据进行转换
  const swipeGroup = {}

  // 思路二：一次循环
  for (const item of props.swipeData) {
    let valueArray = swipeGroup[item.enumPictureCategory]
    if (!valueArray) {
      valueArray = []
      swipeGroup[item.enumPictureCategory] = valueArray
    }
    valueArray.push(item)
  }

  console.log(swipeGroup)

  // 思路一：好理解，两次循环
  /*
  for (const item of props.swipeData) {
    swipeGroup[item.enumPictureCategory] = []
  }

  for (const item of props.swipeData) {
    const valueArray = swipeGroup[item.enumPictureCategory]
    valueArray.push(item)
  }
  */

  // 定义转换数据的方法
  const nameReg = /【(.*?)】/i   // 正则表达
  const getName = (name) => {
    // return name.replace('：', '').replace('【', '').replace('】', '')
    const results = nameReg.exec(name)
    return results[1]
  }

  const getCategoryIndex = (item) => {
    const valueArray = swipeGroup[item.enumPictureCategory]
    return valueArray.findIndex(data => data === item) + 1
  }

</script>

<style lang="less" scoped>

  .swipe {

    .swipe-list {

      .item {

        img {
          width: 100%;
        }
      }

      .indicator {
        position: absolute;
        right: 5px;
        bottom: 5px;
        padding: 2px 3px;
        display: flex;
        font-size: 12px;
        color: #ffffff;
        border-radius: 6px;
        background: rgba(0, 0, 0, 0.8);

        .item {
          margin: 0 3px;
          
          &.active {
            padding: 1px 3px;
            border-radius: 5px;
            background: #ffffff;
            color: #000000;
          }
        }
      }
    }
  }

</style>