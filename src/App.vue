<template>
    <div id="app">
        <div class="index-grid" v-if="activeTab !== 'admin'">
            <mu-tabs :value="activeTab" @change="handleTabChange">
                <mu-tab title="首页" value="index"></mu-tab>
                <mu-tab title="计划" value="plan"></mu-tab>
                <mu-tab title="排行榜" value="rank"></mu-tab>
                <mu-tab title="个人" value="profile"></mu-tab>
            </mu-tabs>
        </div>
        <router-view></router-view>
    </div>
</template>


<script>
  import router from './router'
  export default {
    data() {
      return {
        activeTab: ''
      }
    },
    created() {
      this.activeTab = this.$route.name.toLowerCase()
    },
    methods: {
      handleTabChange (val) {
        this.activeTab = val;
        router.push({name:val});
      }
    }
  }
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  min-height: 1000px;
  background: url('./static/images/background.jpg') ;
}

.index-grid {
  width: 80%;
  margin: 0 auto;
}

.title{
  letter-spacing: 1px;
  text-align: left;
}

.github-icon:hover{
  opacity: .8;
}

</style>
