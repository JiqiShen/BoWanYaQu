const Api = require("../../utils/api");

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
    Api.getClubDetail(options.clubId).then(
      data => {
        console.log(data.data);
        this.setData({
          clubId: options.clubId,
          clubData: data.data
        })
    });
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

  // 关注按钮点击
  onRegisterTap: function() {
    Api.followClub(this.data.clubId).then(
      this.setData({
        clubData:{
          ...clubData,
          is_followed: true
        }
      })
    );
    wx.showToast({
      title: '关注成功',
      icon: 'success'
    });
  }
})