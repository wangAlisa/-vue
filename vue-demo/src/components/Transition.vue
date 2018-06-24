<template>
	<div class="transition">
		<div class="demo" :class="{'demo2':!show}">
		    <transition name="fade">
		    	<span class="reduce" v-show = "show">一</span>
		    </transition>
		    <span class="add" v-on:click="changeShow">十</span>
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				show: true,
				docState:'save'
			}
		},
		computed:{
			buttonMessage(){
				switch(this.docState){
					case 'save' : return 'Edite'
					case 'edited' : return 'Save'
					case 'editing' : return 'Cancel'
				}
			}
		},
		methods:{
			changeShow(){
				this.show = !this.show;
				var num =Math.random()*10
				if(num < 3) {
					console.log(num,1)
					this.docState = 'save'
				}else if (num < 6){
					console.log(num,2)
					this.docState = 'edited'
				}else{
					console.log(num,3)
					this.docState = 'editing'
				}
			}
		}
	}
</script>
<style>
	.transition{
		margin:100px;
	}
	.demo{
		display:flex;
		width:140px;
		justify-content: space-between;
		overflow: hidden;
	}
	.demo2{
		justify-content:flex-end;
	}
	span{
		display:inline-block;
		width:30px;
		height:30px;
		line-height: 30px;
		border-radius: 50%;
		color:#fff;
		text-align: center;
		font-size: 14px;
	}
	.reduce{
		float:left;
		background:red;
	}
	.add{
		float:right;
		background:blue;
	}
	.fade-enter-active {
	  	animation: fades-in 2s;
	}
	.fade-leave-active{
		animation:fades-out 2s;
	}
	@keyframes fades-in {
		0% {
			transform: translateX(100px) rotate(0);
			opacity: 0;
		}
		100%{
			transform: translateX(0px) rotate(180deg);
			opacity: 1;
		}
	}
	@keyframes fades-out {
		0% {
			transform:translateX(-80px) rotate(0);
			opacity:1;
		}
		/*50% {
			transform: translateX(50px);
			opacity:.5;
		}*/
		100% {
			transform: translateX(10px) rotate(180deg);
			opacity: 0;
		}
	}
</style>