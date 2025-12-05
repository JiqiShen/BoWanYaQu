// pages/register/register.js
Page({
  data: {
    username: '',
    password: '',
    confirmPassword: '',
    existingUsernames: ['admin', 'test', 'user123', 'demo'] // 假设已存在的用户名列表，实际运行需调用后端接口
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

  onConfirmPasswordInput: function(e) {
    this.setData({
      confirmPassword: e.detail.value
    });
  },

  handleRegister: function() {
    const { username, password, confirmPassword, existingUsernames } = this.data;
    
    // 表单验证
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
    
    if (password !== confirmPassword) {
      wx.showToast({
        title: '两次密码不一致',
        icon: 'none'
      });
      return;
    }
    
    // 检查用户名是否已存在
    if (existingUsernames.includes(username)) {
      wx.showToast({
        title: '用户名已存在',
        icon: 'none'
      });
      return;
    }
    
    // 模拟注册请求
    wx.showLoading({
      title: '注册中...',
    });
    
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '注册成功',
        icon: 'success'
      });
      
      // 将新用户名添加到已存在列表（模拟过程）
      existingUsernames.push(username);
      
      // 注册成功后跳转到登录页面
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    }, 2000);
  },

  goToLogin: function() {
    wx.navigateBack();
  }
});