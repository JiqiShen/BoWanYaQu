// pages/register/register.js
const Api = require('../../utils/api.js');
Page({
  data: {
    username: '',
    studentId: '',
    password: '',
    confirmPassword: '',
    email: '',
    phone: '',
    college: '',
    major: '',
    grade: '',
    role: ''
  },

  onLoad: function (options) {
    // 页面加载时的逻辑
  },

  onUsernameInput: function(e) {
    this.setData({
      username: e.detail.value
    });
  },

  onStudentIdInput: function(e) {
    this.setData({
      studentId: e.detail.value
    });
  },

  onEmailInput: function(e) {
    this.setData({
      email: e.detail.value
    });
  },

  onCollegeInput: function(e) {
    this.setData({
      college: e.detail.value
    });
  },

  onMajorInput: function(e) {
    this.setData({
      major: e.detail.value
    });
  },

  onGradeInput: function(e) {
    this.setData({
      grade: e.detail.value
    });
  },

  onPhoneInput: function(e) {
    this.setData({
      phone: e.detail.value
    });
  },

  selectRole: function(e) {
    const selectedValue = e.currentTarget.dataset.value;
    this.setData({
      role: selectedValue
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
    const { username, studentId, password, confirmPassword, email, college, major, grade, role, phone } = this.data;
    
    // 表单验证
    if (!username) {
      wx.showToast({
        title: '请输入用户名',
        icon: 'none'
      });
      return;
    }

    if (!studentId) {
      wx.showToast({
        title: '请输入学号',
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
    
    // 模拟注册请求
    wx.showLoading({
      title: '注册中...',
    });
    
    setTimeout(() => {
      wx.hideLoading();
      console.log(role);
      Api.register({
        "username": username,
        "student_id": studentId,
        "password": password,
        "email": email,
        "college": college,
        "major": major,
        "grade": grade,
        "role": role,
        "phone": phone
      }).then(
        data => {
          if (data.code === 200){
            wx.showToast({
              title: '注册成功',
              icon: 'success'
            });
            wx.setStorageSync('token', data.data.token);
            wx.setStorageSync('user_id', data.data.user_id);
            // 注册成功后跳转到登录页面
            setTimeout(() => {
              wx.navigateBack();
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

  goToLogin: function() {
    wx.navigateBack();
  },

  // 切换密码可见性
  togglePasswordVisibility: function() {
    this.setData({
      showPassword: !this.data.showPassword
    });
  },
});