<template>
	<section slass= "contnetstk-box">
		<div class="container">
			<section class="aui-grid aui-margin-t-15">
				<div class="aui-row">
					<div class="aui-col-xs-4 img-box" v-for=" (imgsrc,index) in imgcontent">
						<i class="aui-iconfont aui-note" @click="dete(index)"></i>
						<img :src="imgsrc" @click="tuplock(index)">
					</div>
					<div class="aui-col-xs-4 img-box img-picread" v-if="picnum">
						<div class="icon-img">
							<img src="../../static/img/Rectangle3@2x.png" >
						</div>
						<div class="aui-grid-label" ref="divGenres">
							<input type="file" name="file" id="file" value="" accept="image/*" multiple @change="imgChange();" />
						</div>
					</div>
				</div>
			</section>
		</div>
		<Star :size = '48' :score="3.8"></Star>
	</section>
</template>
<script>
	import Star from './Score.vue'
	var OSS={
		Wrapper:function(){
			
		}
	}
	var client = new OSS.Wrapper({
		region: '',
		accessKeyId: '',
		accessKeySecret: '',
		bucket: ''
	});

	export default{
		components:{
			Star
		},
		name:'Upload',
		data(){
			return {
				imgcontent:[],
				picnum:true,
				reast:'',
				picUrl:'develop',
				anzhuoid:0,
				bpic:[],//图片放大的数组
				urltype:[] //删除操作的url
			}
		},
		created(){
			console.log(111111111)
		},
		methods:{
			dete(index){
				// 可以做一些提示信息
				this.imgcontent.splice(index,1);
				this.urltype.splice(index,1);
				this.bpic.splice(index,1);
			},
			tuplock(index){
				// 调用钉钉api
				dd.biz.util.previewImage({
					urls: _this.bpic, //图片地址列表
					current: _this.bpic[index], //当前显示的图片链接
					onSuccess: function(result) {
						/**/
					},
					onFail: function(err) {}
				})
			},
			imgChange(e){
				var f= document.getElementById('file').files[0]
				let typePic = f.type
				var u = navigator.userAgent;
				if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
					let lit = typePic.replace("image/","");
					if(lit != "JPEG" && lit != "jpeg" && lit != "PNG" && lit != "png" && lit != "jpg" && lit != "JPG" && lit != "gif" && lit != "GIF"){alert('上传图片类型有误')}
				}
				if(this.imgcontent.length >= 8){
					this.picnum = false;alert('最多只能上传9张图片')
				}
				var file = document.getElementById("file")		// 获取点击的文本框
				let fileList = file.files;// 获取图片文件
				if(fileList.length>1){
					alert("暂不支持多张图片上传")
					return;
				}else{
					for(var i = 0; i < fileList.length; i++) {// 遍历获取到的图片
						var imgUrl = window.URL.createObjectURL(file.files[i]);
						this.imgcontent.push(imgUrl);
						var suffix = typePic.substr(typePic.indexOf('.'));
						// 生成文件名
						var obj = this.anzhuoid++;
						var storeAs = this.picUrl+""+obj+suffix //生成命名空间
						client.multipartUpload(storeAs,fileList[i]).then( (result) => {
							let resultre = result.name.replace(this.picUrl+'','');
							let typeimg = result.name.slice(-3);
							(typeimg == 'jpg') ? typeimg = "0" : typeimg = "1";
							let urlupdat = '{"fileId":"' + resultre + '","fileType":' + typeimg + '}';
							let bigdat = 'http://***********/'+this.picUrl+'/' + resultre + '?x-oss-process=image/resize,m_lfit,h_950,w_950'
						}).catch( (err) => {})
						if (i==8) {
							this.picnum = false;
						}
					}
			    }
			}
		}
	}
