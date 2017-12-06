<template>
     <div class="btn-wrapper">
		  <button :class = "{'primary':type == 'primary','default':type == 'default'}">按钮</button>
	 </div>
</template>
<script>
	export default {
		props: {
			text: {
				default:"按钮",
				type:String
			},
			type: {
				default:"default",
				type:String
			}
		},
		data() {
			return {

			};
		}
	}
</script>
<style lang="scss">
   .btn-wrapper {
	   button {
		   width: 100%;
		   min-width: .5rem;
		   height: 100%;
		   min-height: .4rem;
		   min-width: .5rem;
		   border:none;
		   outline:none;
		   color:#fff;
		   border-radius: 10px;
		   box-shadow: 0 0 1px 1px #e4e4e4;
	   }
	   .primary {
		   background:	#0066FF ;
	   }
	   .default {
		   background: #fff;
		   color:black;
	   }
   }
</style>
