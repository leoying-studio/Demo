<template>
	<div class="scroll-container">
		<div class="inner"> 
		 	<slot></slot>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
	// import axios from 'axios';
	export default {
		props: {
			// 是否显示滚动条
			scrollbar: {
				type: Boolean,
				default: false
			},
			pullDown: {
				type: [Function]
			},
			pullUpload: {
				type: [Function],
			},
			onScroll: {
				type: [Function, Boolean],
				default: false
			},
			request: {
				type: [Object, Boolean],
				default: false
			}
		},
		data() {
			return {

			};
		},
		methods: {
		},
		mounted() {
			this.scroll = new BScroll(this.$el, {
				fade: true,
				scrollbar: this.scrollbar,
				pullDownRefresh: {
					threshold: 50,
					stop: 0 
				},
				pullUpLoad: {
					threshold: 100
				},
				probeType: 4
			});
			if (this.pullDown && this.request) {
				this.scroll.on('pullingDown', this.pullDown);
			}
			if (this.pullUpload && this.request) {
				this.scroll.on('pullingDown', this.pullUpload);
			}
			if (this.onScroll) {
				this.scroll.on('scroll', this.onScroll);
			}
		}
	}
</script>

<style>
	.scroll-container {
		height: 100vh;
		overflow-y: scroll;
	}
</style>
