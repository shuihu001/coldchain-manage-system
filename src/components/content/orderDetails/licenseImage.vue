<template>
  <div style="height:400px">
    <img :src="imageUrl" alt="">
  </div>
</template>
<script>
import { getFile } from '../../../network/requestDatas'
export default {
  name: "licenseImage",
  props:{ 
    fileId: ""
  },
  data() {
    return {
      imageUrl: ""
    }
  },
  watch: {
    '$route' (ov, nv) {
      console.log(ov);
      console.log(nv);
      getFile(this.fileId).then(res => {
        console.log(res);
        const blob = new Blob([res]) // 处理文档流
        console.log(URL.createObjectURL(blob))
        this.imageUrl = URL.createObjectURL(blob)
      })
    }
  },
  created () {
    console.log(this.fileId);
    getFile(this.fileId).then(res => {
      console.log(res);
      const blob = new Blob([res]) // 处理文档流
      console.log(URL.createObjectURL(blob))
      this.imageUrl = URL.createObjectURL(blob)
    })
  }
}
</script>
<style scoped>
  img{
    height: 100%;
    width: 100%;
  }
</style>