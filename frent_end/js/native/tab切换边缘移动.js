	moveTab(index) {
				let tabs = this.$el.querySelectorAll('.tab_bar-item');
				let active = tabs[index];
				let tabBar = this.$el.querySelector('.tab_bar');
				let scrollLeft = tabBar.scrollLeft, tabBarWidth = tabBar.offsetWidth, scrollWidth = tabBar.scrollWidth;
				if (index > 0 && index < this.tabs.length - 1) {
					let previous = tabs[index - 1];
					let next = tabs[index + 1];
					let leftGap = active.offsetLeft - previous.offsetLeft - previous.offsetWidth;
					let rightGap = next.offsetLeft - active.offsetLeft - active.offsetWidth;
					// 是否靠近右边缘
					let rightHandEdge = active.offsetLeft - scrollLeft + previous.offsetWidth + rightGap + active.offsetWidth >= tabBarWidth ? true : false;
					// console.log(active.offsetLeft - scrollLeft + previous.offsetWidth + rightGap, tabBarWidth);
					if (scrollLeft >= previous.offsetLeft) {
						let moveDistance = leftGap + previous.offsetWidth, currentDistance = 0;
						let timer = setInterval(() => {
							if (currentDistance >= moveDistance) {
								return clearInterval(timer);
							}
							tabBar.scrollLeft -= 1;
							currentDistance += 1;
						}, 8);
						// tabBar.scrollLeft -= leftGap + previous.offsetWidth;
						tabBar.scrollLeft = tabBar.scrollLeft < 0 ? 0 : tabBar.scrollLeft;
					} 
					if (rightHandEdge)	{
						let moveDistance = next.offsetWidth + rightGap, currentDistance = 0;
						let timer = setInterval(() => {
							if (currentDistance >= moveDistance) {
								return clearInterval(timer);
							}
							tabBar.scrollLeft += 1;
							currentDistance += 1;
						}, 5)
						// tabBar.scrollLeft += next.offsetWidth + rightGap;
						tabBar.scrollLeft = tabBar.scrollLeft > tabBar.scrollWidth ? tabBar.scrollWidth : tabBar.scrollLeft;
					}				
				}
			},