// pages/account/account.js
const Api = require('../../utils/api.js')
Page({
  data: {
    userInfo: {
      username: '',
      student_id: '',
      college: '',
      major: '',
      grade: '',
      email: '',
      phone: '',
      role: 'student'
    }
  },

  onLoad: function(options) {
    this.loadUserInfo();
  },

  onShow: function() {
    // 页面显示时刷新用户信息
    this.loadUserInfo();
  },

  // 加载用户信息
  loadUserInfo: function() {
    // 从缓存或服务器获取用户信息
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({
        userInfo: {...this.data.userInfo, ...userInfo}
      });
    }else{
      Api.getUserProfile({
        'user_id': wx.getStorageSync('user_id')
      }).then(
        data => {
          this.setData({
            userInfo: data.data
          });
          wx.setStorageSync('userInfo', data.data);
          console.log(data.data);
        }
      )
    }
  },

  // 退出登录
  onLogout: function() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          // 清除登录状态
          wx.removeStorageSync('token');
          wx.removeStorageSync('user_id');
          wx.removeStorageSync('userInfo')
          
          // 跳转到登录页面
          wx.reLaunch({
            url: '/pages/login/login'
          });
        }
      }
    });
  },

  // 获取用户信息（如果需要微信授权）
  onGetUserInfo: function(e) {
    if (e.detail.userInfo) {
      // 用户同意授权
      const userInfo = e.detail.userInfo;
      this.setData({
        'userInfo.avatarUrl': userInfo.avatarUrl,
        'userInfo.nickName': userInfo.nickName
      });
      
      // 保存到缓存
      wx.setStorageSync('userInfo', this.data.userInfo);
    } else {
      // 用户拒绝授权
      wx.showToast({
        title: '授权失败',
        icon: 'none'
      });
    }
  }
});