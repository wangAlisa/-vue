<template>
	<section>
		<!-- 单图 -->
		<!-- <div>
			<img v-gallery class="thumbnail" src="https:wx1.sinaimg.cn/mw1024/686d7361ly1fpha0mpd5uj21hc0tyws2.jpg">
		</div> -->
		<!-- 多图1 -->
		<!-- <div style="overflow: hidden" >
			<img v-gallery:group1 class="thumbnail" v-for="img in list1" :src="img.src" :key="img.src">
		</div> -->
		<!-- 多图2 -->
		<!-- <div style="overflow: hidden">
			<img  v-gallery="'group2'" class="thumbnail" v-for="(img,index) in list1" :data-index ="index" :src="img.src" :key="img.src+index">
		</div> -->
		<!-- 多图3 -->
		<div style="overflow: hidden">
			<img v-gallery:group class="thumbnail" v-for="(img,index) in list1" :src="img.src" :key="img.src + index"  :title="index+'/'+10" >
		</div>
	</section>
</template>
<script>

	export default {
		name:'ImgVue',
		data(){
			return {
				 list1: [
			        {
			          src:
			            'https://wx1.sinaimg.cn/mw1024/686d7361ly1fpha0mpd5uj21hc0tyws2.jpg'
			        },
			        {
			          src:
			            'https://wx1.sinaimg.cn/mw1024/686d7361ly1fpha0ncnnej21hc0zetxo.jpg'
			        },
			        {
			          src:
			            'https://wx1.sinaimg.cn/mw1024/686d7361ly1fpha0mqvu5j21hc0zkgzz.jpg'
			        }
			    ]
			}
		}
	}
</script>
<style>
	.thumbnail {
	    display: block;
	    float: left;
	    margin: 3px;
	    height: 100px;
	    width: 100px;
	    object-fit: cover;
	}
</style>