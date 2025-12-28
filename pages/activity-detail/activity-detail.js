const Api = require("../../utils/api");

// 活动详情页面逻辑
Page({
  data: {
    activityId: null,
    // 活动数据引用位置，下为示例
    activityData: {
      name: "武侠·推理联合读书会",
      status: "未开始",
      club:"推理协会",
      tags: ["文学", "读书会", "推理", "武侠"],
      detail: "主讲人：亚戈。推荐阅读篇目：温瑞安《四大名捕会京师》中的《凶手》（短篇），欢迎大家的参与！",
      time: "2025年5月25日 19:00 - 21:00",
      location: "博雅学堂",
      registeredCount: 19,
      totalCount: 30,
      remainingCount: 11,
      isFollowed: false,
      isRegistered: false
    }
  },

  onLoad: function(options) {
    const activityId = options.activityId;
    Api.getActivityDetail(activityId).then(
      data => {
        console.log(data.data);
        this.setData({
          activityId: activityId,
          activityData: data.data
        });
      }
    )
  },
  
  fetchActivityDetail: function(activityId) {
    // 调用接口获取活动详情
    console.log('获取活动ID为:', activityId, '的详情数据');
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
        title: '已关注活动',
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
    if (!this.data.activityData.canRegister) {
      if (this.data.activityData.maxParticipants === this.data.activityData.currentParticipants){
        wx.showToast({
          title: '人数已满',
          icon: 'fail'
        });
      }else{
        wx.showToast({
          title: '不可报名',
          icon: 'fail'
        });
      }
      return;
    }
    console.log('activityId:' + this.data.activityData.activity_id);
    // 报名功能实现
    Api.signUpActivity(this.data.activityData.activity_id,
      { user_id: wx.getStorageSync('user_id') });
    wx.showToast({
      title: '报名成功',
      icon: 'success'
    });
  }
})