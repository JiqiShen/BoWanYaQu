// pages/login/login.js
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
      // 这里应该是实际的登录API调用
      wx.showToast({
        title: '登录成功',
        icon: 'success'
      });
      
      // 登录成功后跳转到首页
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/index/index',
        });
      }, 1500);
    }, 2000);
  },

  goToRegister: function() {
    wx.navigateTo({
      url: '/pages/register/register',
    });
  }
});