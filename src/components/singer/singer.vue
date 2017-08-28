<template>
  <div class="singer">
    <list-view :data="singers"></list-view>
  </div>
</template>


<script type="text/ecmascript">
  import { singerList } from 'api/singer'
  import { ERR_OK } from 'api/config'
  import Singer  from 'common/js/singer'
  import ListView  from 'base/listview/listview'
  const HOT_NAME = '热门'
  const HOT_LENGTH = 10
  export default {
    data () {
      return {
        singers: []
      }
    },
    created () {
      this._singerList()
    },
    methods: {
      _singerList () {
        singerList().then((res) => {
          if (ERR_OK === res.code) {
            this.singers = this._normalizeSinger(res.data.list)
          }
        })
      },
      _normalizeSinger (singer) {
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        singer.forEach((item, index) => {
          if (index < HOT_LENGTH) {
            map.hot.items.push(new Singer ({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            }))
          }
          const key = item.Findex
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(new Singer ({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        })
//        为了获取有序列表，需要处理map中的数据
        let hot = []
        let ret = []
        for (let key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-Z]/) ) {
            ret.push(val)
          } else if (val.title === HOT_NAME) {//此处注意 =  ===的区别
            hot.push(val)
          }
        }
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
      }
    },
    components: {
      ListView
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>