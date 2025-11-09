// pages/activity-list/activity-list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 活动列表数据
    activityList: [],
    // 分页相关
    currentPage: 1,
    totalPages: 5,
    pageSize: 10,
    // 搜索相关
    searchKeyword: '',
    // 筛选相关
    filterExpanded: false,
    filterStatus: 'all',
    filterType: 'all',
    filterDate: '',
    // 加载状态
    loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadActivityData();
  },

  /**
   * 加载活动数据
   */
  loadActivityData() {
    this.setData({ loading: true });
    
    // 模拟数据加载 - 实际项目中替换为API调用
    setTimeout(() => {
      const mockData = this.generateMockData();
      this.setData({
        activityList: mockData,
        loading: false
      });
    }, 800);
  },

  /**
   * 生成模拟大学社团活动数据
   */
  generateMockData() {
    const activities = [];
    const statusList = ['进行中', '未开始', '已结束'];
    const types = ['体育竞技', '文艺表演', '学术讲座', '志愿服务', '团建联谊', '比赛竞赛'];
    const locations = ['体育馆', '学生活动中心', '图书馆报告厅', '操场', '教学楼101', '音乐厅', '美术楼展厅'];
    const clubs = ['篮球社', '足球社', '音乐社', '舞蹈社', '摄影社', '文学社', '志愿者协会', '辩论社', '动漫社', '科创社'];
    
    const activitiesData = [
      {
        title: '新生杯篮球联赛',
        description: '欢迎各位篮球爱好者参加新生杯篮球联赛，展现你的篮球才华，结交志同道合的朋友！',
        type: '体育竞技'
      },
      {
        title: '校园歌手大赛初赛',
        description: '展现你的歌喉，追逐音乐梦想！校园歌手大赛火热报名中，丰厚奖品等你来拿！',
        type: '文艺表演'
      },
      {
        title: '人工智能前沿讲座',
        description: '特邀计算机学院教授讲解人工智能最新发展，适合对AI技术感兴趣的同学参加。',
        type: '学术讲座'
      },
      {
        title: '敬老院志愿服务',
        description: '志愿者协会组织前往敬老院开展关爱老人活动，传递温暖，奉献爱心。',
        type: '志愿服务'
      },
      {
        title: '社团迎新联谊会',
        description: '各社团联合举办迎新联谊活动，游戏互动、才艺展示，快速融入大学生活！',
        type: '团建联谊'
      },
      {
        title: '编程马拉松比赛',
        description: '24小时编程挑战赛，考验你的编程能力和团队协作，优胜者有丰厚奖励！',
        type: '比赛竞赛'
      },
      {
        title: '古典音乐会',
        description: '音乐社倾情奉献古典音乐会，带你感受音乐的魅力，陶冶艺术情操。',
        type: '文艺表演'
      },
      {
        title: '环保校园行',
        description: '参与校园环保活动，清理垃圾、宣传环保理念，共建美丽校园。',
        type: '志愿服务'
      }
    ];
    
    for (let i = 0; i < 10; i++) {
      const statusIndex = i % 3;
      const dataIndex = i % 8;
      const locationIndex = i % 7;
      const clubIndex = i % 10;
      
      activities.push({
        id: i + 1,
        title: activitiesData[dataIndex].title,
        description: activitiesData[dataIndex].description,
        coverImage: '/images/club-activity.jpg',
        startTime: `2024-03-${15 + (i % 15)} 14:00`,
        endTime: `2024-03-${15 + (i % 15)} 17:00`,
        location: locations[locationIndex],
        organizer: clubs[clubIndex],
        status: statusList[statusIndex],
        type: activitiesData[dataIndex].type,
        participants: Math.floor(Math.random() * 200) + 50,
        isLiked: Math.random() > 0.7,
        likeCount: Math.floor(Math.random() * 100),
        contact: `社团负责人：张同学 138****${1000 + i}`
      });
    }
    
    return activities;
  },

  /**
   * 搜索活动
   */
  onSearch(e) {
    const keyword = e.detail.value;
    this.setData({
      searchKeyword: keyword,
      currentPage: 1
    });
    // 实际项目中这里应该调用API进行搜索
    this.loadActivityData();
  },

  /**
   * 切换筛选栏展开状态
   */
  toggleFilter() {
    this.setData({
      filterExpanded: !this.data.filterExpanded
    });
  },

  /**
   * 选择活动状态筛选
   */
  selectStatus(e) {
    const status = e.currentTarget.dataset.status;
    this.setData({
      filterStatus: status,
      currentPage: 1
    });
    this.loadActivityData();
  },

  /**
   * 选择活动类型筛选
   */
  selectType(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      filterType: type,
      currentPage: 1
    });
    this.loadActivityData();
  },

  /**
   * 选择日期筛选
   */
  selectDate(e) {
    const date = e.detail.value;
    this.setData({
      filterDate: date,
      currentPage: 1
    });
    this.loadActivityData();
  },

  /**
   * 重置筛选条件
   */
  resetFilters() {
    this.setData({
      filterStatus: 'all',
      filterType: 'all',
      filterDate: '',
      currentPage: 1
    });
    this.loadActivityData();
  },

  /**
   * 跳转到活动详情页
   */
  goToActivityDetail(e) {
    const activityId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/activity-detail/activity-detail?id=${activityId}`
    });
  },

  /**
   * 点赞活动
   */
  likeActivity(e) {
    e.stopPropagation();
    const activityId = e.currentTarget.dataset.id;
    const activityList = this.data.activityList.map(item => {
      if (item.id === activityId) {
        const newLikeStatus = !item.isLiked;
        return {
          ...item,
          isLiked: newLikeStatus,
          likeCount: newLikeStatus ? item.likeCount + 1 : item.likeCount - 1
        };
      }
      return item;
    });
    
    this.setData({ activityList });
    
    // 实际项目中这里应该调用API更新点赞状态
    wx.showToast({
      title: this.data.activityList.find(a => a.id === activityId).isLiked ? '点赞成功' : '取消点赞',
      icon: 'success'
    });
  },

  /**
   * 联系负责人
   */
  contactOrganizer(e) {
    e.stopPropagation();
    const activityId = e.currentTarget.dataset.id;
    const activity = this.data.activityList.find(a => a.id === activityId);
    
    wx.showModal({
      title: '联系负责人',
      content: activity.contact,
      confirmText: '复制联系方式',
      success: (res) => {
        if (res.confirm) {
          wx.setClipboardData({
            data: activity.contact,
            success: () => {
              wx.showToast({
                title: '联系方式已复制',
                icon: 'success'
              });
            }
          });
        }
      }
    });
  },

  /**
   * 翻页 - 上一页
   */
  prevPage() {
    if (this.data.currentPage > 1) {
      this.setData({
        currentPage: this.data.currentPage - 1
      });
      this.loadActivityData();
    }
  },

  /**
   * 翻页 - 下一页
   */
  nextPage() {
    if (this.data.currentPage < this.data.totalPages) {
      this.setData({
        currentPage: this.data.currentPage + 1
      });
      this.loadActivityData();
    }
  },

  /**
   * 跳转到指定页
   */
  jumpToPage(e) {
    const page = parseInt(e.detail.value);
    if (page >= 1 && page <= this.data.totalPages) {
      this.setData({
        currentPage: page
      });
      this.loadActivityData();
    } else {
      wx.showToast({
        title: '请输入有效页码',
        icon: 'none'
      });
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 页面显示时可能需要刷新数据
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.setData({
      currentPage: 1
    });
    this.loadActivityData();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (this.data.currentPage < this.data.totalPages) {
      this.setData({
        currentPage: this.data.currentPage + 1
      });
      this.loadActivityData();
    }
  }
})
