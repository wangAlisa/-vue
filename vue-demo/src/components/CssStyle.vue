<template>
	<span class="test">
		 This is some long text that will not fit in the box This is some long text that will not fit in the boxThis is some long text that will not fit in the box-orient This is some long text that will not fit in the box
	</span>
</template>
<script>
	export default {
		name:'CssStyle',
		data () {
			return {}
		}
	}
</script>
<style>
	.test{
		/*width:140px;*/
		overflow:hidden; 

		text-overflow:ellipsis;

		display:-webkit-box; 

		-webkit-box-orient:vertical;

		-webkit-line-clamp:2; 
	}
</style>