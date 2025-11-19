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
    clubsToShow: [
      '篮球社', '足球社', '音乐社',
      '舞蹈社', '摄影社', '文学社',
      '志愿者协会', '辩论社', '动漫社', '科创社'
    ]
  },
  // “更多” 按钮点击
  onTapMore() {
    console.log('onTapMore clicked');
    wx.switchTab({
      url: '/pages/activity-list/activity-list'
    });
  },

  // 点击社团卡片
  onTapClub(e) {
    const clubName = e.currentTarget.dataset.club;
    wx.switchTab({
      url: `/pages/activity-list/activity-list?club=${encodeURIComponent(clubName)}`
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