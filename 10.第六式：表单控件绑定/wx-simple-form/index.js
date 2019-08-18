Page({
  register(e) {
    const { username, password, confirmPassword } = e.detail.value
    console.log('表单信息: ', username, password, confirmPassword)
  }
})