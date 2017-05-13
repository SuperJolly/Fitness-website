<template lang="html" v-if="items">
    <div>
      <h3>{{getSubTitle}}</h3>
      <div class="item-view" v-if="items">
          <transition-group name="fade-list" tag="ul">
              <li class="item-view-header" v-for="item in items" :key="item">
                <a :href="item.url" target="_blank">
                  <h1>{{ item.title }}</h1>
                </a>
                <span v-if="item.url" class="host">
                  ({{ item.url }})
                </span>
                <p class="meta">
                  by {{ item.author }}
                  {{ item.created_at }} ago
                </p>
              </li>
          </transition-group>
        </div>
    <mu-pagination v-if="total" :total="total" :current="current" :pageSize="pageSize" @pageChange="handleClick"></mu-pagination>
    </div>
</template>

<script>
function fetchItem (store, type, current) {
  store.dispatch('FETCH_ITEMS', {
    type: type,
    currentPage: current
  })
}
export default {
  data() {
    return {
      pageSize: this.$store.state.pageSize,
      current: 1
    }
  },

  props: {
    type: String
  },
  methods: {
    handleClick(newIndex) {
      fetchItem(this.$store, this.type, newIndex)
    }
  },
  created () {
    fetchItem(this.$store, this.type, this.current)
  },
  // mounted() {
  //   this.total = this.$store.state.items[this.type]
  // },
  computed: {
    items () {
      return this.$store.state.lists[this.type]
    },
    getSubTitle() {
      return this.type === 'newPub' ? "最新发布" : "最热文章"      
    },
    total() {
      return this.$store.state.items[this.type]
    }
  },
  // on the server, only fetch the item itself
  // on the client, fetch everything
}
</script>

<style lang="scss">
  @import '../static/css/common';
    .hotPub, .newPub {
      width: 50%;
    }
    .item-view-header {
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      opacity: 1;
      background-color: #fff;
      padding: 10px 30px 10px 45px;
      border-bottom: 1px solid #eee;
      position: relative;
      line-height: 20px;
      h1 {
        display: inline;
        font-size: 1.5em;
        margin: 0;
        margin-right: .5em;
      }
      .host, .meta, .meta a {
        color: #999;
      }
      .meta a {
        text-decoration: underline;
      }
    }
  
  .fade-list-enter-active {
    transition: all 2s
  }
  .fade-list-enter {

    transform: translate3d(0, -20px, 0)
  }
  .fade-list-leave {
    opacity: 0
  }
  .fade-list-leave-active {
    transition: all 1s
  }

</style>
