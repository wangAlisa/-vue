<template>
  <div class="customer-img">
        <div class="customer-img-box" v-for="(item,index) in rows">
          <router-link :to="{name:'Layer',params:{imgId:index,imgUrl:item.msg}}">
              <span><img :src="item.msg" alt=""></span>
          </router-link>
        </div>
    </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data(){
    return {
      rows: [
        {
          msg:"http://gtms01.alicdn.com/tps/i1/TB12i5PHFXXXXaKXVXXY7J9SpXX-500-699.jpeg",
        },
        {
          msg:"http://gtms01.alicdn.com/tps/i1/TB12i5PHFXXXXaKXVXXY7J9SpXX-500-699.jpeg",
        },
        {
          msg:"http://gtms01.alicdn.com/tps/i1/TB12i5PHFXXXXaKXVXXY7J9SpXX-500-699.jpeg",
        },
        {
          msg:"http://gtms01.alicdn.com/tps/i1/TB12i5PHFXXXXaKXVXXY7J9SpXX-500-699.jpeg",
        }
      ],
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 *{
      margin:0;
      padding:0;
  }
  body,html{
    width:100%;
    height:100%;
  }
  .customer-img{
      width:100%;
      border:1px solid red;
      overflow:hidden;
      box-sizing: border-box;
  }
  .customer-img .customer-img-box{
      float:left;
      width:50%;
      height:140px;
      padding-right:1%;
      /* border:1px solid red; */
      box-sizing: border-box;
  }
  .customer-img .customer-img-box:nth-child(1),
  .customer-img .customer-img-box:nth-child(2){
      margin-bottom:1%;
  }
  .customer-img .customer-img-box:nth-child(4n){
      padding-right:0;
  }
  .customer-img .customer-img-box span{
      display:inline-block;
      width:100%;
      height:100%;
  }
  .customer-img .customer-img-box span img{
      width:100%;
      height:100%;
  }
</style>
