// pages/account/account.js
// account.js
Page({
  data: {
    userInfo: {
      nickName: '张三',
      avatarUrl: '',
      studentId: '2100012345',
      department: '信息科学技术学院',
      major: '计算机科学与技术',
      grade: '2021级',
      email: '2100012345@pku.edu.cn',
      phone: '138****5678',
      status: 'verified'
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
    }
  },

  // 编辑资料
  onEditProfile: function() {
    wx.navigateTo({
      url: '/pages/edit-profile/edit-profile'
    });
  },

  // 修改密码
  onChangePassword: function() {
    wx.navigateTo({
      url: '/pages/change-password/change-password'
    });
  },

  // 安全设置
  onSecuritySettings: function() {
    wx.navigateTo({
      url: '/pages/security-settings/security-settings'
    });
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
          wx.removeStorageSync('userInfo');
          
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