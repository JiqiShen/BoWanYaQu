// pages/publish-activity/publish-activity.js
const Api = require('../../utils/api.js');
const TimeUtil = require('../../utils/time.js');
Page({
  data: {
    userClub: 1, // 用户所属社团
    startDate: "", // 开始日期
    startTime: "", // 开始时间
    endDate: "",   // 结束日期
    endTime: "",    // 结束时间
    name: "",
    location: "",
    tags: "",
    description: "",
    max_participants: ""
  },

  onLoad: function(options) {
    // 页面加载时获取用户所属社团
    //this.getUserClub();
    
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
      title: formData.name,
      time: this.formatFullTime(), // 使用格式化后的时间
      location: formData.location,
      tags: tags,
      description: formData.detail,
      max_participants: parseInt(formData.totalCount),
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
      endTime: this.data.endTime,
      start_time: this.data.startDate + 'T' + this.data.startTime + ':00Z',
      end_time: this.data.endDate + 'T' + this.data.endTime + ':00Z',
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
    
    Api.createActivity(activityData);

    wx.showToast({
      title: '发布成功',
      icon: 'success'
    });
  },

  // 点击AI按钮
  onAIAssistTap() {
    this.setData({
      showAISection: !this.data.showAISection
    });
  },
  
  // 关闭输入框
  onCloseAISection() {
    this.setData({
      showAISection: false,
      aiInputText: ''
    });
  },
  
  // 输入框内容变化
  onAIInput(e) {
    this.setData({
      aiInputText: e.detail.value
    });
  },
  
  // 提交生成
  onAISubmit() {
    const text = this.data.aiInputText.trim();
    if (!text) {
      wx.showToast({
        title: '请输入内容',
        icon: 'none'
      });
      return;
    }
    
    // 这里调用AI接口
    this.generateContent(text);
  },
  
  // AI生成内容（示例）
  generateContent(prompt) {
    wx.showLoading({
      title: 'AI生成中...',
    });
    
    // 模拟API调用
    setTimeout(() => {
      wx.hideLoading();
      Api.extractActivity({
        'article_url': prompt
      }).then(
        data => {
          console.log(data);
          this.setData({
            name: data.data.activity_info.activity_name,
            location: data.data.activity_info.location,
            description: data.data.activity_info.description,
            tags: data.data.activity_info.tags,
            startDate: TimeUtil.formatDate(data.data.activity_info.start_time, 'YYYY-MM-DD'),
            startTime: TimeUtil.formatDate(data.data.activity_info.start_time, 'HH:mm'),
            endDate: TimeUtil.formatDate(data.data.activity_info.end_time, 'YYYY-MM-DD'),
            endTime: TimeUtil.formatDate(data.data.activity_info.end_time, 'HH:mm'),
          });
        }
      );
      wx.showToast({
        title: '生成成功',
        icon: 'success'
      });
      
      // 关闭输入框
      this.setData({
        showAISection: false,
        aiInputText: ''
      });
    }, 6000);
  }
})