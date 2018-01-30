// components/tabs/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {},
  relations: {
     './../tab-item': {
       type: "child",
       linked: function (target) {
         // 每次有custom-li被插入时执行，target是该节点实例对象，触发在该节点attached生命周期之后
        
       },
       linkChanged: function (target) {
         // 每次有custom-li被移动后执行，target是该节点实例对象，触发在该节点moved生命周期之后
       },
       unlinked: function (target) {
         // 每次有custom-li被移除时执行，target是该节点实例对象，触发在该节点detached生命周期之后
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
