<template>
	<div class="audio-inner">
		<div class="loading" v-show="audio.waiting">
			<img src="../audioImg/new_loading.gif" alt="">
		</div>
		<div v-show="!audio.waiting">
			<audio class="audios"
				@pause="isPause"
				@play="isPlay"
				@error="isError"
				@waiting="isWaiting"
				@timeupdate="onTimeupdate"
				@loadedmetadata="onLoadedmetadata"
				:src="url" ref="audio">
			</audio>
			<mu-flexbox>
				<mu-flexbox-item class="flex-demo">
					<button class="btn-status mu-float-button-secondary" :class="{'btn-pause':audio.playing}" @click="startPlay"></button>
				</mu-flexbox-item>
				<mu-flexbox-item class="flex-demo">
					<div class="progress">
						<mu-slider class="song-slider" @change="changeCurrentTime" :value="sliderTime"></mu-slider>
					</div>
				</mu-flexbox-item>
				<mu-flexbox-item class="flex-demo time">
					<time class="current">{{audio.currentTime | formatSecond }}</time>/<time class="total">{{audio.maxTime | formatSecond}}</time>
				</mu-flexbox-item>
			</mu-flexbox>
		</div>
	</div>
</template>

<script>
    /**
     * 播放/暂停 是否播放中
     * 音频的总时长和当前播放时间
     */
    function realFormatSecond(second) {
        if (isNaN(second)) {
            return "00'00";
        }
        const pad0 = (num) => {
			return num < 10 ? '0' + num : '' + num;
        };

        const min = Math.trunc(second / 60);
        const sec = Math.trunc(second - min * 60);
        const hours = Math.trunc(min / 60);
        const minAdjust = Math.trunc((second / 60) - (60 * Math.trunc((second / 60) / 60)));
        return second >= 3600 ? pad0(hours) + "'" + pad0(minAdjust) + "'" + pad0(sec) : pad0(min) + "'" + pad0(sec);
    }
    export default {
        name:'audio-inner',
        props: {
	        //音频地址
          theUrl: {
              type: String,
	          requered: true
          },
	        //控制条
	       theControlList: {
              type: String,
		       default: ''
	       }
        },
        data(){
            return {
                audio:{
                    //是否处于播放状态
                    playing:false,
	               //当前播放时间
	                currentTime:0,
	                //等待时间
                    waiting:true,
	                //提前加载
	                preload: 'auto',
					//加载状态
					loading:true

                },
	            sliderTime:0,
	            url:this.theUrl,
	            controlList: {
		            //不显示进度条
		            noProcess:false,
	            }
            }
        },
	    mounted(){
            this.$refs.audio.addEventListener('ended', this.onAudioEnded)
	    },
	    methods: {

            //控制音频的播放与暂停
		    startPlay(){
		        return this.audio.playing ? this.pause() : this.play()
		    },
		    //播放音频
		    play(){
		        this.$refs.audio.play()
		    },
		    //暂停
		    pause(){
		        this.$refs.audio.pause()
		    },
		    //当播放
		    isPlay(res){
		        this.audio.playing = true
			    this.audio.loading = false
			    //只能播放一个
			    let target = res.target
			    let audios = document.getElementsByClassName('audios');
                [...audios].forEach((item) => {
                    if(item != target){
                        item.pause()
                    }
                })
		    },
		    //当暂停
		    isPause(){
		        this.audio.playing = false
		    },
		    //发生错误，出现loading状态
		   isError(){
		      this.audio.waiting = true
		    },
		    //当音频开始等待
		    isWaiting(res){
		    	console.log('等待');
		        console.log(res);
		    },

		    //播放跳转
            changeCurrentTime(index){

                this.$refs.audio.currentTime = parseInt(index / 100 * this.audio.maxTime)
                this.$refs.audio.maxTime =this.audio.maxTime
            },
		    //当前播放时间
		    onTimeupdate(res){
              this.audio.currentTime = res.target.currentTime
              this.audio.maxTime = res.target.duration
			  this.sliderTime = parseInt(this.audio.currentTime / this.audio.maxTime * 100)

		    },
		    //加载语音流元数据完成后，触发时间的回调函数
		    onLoadedmetadata(res){
//		      alert(this.$refs.audio.buffered.end(this.$refs.audio.buffered.length - 1));
		      //加载完成后取消waiting状态
              this.audio.waiting = false
		      this.audio.maxTime = parseInt(res.target.duration)
		    },
            //播放完成
            onAudioEnded(){
                this.audio.currentTime = 0
                this.sliderTime = 0
            },

	    },
	    filters: {
		    //将整数转化为时分秒
		    formatSecond(second=0){
		        return realFormatSecond(second)
		    }
	    },
	    created(){
	    }
    }
