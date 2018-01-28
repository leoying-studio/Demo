<template>
    <div class="input-wrapper">
		  <input type="text" @input = "inputTransmit" 
		  		 v-model="value" class="input" 
				 :placeholder="placeholder" :class="{'border': border}">
	</div>
</template>

<script>
	export default {
		props: {
			type: {
				type: String,
				default: "text"
			},
			placeholder: {
				type: String,
				default: "请输入内容"
			},
			border: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				value: ""
			}
		},
		methods: {
			inputTransmit() {
				this.$emit('input', this.value);
			}
		}
	}
</script>

<style lang="scss">
    .input-wrapper {
		.input {
			width: 100%;
			height:100%;
			min-height: .4rem;
			box-sizing: border-box;	
			padding-left: .2rem;	
			font-size: 20px;
			border-radius: 6px;
			border: none;
			outline: none;
		}
		.border {
			border: solid #e4e4e4 1px;
		}
	}
</style>

