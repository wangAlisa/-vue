<template>
	<div class="img-box">
		<router-link :to="{name:'HelloWorld'}">
			<img class="img" :src="this.imgurl">
		</router-link>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				imgurl:this.$route.params.imgUrl
			}
		}
	}
</script>
<style>
	*{
		margin: 0;
		padding: 0;
	}
	.img-box{
		position:absolute;
		top:0;
		left:0;
		bottom:0;
		right:0;
		background:#000;
	}
	.img-box img{
		max-width: 100%;
		max-height: 100%;
		position:absolute;
		top:0;
		right:0;
		bottom:0;
		left:0;
		margin:auto;
	}
</style>