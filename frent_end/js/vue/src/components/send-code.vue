<template>
    <div class="send-wrapper">
		  <own-input></own-input>
		  <div class="send-box">
			   <own-input :border="false"></own-input>
			   <div class = "code-btn">发送验证码</div>
		  </div>
	</div>
</template>

<script>
	import Button from "./button";
	import Input from "./input";
	export default {
		components: {
			"own-input": Input
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		mounted() {
			
		}
	}
</script>

<style lang="scss">
    .send-wrapper {
		.send-box {
			height: .4rem;
			display: flex;
			border-radius: 10px;
			border:  solid #e4e4e4 1px;
			margin-top:.1rem;
			&>:first-child {
				flex: 1;
			}
			.code-btn {
				width: 1.05rem;
				height: .4rem;
				line-height: .4rem;
				text-align: center;
				font-size: 14px;
				border-left: solid 1px #e4e4e4;
				color:#64a6fd;
			}
		}	
	}
</style>

