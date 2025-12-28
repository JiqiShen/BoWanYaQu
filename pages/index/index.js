// pages/index/index.js
const Api = require('../../utils/api.js');
const TimeUtil = require('../../utils/time.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [
      { id: 1, url: "/assets/banners/b1.png" },
      { id: 2, url: "/assets/banners/b2.png" },
      { id: 3, url: "/assets/banners/b3.png" }
    ],
    activityList: [],
    clubsToShow: [],
  },
  // “更多” 按钮点击
  onTapMore() {
    wx.switchTab({
      url: '/pages/activity-list/activity-list'
    });
  },
  onTapActivity: function(event) {
    const activityId = event.currentTarget.dataset.activityid;
    wx.navigateTo({
      url: `/pages/activity-detail/activity-detail?activityId=${activityId}`
    })
  },

  // 点击社团卡片
  onTapClub(e) {
    const clubId = e.currentTarget.dataset.clubid;
    wx.navigateTo({
      url: `/pages/club-detail/club-detail?clubId=${clubId}`
    });
  },

  onTapBanner(e) {
    const id = e.currentTarget.dataset.id
    console.log('tap banner', id)
    // 这里可以跳转到活动详情
    // wx.navigateTo({ url: `/pages/events/detail?id=${id}` })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    Api.getLatestActivities({
      'limit': 3
    }).then(
      data => {
        const activities = data.data.activities || [];
        // 格式化时间
        const formattedActivities = activities.map(item => {
          return {
            ...item,
            formattedTime: TimeUtil.getActivityTime(item.start_time),
            relativeTime: TimeUtil.getRelativeTime(item.start_time),
            fullTime: TimeUtil.formatDate(item.start_time)
          };
        });
        console.log(formattedActivities);
        this.setData({
          activityList: formattedActivities
        });
      }
    );
    Api.getClubs({
      'page': 1,
      'limit': 10
    }).then(
      data => {
        console.log(data.data.clubs);
        this.setData({
          clubsToShow: data.data.clubs
        });
      }
    );
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    "index"
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})