<template>
	<section class="star" :class="starType">
		<span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
	</section>
</template>
<script>
// 为了之后便于修改，将变量提炼出来
	const LENGTH = 5;
	const CLS_ON = 'on';
	const CLS_HALF = 'half';
	const CLS_OFF = 'off'

	export default {
		// 通过分数展示什么样的星星，根据zise展示大小不同的星星,根据传过来的zise和score映射出来一个类
		props:{
			size:{
				type:Number
			},
			score:{
				type:Number
			}
		},
		computed:{
			// 根据不同的大小值来添加不同的类
			starType () {
				return 'star-'+this.size
			},
			itemClasses () {
				let result = []
				let score = Math.floor(this.score * 2) / 2 //向下取整。4.3*2=8.6 取整是8 ，除以2之后是4;从而判断有没有小数
				let hasDecimal = score % 1 !== 0; //是否含有小数
				let integer = Math.floor(score);//有多少整数
				for(let i = 0; i < integer; i++) {
					result.push(CLS_ON);
				}
				if(hasDecimal){
					result.push(CLS_HALF)
				}
				while (result.length < LENGTH) {
					result.push(CLS_OFF)
				}
				return result
			}
		},
	}
</script>
<style>
	.star .star-item{
		display:inline-block;
		background-repeat: no-repeat;
	}
	.star-48 .star-item{
		width:20px;
		height:20px;
		margin-right:22px;
		background-size:20px 20px;
	}
	.star-48 .star-item:last-child{
		margin-right:0;
	}
	.star-48 .star-item.on{
		background-image: url(../../static/img/star.png);
	}
	.star-48 .star-item.half{
		background-image: url(../../static/img/star_half.png);
	}
	.star-48 .star-item.off{
		background-image: url(../../static/img/star_off.png);
	}
	.star-36 .star-item{
		width:15px;
		height:15px;
		margin-right:16px;
		background-size:15px 15px;
	}
	.star-36 .star-item:last-child{
		margin-right:0;
	}
	.star-36 .star-item.on{
		background-image: url(../../static/img/star.png);
	}
	.star-36 .star-item.half{
		background-image: url(../../static/img/star_half.png);
	}
	.star-36 .star-item.off{
		background-image: url(../../static/img/star_off.png);
	}
	.star-24 .star-item{
		width:10px;
		height:10px;
		margin-right:3px;
		background-size:10px 10px;
	}
	.star-24 .star-item:last-child{
		margin-right:0;
	}
	.star-24 .star-item.on{
		background-image: url(../../static/img/star.png);
	}
	.star-24 .star-item.half{
		background-image: url(../../static/img/star_half.png);
	}
	.star-24 .star-item.off{
		background-image: url(../../static/img/star_off.png);
	}
</style>