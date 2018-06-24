<template>
	<section>
		 <div class="audio-inner-box" v-for= "(item,index) in customerAudio">
            <CustomerAudio v-if = "item.url" :theUrl = "item.url"></CustomerAudio>
        </div>
	</section>
</template>
<script>
import CustomerAudio from "./customerAudio/CustomerAudio";
	export default{
		components: {
	        CustomerAudio: CustomerAudio
	    },
		data(){
			return {
				customerAudio: [
					{
						url:'http://voc-dev.speiyou.cn/uploadfiles/0a51b633435147fc9afcb4ba872bbb26.mp3'
					}
				],
			}
		}
	}
</script>
<style>
	.audio-inner-box {
        position: relative;
        width: 100%;
        height: 60px;
        /*background:red;*/
    }
</style>