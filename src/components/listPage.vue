<template lang="html" v-if="items">
    <div>
      <h3>{{getSubTitle}}</h3>
      <div class="item-view">
              <ul>
                <li class="item-view-header fadeIDown" v-for="item in items" :key="item">
                  <h3>
                    <a :href="item.url" target="_blank">{{ item.title }}</a>
                  </h3>
                  <span v-if="item.author" class="host">
                    (By {{ item.author }})
                  </span>
                  <span class="meta">
                      {{item.body}}
                  </span>
                  <span class="footer">
                    日期: {{item.created_at}}
                  </span>
                </li>
              </ul>
        </div>
    <mu-pagination v-if="total" :total="total" :current="current" :pageSize="pageSize" @pageChange="handleClick"></mu-pagination>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      pageSize: this.$store.state.pageSize,
      current: 1,
      transitionStatus: false
    }
  },
  props: {
    type: String
  },
  methods: {
    handleClick(newIndex) {
      this.fetchItem(this.$store, this.type, newIndex)
    },
    fetchItem(store, type, current) {
      store.dispatch('FETCH_ITEMS', {
        type: type,
        currentPage: current
      })
    }
  },
  created () {
    this.fetchItem(this.$store, this.type, this.current)
  },
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
    .item-view {
      margin-bottom: 20px;
    }
    .fadeIDown {
      -webkit-animation: fadeIDown 1s;
      -moz-animation: fadeIDown 1s;
      -o-animation: fadeIDown 1s;
      animation: fadeIDown 1s;
    }
    .item-view-header {
      max-width: 500px;
      margin-bottom: 5px;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      opacity: 1;
      background-color: #fff;
      padding: 15px 30px 10px 45px;
      border-bottom: 1px solid #eee;
      position: relative;
      transition: all .4s ease-out;
      line-height: 20px;
      h3 {
        text-transform: uppercase;
        letter-spacing: 1px;
        line-height: 1;
        font-weight: 600;
        font-size: 22px;
        margin: 0;
        text-rendering: optimizeLegibility;
        font-family: 'PingHei', 'PingFang SC', Helvetica Neue, 'Work Sans', 'Hiragino Sans GB', 'Microsoft YaHei', SimSun, sans-serif;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        a {
          text-decoration: none;
          letter-spacing: 1px; 
          color: #696969;
        }
      }
      .host {
        float: right;

      }
      .meta {
        width: 100%;
        height: 25px;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .footer {
        font-size: 12px;
        color: #bbbbbb;
      }
      .host, .meta{
        color: #999;
      }

    }
    @keyframes fadeIDown {
      0% {
        opacity: 0;
        transform: translateY(-20px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
    @-webkit-keyframes fadeIDown {
      0% {
        opacity: 0;
        transform: translateY(-20px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
    @-moz-keyframes fadeIDown {
      0% {
        opacity: 0;
        transform: translateY(-5px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
</style>
