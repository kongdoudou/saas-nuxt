<template>
  <div class="bar">
    <h1 @click="onHandleClick">Bar</h1>
    <p>Component</p>
    <h2>异步Ajax数据222：</h2>
    <div v-for="(item, index) in cards" :key="'card_'+index">
      <component :is="item.id===1?'First':'second'" :sourceData="item.sourceData"/>
    </div>
  </div>
</template>

<script>
  import First from '../components/first'
  import Second from '../components/second'

  const fetchInitialData = ({store, route}) => {
    const pageId = route && route.query.pageId;
    if(!isNaN(pageId)) {
      return store.dispatch('fetchData', pageId)
    } else {
      return ''
    }
  };

  export default {
    asyncData: fetchInitialData,
    methods: {
      onHandleClick() {
        alert('bar');
      }
    },
    components: {
      First,
      Second
    },
    mounted() {
      // 因为服务端渲染只有 beforeCreate 和 created 两个生命周期，不会走这里
      // 所以把调用 Ajax 初始化数据也写在这里，是为了供单独浏览器渲染使用
      let store = this.$store;
      let pageId = this.$route.params.id;
      fetchInitialData({ store, pageId});
    },
    computed: {
      cards() {
        return this.$store.state.cards
      }
    }
  }
</script>

<style scoped>
  .bar {
    background: bisque;
  }
</style>
