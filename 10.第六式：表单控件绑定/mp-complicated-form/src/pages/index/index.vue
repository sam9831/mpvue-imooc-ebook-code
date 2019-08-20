<template>
  <div>
    <mp-form id="userForm" :rules="rules" :models="formData" @success="onFormSuccess" @fail="onFormFail" ref="userForm">
      <mp-cells title="注册账号" footer="请填写您的手机号和验证码完成注册">
        <mp-cell show-error prop="mobile" title="手机号" ext-class="weui-cell_vcode">
          <input type="number" @input="formChange" data-field="mobile" class="weui-input" placeholder="请输入手机号"/>
          <view slot="footer" class="weui-vcode-btn" @click="getVerifyCode">获取验证码</view>
        </mp-cell>
        <mp-cell show-error prop="vcode" title="验证码" ext-class="weui-cell">
          <input type="number" @input="formChange" data-field="vcode" class="weui-input" placeholder="请输入验证码"/>
        </mp-cell>
      </mp-cells>

      <mp-cells title="个人信息" footer="请填写您的基本信息">
        <mp-cell show-error prop="name" title="姓名" ext-class="weui-cell">
          <input class="weui-input" @input="formChange" data-field="name" placeholder="请输入姓名"/>
        </mp-cell>
        <mp-cell show-error prop="gender" title="性别" ext-class="weui-cell">
          <radio-group class="radio-group" bindchange="formChange" data-field="gender">
            <label class="radio" v-for="item in genderItems" style="margin-right: 10px;" :key="item.value">
              <radio :value="item.value" :checked="item.checked"/>
              {{item.name}}
            </label>
          </radio-group>
        </mp-cell>
        <mp-cell show-error prop="birthday" title="生日" ext-class="weui-cell">
          <picker mode="date" start="1900-01-01" end="2019-09-01" bindchange="formChange" data-field="birthday">
            <view class="weui-input">{{formData.birthday}}</view>
          </picker>
        </mp-cell>
        <mp-cell show-error prop="idcard" title="身份证" ext-class="weui-cell">
          <input type="idcard" @input="formChange" data-field="idcard" class="weui-input" placeholder="请输入身份证号"/>
        </mp-cell>
      </mp-cells>
      <view class="weui-btn-area">
        <button class="weui-btn" type="primary" @click="submit">确定</button>
      </view>
    </mp-form>
    <mp-toptips :msg="error" :type="tipType" :show="error"></mp-toptips>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        genderItems: [
          { name: '男', value: 1, checked: true },
          { name: '女', value: 2 }
        ], // 性别枚举值
        formData: {
          gender: '1'
        }, // 表单数据，默认时绑定了性别，因为这个选项有默认值
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
          {
            name: 'idcard',
            rules: {
              validator: function (rule, value, param, models) {
                console.log('validator', rule, value, param, models)
                const { idcard } = models
                let message = null
                if (!/^[1-9][0-9]{16}[0-9X]$/.test(idcard)) {
                  message = '身份证格式不正确'
                }
                return message
              }
            }
          }
        ], // 设定了校验规则
        error: '', // mp-toptips 组件的提示文案
        tipType: 'error' // mp-toptips 组件的显示类型
      }
    },
    methods: {
      getVerifyCode () {
        const { mobile } = this.formData
        this.error = `向${mobile}发送验证码成功`
        this.tipType = 'success'
      },
      formChange ({ mp }) {
        const { field } = mp.currentTarget.dataset
        this.$set(this.formData, field, mp.detail.value)
      },
      submit (e) {
        // 手动提交表单校验
        this.$mp.page.selectComponent('#userForm').validate((valid, errors) => {
          console.log('valid', valid, errors)
          if (!valid) {
            this.error = errors[0].message
            this.tipType = 'error'
          } else {
            mpvue.showToast({
              title: '表单提交成功！'
            })
          }
        })
      },
      // 表单校验成功时触发事件
      onFormSuccess (e) {
        console.log('form success...', e, this.formData)
      },
      // 表单校验失败时触发事件
      onFormFail (e) {
        console.log('form fail...', e, this.formData)
      }
    }
  }
</script>
