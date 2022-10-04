<template>
  <a-breadcrumb style="margin: 6px 0 16px">
    <a-breadcrumb-item>
      <router-link :to="{name: 'Home'}">Home</router-link>
    </a-breadcrumb-item>
    <a-breadcrumb-item>
      <router-link :to="{name: 'Market'}">Market</router-link>
    </a-breadcrumb-item>
  </a-breadcrumb>
  <a-timeline mode="alternate">
    <a-timeline-item>Create a services site 2015-09-01</a-timeline-item>
    <a-timeline-item color="green">Solve initial network problems 2015-09-01</a-timeline-item>
    <a-timeline-item>
      <template #dot><ClockCircleOutlined style="font-size: 16px" /></template>
      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
      laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
      beatae vitae dicta sunt explicabo.
    </a-timeline-item>
    <a-timeline-item color="red">Network problems being solved 2015-09-01</a-timeline-item>
    <a-timeline-item>Create a services site 2015-09-01</a-timeline-item>
    <a-timeline-item>
      <template #dot><ClockCircleOutlined style="font-size: 16px" /></template>
      Technical testing 2015-09-01
    </a-timeline-item>
  </a-timeline>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
  },
});
</script>

<style lang="scss">
.site-layout {
  height: 100vh;
  overflow: scroll;
  .logo {
    width: 120px;
    height: 31px;
    line-height: 16px;
    color:#fff;
    font: {
      weight: bold;
      family: Times;
    }
    background: rgba(255, 255, 255, 0);
    margin: 16px 24px 16px 0;
    float: left;
  }
  .site-layout-background {
    background: #fff;
  }
  [data-theme='dark'] .site-layout-background {
    background: #141414;
  }
}
</style>
  