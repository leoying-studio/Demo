// components/article-item/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
     data: {
       type: String,
       value: {
         title: "",
         body:{},
         footer: {}
       }
     }
  },
  "options": {
    "multipleSlots": true
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
