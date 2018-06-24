<template>
	<section class="box">
		<div class="head">
			head
		</div>
		<div class="content">
			<div class="left"  ref="left">
				<ul>
					<li v-for="(item,index) in left" :class="{current:currentIndex ==index}" @click="selectItem(index,$event)">
						<span class="left-item">{{item}}</span>
						<!-- <span>{{index}}</span>
						<span>{{currentIndex}}</span> -->
					</li>
				</ul>
			</div>
			<div class="right" ref="right">
				<ul>
					<li v-for="item in right" class="right-item right-item-hook" >
						<h2>{{item.name}}</h2>
						<ul>
							<li v-for="num in item.content">
								<div>{{item.name+num}}</div>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
		<div class="foot">
			foot
		</div>
	</section>
</template>
<script>
import BetterScroll from 'better-scroll'
	export default{
		name:'BetterScroll',
		data(){
			return{
				left:['数学','语文','英语','物理','化学','其他'],
				right:[
					{
						name:'数学',
						content:['1','2','3','4','5','6','7']
					},
					{
						name:'语文',
						content:['3','4','5','6']
					},
					{
						name:'英语',
						content:['1','2','3','4','5','6','7']
					},
					{
						name:'物理',
						content:['5','6','7']
					},
					{
						name:'化学',
						content:['4','5','6','7']
					},
					{
						name:'其他',
						content:['3','4','5','6','7']
					}
				],
				listHeight:[],
				scrollY:0 ,//时时获取当前Y轴的高度
				clickEvent:false
			}
		},
		mounted(){
			this.$nextTick(() => {
				this._initScroll()
				this._getHeight()
			});
		},
		computed:{
			//计算属性
			currentIndex(){
				for(let i=0; i<this.listHeight.length; i++){
					let height = this.listHeight[i]
					let height2 = this.listHeight[i + 1]
					//当height2不存在的时候，或者落在height和height2之间的时候，直接返回当前索引
					//>=height,是因为一开始this.scrollY=0,height=0
					if( !height2 || (this.scrollY >= height && this.scrollY < height2)) {
						if(this.clickEvent){
							return i+1
						}else{
							return i;
						}
					}
				}
				// 如果this.listHeight没有的话，就返回0;
				return 0
			}
		},
		methods:{
			_initScroll(){
				//better-scroll的实现原理是监听了touchStart,touchend事件，所以阻止了默认的事件(preventDefult),所以在这里做点击的话，需要
				//在初始化的时候传递属性click，派发一个点击事件
				//在pc网页浏览模式下，点击事件是不会阻止的所以可能会出现2次事件，所以为了避免2次，可以在绑定事件的时候把$event传递过去
				this.lefts = new BetterScroll(this.$refs.left,{
					click:true
				})
				this.rights = new BetterScroll(this.$refs.right,{
					probeType:3 //探针的效果，时时获取滚动高度
				})
				// rights这个对象监听事件，时时获取位置pos.y
				this.rights.on('scroll',(pos) => {
					this.scrollY = Math.abs(Math.round(pos.y))
				})
			},
			_getHeight(){
				let rightItems = this.$refs.right.getElementsByClassName('right-item-hook')
				let height=0;
				this.listHeight.push(height)
				for(let i=0; i<rightItems.length; i++){
					let item = rightItems[i]
					height+=item.clientHeight;
					this.listHeight.push(height)
				}
			},
			selectItem(index,event){
				this.clickEvent = true
				//在better-scroll的派发事件的event和普通浏览器的点击事件event有个属性区别_constructed
				// 浏览器原生点击事件没有_constructed所以当时浏览器监听到该属性的时候return掉
				if(!event._constructed){
					return
				}else{
					let rightItems = this.$refs.right.getElementsByClassName('right-item-hook')
					let el = rightItems[index]
					this.rights.scrollToElement(el,300)
				}
			}
		}
	}
</script>
<style>
	*{
		margin: 0;
		padding: 0;
	}
	ul{
		list-style: none;
	}
	.head {
		width:100%;
		height:100px;
		border:1px solid red;
		box-sizing: border-box;
		text-align: center;
		line-height: 100px;
	} 
	.content{
		display:flex;
		position:absolute;
		top:100px;
		bottom:100px;
		width:100%;
		overflow:hidden;
		background:#eee;
	}
	.left{
		flex:0 0 80px;
		width:80px;
		background:#f3f5f7;
	}
	.left li {
		width:100%;
		height:100%;
	}
	.current{
		background:red;
	}
	.left-item{
		display:block;
		width:100%;
		height:100px;
		line-height: 50px;
		text-align: center;
		border-bottom:1px solid yellow;
	}
	.right{
		flex:1;
	}
	.right-item li{
		width:100%;
		height:100px;
		line-height: 100px;
		text-align: center;
		border-bottom:1px solid yellow;
	}
	.foot{
		position:fixed;
		bottom:0;
		height:100px;
		width:100%;
		border:1px solid yellow;
		text-align:center;
		line-height: 100px;
	}
</style>