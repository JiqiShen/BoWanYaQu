// pages/index/index.js
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
    activityList: [
      {
        id: 1,
        title: "武侠·推理联合读书会",
        time: "12月11日",
        bgColor: "#f1a9a0"
      },
      {
        id: 2,
        title: "编程马拉松",
        time: "12月12日",
        bgColor: "#f7e28c"
      },
      {
        id: 3,
        title: "音乐节志愿者",
        time: "12月13日",
        bgColor: "#bff4b9"
      }
    ],
    clubsToShow: [
      { name: '篮球社', id: 1 },
      { name: '足球社', id: 2 },
      { name: '音乐社', id: 3 },
      { name: '舞蹈社', id: 4 },
      { name: '摄影社', id: 5 },
      { name: '文学社', id: 6 },
      { name: '志愿者协会', id: 7 }
    ],
  },
  // “更多” 按钮点击
  onTapMore() {
    console.log('onTapMore clicked');
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