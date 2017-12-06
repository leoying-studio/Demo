<template>
    <div class="dialog-wrapper">
		 <slot name="content"></slot>
		 <slot name="footer">
		     <div class="footer">
				  <div></div>
  				  <div></div>
			 </div>	 
		 </slot>	 
	</div>
</template>

<script>
	export default {
		props: {
		
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
	 .dialog-wrapper {
		 position: absolute;
		 z-index: 9999;
		 left: 50%;
		 margin-left: 1.5rem;
		 width: 3rem;
		 height: 3rem;
		 box-shadow: 0 0 1px 1px #ccc;
		 .footer {
			 height: .3rem;
			 border-top: #e4e4e4 1px;
			 position: absolute;
			 bottom: 0;
		 }
	 }
</style>

