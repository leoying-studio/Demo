// components/tab-item/tab-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {},
  relations: {
      "./../tabs": {
         type: "parent",
         linked: function (target) {
           // 每次被插入到custom-ul时执行，target是custom-ul节点实例对象，触发在attached生命周期之后
           alert();
         },
         linkChanged: function (target) {
           // 每次被移动后执行，target是custom-ul节点实例对象，触发在moved生命周期之后
         },
         unlinked: function (target) {
           // 每次被移除时执行，target是custom-ul节点实例对象，触发在detached生命周期之后
         }
      }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
