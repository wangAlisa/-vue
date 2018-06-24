<template>
	<section>
		<aplayer autoplay :music="{
			title:'preparation',
			author:'王丽娟',
			url:'http://voc-dev.speiyou.cn/uploadfiles/5555237df92547e19c8c616b9bfdd8a6.mp3',
			pic:'http://devtest.qiniudn.com/Preparation.jpg',
			lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'
			}">
			
		</aplayer>
	</section>
</template>
<script>
 import Aplayer from 'vue-aplayer'
	export default {
		components: {
		    Aplayer
		},
		data(){
			return {

			}
		}
	}
</script>
<style>
	
</style>