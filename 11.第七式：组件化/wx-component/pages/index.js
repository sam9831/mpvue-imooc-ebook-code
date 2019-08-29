Page({
  data: {
    show: true,
    message: 'data message'
  },
  changeFromPage(par) {
    console.log('change from page', par)
  },
  onReady() {
    setTimeout(() => {
      this.setData({ show: false})
    }, 1000)
  },
  onLoad() {
    console.log('onLoad')
  },
  onShow() {
    console.log('onShow')
  },
  onReady() {
    console.log('onReady')
  }
})