</script>

<style lang="less">
	@media only screen and (max-width: 321px) {
		.mu-flexbox .mu-flexbox-item{
			width:28% !important;
		}
		.audio-inner .time{
			font-size:0.9rem !important;
			color: #0069FF !important;
		}

	}
    .audio-inner{
		width:99%;
		height:89%;
	    margin:auto;
	    padding-right:0.5rem;
	    font-size:1.4rem;
		background-color:#fff;
		border: 0 solid #F0F0F0;
		box-shadow: 0 0 8px 2px rgba(0,0,0,.1);
	    -webkit-border-radius:.4rem;
	    border-radius:.9rem;
	    .mu-focus-ripple-wrapper,.mu-focus-ripple{
		    background:none;
	    }
	    .mu-slider{
		    margin-bottom: 0;
	    }
	    .mu-slider-fill{
			background-color: #95c7ff;
			opacity:0;
	    }
	    .mu-slider-track{
			// background-color: #fff;
			top:45%;
			height:0.5rem;
			border-radius: 0.4rem;
			background: -webkit-linear-gradient(left, #0067FF , #17DDFF);
			background: linear-gradient(to right, #0067FF , #17DDFF); 
			background: -o-linear-gradient(right, #0067FF, #17DDFF);
	    }
	    body{
		    background-color: red;
	    }
	    .mu-flexbox-item:first-child{
		    max-width: 2.8rem;
	    }
	    .mu-flexbox-item:nth-child(2){
		    margin-left: 0.83rem !important;
	    }
	    .mu-flexbox-item:nth-child(3){
		    margin-left: 0.83rem !important;
	    }
	    .btn-status{
		    width:4rem;
		    height:4rem;
		    margin-top: 0.8rem;
		    // font-size:1.2rem;
		    color: #fff;
		    border:0;
		    // border-radius: 50%;
		    outline: 0;
		    background:url(../audioImg/pause1.png) no-repeat 50% 42%;
		    -webkit-background-size: 55%;
		    background-size: 55%;
		    &.btn-pause{
			    background:url(../audioImg/play1.png) no-repeat 50% 42%;
			    -webkit-background-size: 55%;
			    background-size: 55%;
		    }
	    }
	    .mu-slider-thumb{
			// border:1px solid #bdbdbd;
			width:2.1rem;
			height:2.1rem;
			// margin-top:0.1rem;
			background:url(../audioImg/movebtn.png) no-repeat !important;
			background-size: 100% 100% !important;
		}
	    .mu-slider.disabled .mu-slider-thumb, .mu-slider.zero .mu-slider-thumb{
			border:0px solid #bdbdbd;
			color:rgba(0,0,0,0);
		}
	    // .progress{
		//     margin-top:18px;
	    // }
	    .time{
		    max-width:8.5rem;
		    font-size:1.34rem;
			color: #0069FF;
		}
		.loading{
			// width: 100%;
			padding-left:45%;
			height: 5rem;
			line-height: 7rem;
		}
		.loading img{
			width:25px;
			height:25px;
			margin: 0 auto;
		}
    }
</style>