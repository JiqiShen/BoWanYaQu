// pages/club-detail.js
Page({
  data: {
    clubId: 0,
    // 活动数据引用位置，下为示例
    clubData: {
      name: "篮球社",
      tags: ["运动"],
      detail: "篮球社成立于2005年，是由一群热爱篮球运动的北大学子自发组织的学生社团。我们秉承以球会友，强身健体，追求卓越”的宗旨，致力于为全校师生提供一个专业、友好、充满活力的篮球交流平台",
      isFollowed: false,
      isRegistered: false,
      onGoingActivity: [
        {
          name: "2024年春季招新活动",
          status: "报名中",
          time: "2025年5月25日 19:00 - 21:00",
          location: "博雅学堂",
        }
      ]
    }
  },
  onLoad: function(options) {
    console.log(options.clubId) // 输出：value2
    
    // 可以将参数保存到 data 中
    this.setData({
      clubId: options.clubId,
    })
  },
  // 关注活动状态改变
  onFollowChange: function(e) {
    const isFollowed = e.detail.value;
    this.setData({
      'activityData.isFollowed': isFollowed
    });
    
    // 关注/取消关注功能实现
    if (isFollowed) {
      wx.showToast({
        title: '已关注社团',
        icon: 'success'
      });
    } else {
      wx.showToast({
        title: '已取消关注',
        icon: 'none'
      });
    }
  },

  // 报名按钮点击
  onRegisterTap: function() {
    if (this.data.activityData.isRegistered) {
      return;
    }
    
    // 报名功能实现
    this.setData({
      'activityData.isRegistered': true,
      'activityData.registeredCount': this.data.activityData.registeredCount + 1,
      'activityData.remainingCount': this.data.activityData.remainingCount - 1
    });
    
    
    wx.showToast({
      title: '加入成功',
      icon: 'success'
    });
  }
})