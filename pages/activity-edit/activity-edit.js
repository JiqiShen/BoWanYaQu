// pages/publish-activity/publish-activity.js
Page({
  data: {
    userClub: "", // 用户所属社团
    startDate: "", // 开始日期
    startTime: "", // 开始时间
    endDate: "",   // 结束日期
    endTime: ""    // 结束时间
  },

  onLoad: function(options) {
    // 页面加载时获取用户所属社团
    this.getUserClub();
    
    // 设置默认时间为当前时间
    const now = new Date();
    const defaultStartDate = this.formatDate(now);
    const defaultStartTime = this.formatTime(now);
    
    // 设置默认结束时间为1小时后
    const endTime = new Date(now.getTime() + 60 * 60 * 1000);
    const defaultEndDate = this.formatDate(endTime);
    const defaultEndTime = this.formatTime(endTime);
    
    this.setData({
      startDate: defaultStartDate,
      startTime: defaultStartTime,
      endDate: defaultEndDate,
      endTime: defaultEndTime
    });
  },

  // 获取用户所属社团
  getUserClub: function() {
    // 这里应从API获取用户社团信息，此处为模拟
    const that = this;
    wx.request({
      url: 'https://your-api-domain.com/api/getUserClub', // 替换为实际API地址
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + wx.getStorageSync('token') // 如果有登录验证
      },
      success: function(res) {
        if (res.data.success) {
          that.setData({
            userClub: res.data.club
          });
        } else {
          // 获取失败，使用默认值
          that.setData({
            userClub: "未指定社团"
          });
        }
      },
      fail: function() {
        // 网络请求失败，使用默认值
        that.setData({
          userClub: "未指定社团"
        });
      }
    });
  },

  // 开始日期改变
  onStartDateChange: function(e) {
    this.setData({
      startDate: e.detail.value
    });
  },

  // 开始时间改变
  onStartTimeChange: function(e) {
    this.setData({
      startTime: e.detail.value
    });
  },

  // 结束日期改变
  onEndDateChange: function(e) {
    this.setData({
      endDate: e.detail.value
    });
  },

  // 结束时间改变
  onEndTimeChange: function(e) {
    this.setData({
      endTime: e.detail.value
    });
  },

  // 格式化日期为 YYYY-MM-DD
  formatDate: function(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  },

  // 格式化时间为 HH:mm
  formatTime: function(date) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  },

  // 格式化完整时间显示
  formatFullTime: function() {
    const { startDate, startTime, endDate, endTime } = this.data;
    
    // 将日期格式从 YYYY-MM-DD 转换为中文格式
    const formatChineseDate = (dateStr) => {
      const [year, month, day] = dateStr.split('-');
      return `${year}年${parseInt(month)}月${parseInt(day)}日`;
    };
    
    const chineseStartDate = formatChineseDate(startDate);
    const chineseEndDate = formatChineseDate(endDate);
    
    // 如果开始和结束日期相同，只显示一次日期
    if (startDate === endDate) {
      return `${chineseStartDate} ${startTime} - ${endTime}`;
    } else {
      return `${chineseStartDate} ${startTime} - ${chineseEndDate} ${endTime}`;
    }
  },

  // 表单提交事件
  onFormSubmit: function(e) {
    const formData = e.detail.value;
    
    // 验证表单数据
    if (!this.validateForm(formData)) {
      return;
    }

    // 处理标签数据（将字符串转换为数组）
    const tags = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    
    // 构建活动数据对象
    const activityData = {
      name: formData.name,
      time: this.formatFullTime(), // 使用格式化后的时间
      location: formData.location,
      tags: tags,
      detail: formData.detail,
      totalCount: parseInt(formData.totalCount),
      club: this.data.userClub, // 添加用户所属社团
      status: "未开始",
      registeredCount: 0,
      remainingCount: parseInt(formData.totalCount),
      isFollowed: false,
      isRegistered: false,
      // 保存原始时间数据，方便后端处理
      startDate: this.data.startDate,
      startTime: this.data.startTime,
      endDate: this.data.endDate,
      endTime: this.data.endTime
    };

    // 发布活动到后端
    this.publishActivity(activityData);
  },

  // 表单验证
  validateForm: function(formData) {
    if (!formData.name || formData.name.trim() === '') {
      wx.showToast({
        title: '请填写活动名称',
        icon: 'none'
      });
      return false;
    }
    
    // 验证时间是否完整
    if (!this.data.startDate || !this.data.startTime || !this.data.endDate || !this.data.endTime) {
      wx.showToast({
        title: '请完整选择活动时间',
        icon: 'none'
      });
      return false;
    }
    
    // 结束时间不能早于开始时间
    const startDateTime = new Date(`${this.data.startDate} ${this.data.startTime}`);
    const endDateTime = new Date(`${this.data.endDate} ${this.data.endTime}`);
    
    if (endDateTime <= startDateTime) {
      wx.showToast({
        title: '结束时间必须晚于开始时间',
        icon: 'none'
      });
      return false;
    }
    
    if (!formData.location || formData.location.trim() === '') {
      wx.showToast({
        title: '请填写活动地点',
        icon: 'none'
      });
      return false;
    }
    
    if (!formData.detail || formData.detail.trim() === '') {
      wx.showToast({
        title: '请填写活动详情',
        icon: 'none'
      });
      return false;
    }
    
    if (!formData.totalCount || formData.totalCount <= 0) {
      wx.showToast({
        title: '请填写正确的人数',
        icon: 'none'
      });
      return false;
    }
    
    return true;
  },

  // 发布活动到后端
  publishActivity: function(activityData) {
    const that = this;
    
    // 显示加载中提示
    wx.showLoading({
      title: '发布中...',
    });
    
    // 调用后端API发布活动
    wx.request({
      url: 'https://your-api-domain.com/api/publishActivity', // 替换为实际API地址
      method: 'POST',
      data: activityData,
      header: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + wx.getStorageSync('token') // 如果有登录验证
      },
      success: function(res) {
        wx.hideLoading();
        
        if (res.data.success) {
          wx.showToast({
            title: '发布成功',
            icon: 'success',
            duration: 2000,
            success: () => {
              // 发布成功后返回上一页
              setTimeout(() => {
                wx.navigateBack();
              }, 2000);
            }
          });
        } else {
          wx.showToast({
            title: res.data.message || '发布失败',
            icon: 'none',
            duration: 2000
          });
        }
      },
      fail: function() {
        wx.hideLoading();
        wx.showToast({
          title: '网络错误，请重试',
          icon: 'none',
          duration: 2000
        });
      }
    });
  },

  // AI快速填写入口
  onAIAssistTap: function() {
    // 这里跳转到AI快速填写页面，此处只预留入口
    wx.showToast({
      title: 'AI快速填写功能开发中',
      icon: 'none'
    });
  }
})