</script>
<style>
	.aui-col-xs-4 {
			height: 5.5rem;
		}
		
		.aui-iconfont {
			position: absolute;
			z-index: 999;
			top: 0rem;
			right: 0px;
			display: inline-block;
			height: 1rem;
			width: 1rem;
			font-size: 0.7rem;
			line-height: 1rem;
		}
		
		.aui-note {
			display: inline-block;
			background-image: url("data:image/png;base64,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");
			background-size: 1rem;
			background-position: bottom;
			background-repeat: no-repeat;
		}
		
		.wanig {
			color: #717F8C;
			font-size: 0.75rem;
			text-align: left;
			/*padding: 0 0.75rem;*/
		}
		
		.wanig img {
			display: inline-block;
			width: 1.2rem;
			vertical-align: sub;
		}
		
		.wanig span {
			margin-right: 0.8rem;
			text-align: left;
		}
		.chiltype{
			margin-left: 1rem;
		}
		.inpu-text {
			width: 100%;
			height: 7.5rem;
			margin-top: 1rem;
			border: 1px solid rgba(218, 218, 218, 0.42);
			border-right: none;
			border-left: none;
			padding: 0 0.75rem;
		}
		
		.container {
			width: 100%;
			height: 100%;
			overflow: auto;
			clear: both;
		}
		
		.aui-content-padded {
			padding: 0rem;
			background-color: #ffffff;
			margin-top: 0.75rem;
			text-align: left
		}
		
		.aui-btn-success {
			color: #ffffff;
			background-color: #35ABFD;
			height: 2.2rem;
			border-radius: 0px;
			position: fixed;
			bottom: 0;
			z-index: 1100;
		}
		
		.aui-checkbox {
			border-radius: 50%;
			width: 1rem;
			height: 1rem;
		}
		
		#file {
			height: 100%;
			width: 100%;
			top: 0;
		}
		
		.img-picread .icon-img img {
			width: 2.2rem;
			height: 2.2rem;
			margin: 1.65rem 0;
			display: inline-block;
		}
		
		.aui-grid-label input[type="file"] {
			opacity: 0;
		}
		
		.aui-grid [class*=aui-col-] {
			display: table-cell;
			position: relative;
			text-align: center;
			vertical-align: middle;
			padding: 0.2rem;
			height: 5.5rem;
		}
		.aui-grid{
			padding: 0 0.75rem;
		}
		.img-box img {
			object-fit: cover;
			width: 100%;
			height: 100%;
			position:absolute;
			top:0;
		}
		
		#footer .aui-bar-tab-item .iconfont {
			font-size: 0.75rem;
		}
		
		.img-box {
			height: 5.5rem;
			border: 1px solid #E7E7E7;
			box-sizing: border-box;
			overflow: hidden;
		}
		
		.icon-img {
			position: absolute;
			font-size: 2.4rem;
			/* line-height: 2.4rem; */
			/* height: auto; */
			z-index: 0;
			width: 100%;
			height: 5.5rem;
			left: 0;
			top: 0;
			/* background: #0c9; */
		}
		
		.aui-grid .aui-grid-label {
			display: block;
			font-size: 0.7rem;
			position: relative;
			margin-top: 0.25rem;
			overflow: hidden;
			height: 5.5rem;
		}
		
		.contnetstk-box {
			margin-bottom: 2.2rem;
		}
			@-webkit-keyframes gogogo {
	    0%{
	        
	        -webkit-transform: rotate(0deg);
	       
	    }
	    50%{
	        -webkit-transform: rotate(180deg);
	      
	    }
	    100%{
	        -webkit-transform: rotate(360deg);
	    }
	}

	.loading{
	    width: 1.4rem;
	    height: 1.4rem;
	   -webkit-animation:gogogo 2s infinite linear ;
	    display: inline-block;
		margin: 5rem auto;
		position: fixed;
		z-index: 99999;
		top: 25%;
	}
	.mengban{
		position: fixed;
		left: 0;
		right: 0;
		top:0;
		bottom: 0;
		z-index: 9998;
		background: rgba(0, 0, 0, 0.5);
	}
</style>