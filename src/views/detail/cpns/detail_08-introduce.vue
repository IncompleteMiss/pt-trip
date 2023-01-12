<template>
  <div class="introduce">
    <h2 class="title">{{ priceIntroduce.title }}</h2>
    <div class="content">
      {{ priceIntroduce.introduction }}
    </div>
  </div>
</template>

<script setup>

  defineProps({
    priceIntroduce: {
      type: Object,
      default: () => ({})
    }
  })
</script>

<style lang="less" scoped>

  .introduce {
    padding: 16px 12px;
    border-top: 5px solid #f2f3f4;

    .title {
      font-size: 14px;
      color: #000000;
      font-weight: 700;
    }

    .content {
      margin-top: 10px;
      font-size: 12px;
      line-height: 1.5;
      color: #666666;
    }
  }

</style>