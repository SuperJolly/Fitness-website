<template>
	<div class="admin-panel">
		<div class="text-center">请<a href="javascript:void(0)" @click="handleClick">登录</a>您的管理员账户！</div>
		<admin-login-Dialog :openCus="openCus"/>
	</div>
</template>
<script>
	import adminLoginDialog from './custom/adminLoginDialog'
	export default {
		data() {
			return {
				openCus: false
			}
		},
		methods: {
			handleClick() {
				this.openCus = true
			}
		},
		components: {
			adminLoginDialog
		}
	}
</script>
<style lang="less">
	.admin-panel {
	    width: 500px;
	    position: absolute;
	    height: 100px;
	    top: 50%;
	    left: 50%;
	    transform: translate(-50%, -50%);
	    background: #000;
	    opacity: .66;
	    border-radius: 10px;
	    padding: 32px 40px;
	    .text-center {
	    	text-align: center;
	    	color: #fff;
	    	font-size: 18px;
	    	line-height: 36px;
	    }
	}
</style>