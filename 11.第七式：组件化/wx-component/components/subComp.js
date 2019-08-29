Component({
  data: {
    message: 'sub component'
  },
  relations: {
    './comp': {
      type: 'parent',
      linked: function (target) {
        console.log('subComp linked', target)
      },
      unlinked: function (target) {
        console.log('subComp unlinked', target)
      }
    }
  }
})
