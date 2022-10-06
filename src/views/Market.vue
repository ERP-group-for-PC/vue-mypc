<template>
  <a-timeline mode="alternate" v-if="breadlist.length == 2">
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
  <router-view v-else />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  data() {
        return {
            selectedKeys: ref<string[]>([]),
            breadlist: ref<string[]>([]),
        };
    },
    created() {
        this.getSelectedKeys();
        this.getBreadcrumb();
    },
    methods: {
        getSelectedKeys() {
            this.selectedKeys = [this.$route.path];
        },
        getBreadcrumb() {
            this.breadlist = [];
            this.$route.matched.forEach(item => {
                this.breadlist.push(item.meta.title as string);
            });
            console.log(this.breadlist);
        },
    },
    watch: {
        $route() {
            this.getBreadcrumb();
            this.getSelectedKeys();
        },
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
  