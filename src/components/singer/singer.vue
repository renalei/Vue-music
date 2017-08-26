<template>
  <div class="singer">
    歌手页面
  </div>
</template>


<script type="text/ecmascript">
  import { singerList } from 'api/singer'
  import { ERR_OK } from 'api/config'
  import Singer  from 'common/js/singer'
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
            this.singers = res.data.list
            console.log(this.singers)
            console.log(this._normalizeSinger(this.singers))
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
        console.log(map)
      }
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