<template>
	<div class="singer">
		歌手页面
	</div>
</template>

<script type="text/ecmascript">
  import { singerList } from 'api/singer'
  import { ERR_OK } from 'api/config'
  export default {
    data() {
      return {
        singers: []
      }
    },
    created() {
      this._singerList()
    },
    methods: {
      _singerList() {
        singerList().then((res) => {
          if(ERR_OK === res.code){
            console.log(res.data.list)
            this.singers = res.data.list
          }
        })
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