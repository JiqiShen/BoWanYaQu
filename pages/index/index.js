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
      { name: '篮球社', logo: '/assets/clubs/bkb.jpg' },
      { name: '足球社', logo: '/assets/clubs/football.jpg' },
      { name: '音乐社', logo: '/assets/clubs/music.jpg' },
      { name: '舞蹈社', logo: '/assets/clubs/dance.jpg' },
      { name: '摄影社', logo: '/assets/clubs/photo.jpg' },
      { name: '文学社', logo: '/assets/clubs/wenxue.jpg' },
      { name: '志愿者协会', logo: '/assets/clubs/volunteer.jpg' },
      { name: '辩论社', logo: '/assets/clubs/arg.jpg' },
      { name: '动漫社', logo: '/assets/clubs/anime.jpg' },
      { name: '科创社', logo: '/assets/clubs/sci.jpg' },
      { name: '美术社', logo: '/assets/clubs/art.jpg' },
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
    wx.navigateTo({
      url: `/pages/club/club?club=${encodeURIComponent(clubName)}`
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