// pages/login/login.js
const Api = require('../../utils/api.js');
const { PAGE_PATH } = require('../../utils/constants.js');
Page({
  data: {
    username: '',
    password: ''
  },

  onLoad: function (options) {
    // 页面加载时的逻辑
  },

  onUsernameInput: function(e) {
    this.setData({
      username: e.detail.value
    });
  },

  onPasswordInput: function(e) {
    this.setData({
      password: e.detail.value
    });
  },

  handleLogin: function() {
    const { username, password } = this.data;
    
    // 简单验证
    if (!username) {
      wx.showToast({
        title: '请输入用户名',
        icon: 'none'
      });
      return;
    }
    
    if (!password) {
      wx.showToast({
        title: '请输入密码',
        icon: 'none'
      });
      return;
    }
    
    // 登录请求
    wx.showLoading({
      title: '登录中...',
    });
    
    setTimeout(() => {
      wx.hideLoading();
      Api.login({
        "username": username,
        "password": password
      }).then(
        data => {
          if (data.code === 200){
            wx.showToast({
              title: '登录成功',
              icon: 'success'
            });
            wx.setStorageSync('token', data.data.token);
            wx.setStorageSync('user_id', data.data.user_id);
            setTimeout(() => {
              wx.switchTab({
                url: PAGE_PATH.INDEX,
              });
            }, 1500);
          }
    
          // 处理错误（400状态码）
          else if (data.code === 400) {
            wx.showToast({
              title: data.message,
              icon: 'none',
              duration: 2000
            });
            
            // 可以添加清空密码框的逻辑
            this.setData({ password: '' });
          }
          // 处理其他错误情况
          else {
            wx.showToast({
              title: '注册失败，请重试',
              icon: 'none',
              duration: 2000
            });
          }
        }
      );
    }, 2000);
  },

  goToRegister: function() {
    wx.navigateTo({
      url: PAGE_PATH.REGISTER,
    });
  },

  // 切换密码可见性
  togglePasswordVisibility: function() {
    this.setData({
      showPassword: !this.data.showPassword
    });
  },
});