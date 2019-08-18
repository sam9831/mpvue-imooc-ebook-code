Page({
  data: {
    genderItems: [
      { name: '男', value: 1, checked: true },
      { name: '女', value: 2 },
    ],
    formData: {
      gender: '1'
    },
    rules: [
      {
        name: 'mobile',
        rules: [
          { required: true, message: '手机号必须填写' }, 
          { mobile: true, message: '请填写正确的手机号' }
        ]
      },
      {
        name: 'vcode',
        rules: [
          { maxlength: 6, param: 6, message: '验证码最大长度为6位' },
          { minlength: 4, param: 4, message: '验证码最小长度为4位' }
        ]
      },
      { name: 'name', rules: { required: true, message: '姓名必须填写' } },
      { name: 'idcard', rules: { 
        validator: function(rule, value, param, models) {
          console.log(rule, value, param, models)
          const { idcard } = models
          let message = null
          if (!/^[1-9][0-9]{16}[0-9X]$/.test(idcard)) {
            message = '身份证格式不正确'
          } 
          return message
        }
      }}
    ],
    error: '',
    tipType: 'error'
  },
  getVerifyCode() {
    const { mobile } = this.data.formData
    this.setData({
      error: `向${mobile}发送验证码成功`,
      tipType: 'success'
    })
  },
  formChange(e) {
    console.log('input change...', e)
    const { field } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },
  submit(e) {
    this.selectComponent('#userForm').validate((valid, errors) => {
      console.log('valid', valid, errors)
      if (!valid) {
        this.setData({
          error: errors[0].message,
          tipType: 'error'
        })
      }
    })
  },
  onFormSuccess(e) {
    console.log('form success...', e, this.data.formData)
  },
  onFormFail(e) {
    console.log('form fail...', e, this.data.formData)
  }
})