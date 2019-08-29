const behavior = require('./behavior')
const behavior2 = require('./behavior2')
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  behaviors:[behavior, behavior2],
  methods: {
    onTap() {
      this.triggerEvent('myEvent', { a: 1 })
    }
  },
  relations: {
    './subComp': {
      type: 'child',
      linked: function(target) { 
        console.log('comp linked', target) 
      },
      unlinked: function(target) {
        console.log('comp unlinked', target) 
      }
    }
  }
})
