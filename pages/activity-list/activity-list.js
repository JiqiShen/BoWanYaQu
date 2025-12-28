// pages/activity-list/activity-list.js
const Api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   * 这里定义了页面所需的所有数据状态
   */
  data: {
    // 活动列表数据 - 存储从服务器获取的活动信息
    activityList: [],

    // 用户身份数据 - 标识用户的权限等级
    userRole: 'manager', // 用户身份：student-普通学生, manager-社团管理人员, admin-管理员
    
    // 分页相关数据 - 管理列表的分页状态
    currentPage: 1,      // 当前页码
    totalPages: 1,       // 总页数
    pageSize: 10,        // 每页显示的活动数量
    
    // 搜索相关数据 - 管理搜索功能状态
    searchKeyword: '',   // 搜索关键词
    
    // 筛选相关数据 - 管理所有筛选条件的状态
    filterExpanded: false,    // 筛选栏是否展开
    filterType: 'all',        // 活动类型筛选：all-全部, lecture-讲座, outdoor-户外, other-其他
    filterAudience: 'all',    // 参与人员筛选：all-全部, member-社员, everyone-所有人, available-可参加
    filterPeople: 'all',      // 活动人数筛选：all-全部, 20-20人以内, 20-50-20-50人, 50-100-50-100人, 100+-100人以上
    filterDate: '',           // 活动日期筛选
    filterLocation: 'all',    // 活动地址筛选：all-全部, campus-校内, offcampus-校外
    
    // 加载状态 - 管理页面加载和数据显示
    loading: false       // 是否正在加载数据
  },

  /**
   * 生命周期函数--监听页面加载
   * 页面初次加载时调用，用于初始化数据
   */
  onLoad(options) {
    // 页面加载时立即获取活动数据
    this.loadActivityData();
    // 获取用户身份信息
    this.getUserRole();
  },

  /**
   * 加载活动数据
   * 模拟从服务器获取数据的过程，实际项目中应替换为wx.request
   */
  loadActivityData() {
    // 显示加载状态，防止重复请求
    this.setData({ loading: true });
    
    setTimeout(() => {
      Api.getActivities({
        'page': this.data.currentPage,
        'limit': this.data.pageSize
      }).then(
        data => {
          console.log(data.data.activities);
          this.setData({
            activityList: data.data.activities,    
            loading: false,
            totalPages: Math.ceil(data.data.total / this.data.pageSize)             
          });
        }
      );
      
      // 如果是第一页（下拉刷新），停止刷新动画
      if (this.data.page === 1) {
        wx.stopPullDownRefresh();
      }
    }, 800);
  },
  loadSearchedActivityData() {
    setTimeout(() => {
      Api.getActivities({
        'page': this.data.currentPage,
        'limit': this.data.pageSize,
        'keyword': this.data.searchKeyword
      }).then(
        data => {
          console.log(data.data.activities);
          this.setData({
            activityList: data.data.activities,    
            loading: false,
            totalPages: Math.ceil(data.data.total / this.data.pageSize),
            num: this.data.filterPeople           
          });
        }
      );
      
      // 如果是第一页（下拉刷新），停止刷新动画
      if (this.data.page === 1) {
        wx.stopPullDownRefresh();
      }
    }, 800);
  },
 /**
   * 获取用户身份信息
   * 实际项目中应从服务器获取用户身份
   */
  getUserRole() {
    // 模拟获取用户身份
    // 实际项目中应该调用wx.getStorage或wx.login等API获取真实用户身份
    try {
      // 尝试从本地存储获取用户身份
      const userInfo = wx.getStorageSync('userInfo');
      if (userInfo) {
        this.setData({
          userRole: userInfo.role || 'manager'
        });
      } else {
        // 如果没有用户信息，默认设置为普通学生
        // 实际项目中应该引导用户登录
        this.setData({
          userRole: 'manager'
        });
      }
    } catch (e) {
      console.error('获取用户身份失败:', e);
      // 出错时默认设置为普通学生
      this.setData({
        userRole: 'student'
      });
    }
    
  },

  /**
   * 检查用户是否有创建活动的权限
   * @returns {boolean} 是否有权限
   */
  canCreateActivity() {
    // 社团管理人员和管理员可以创建活动
    return this.data.userRole === 'manager' || this.data.userRole === 'admin';
  },

    /**
   * 创建活动
   * 只有社团管理人员和管理员可以创建活动
   */
  createActivity() {
    // 再次检查权限，确保安全
    if (!this.canCreateActivity()) {
      wx.showToast({
        title: '您没有创建活动的权限',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    
    // 有权限，跳转到创建活动页面
    wx.navigateTo({
      url: '/pages/activity-edit/activity-edit'
    });
  },
  
  /**
   * 搜索活动
   * 处理搜索框输入事件，根据关键词筛选活动
   * @param {Object} e - 事件对象，包含输入的值
   */
  onSearch(e) {
    const keyword = e.detail.value;  // 获取搜索关键词
    
    // 更新搜索状态并重置页码
    this.setData({
      searchKeyword: keyword,
      currentPage: 1
    });
    if (keyword == null){
      this.loadActivityData();
    }else{
      this.loadSearchedActivityData();
    }
    // 重新加载数据（实际项目中应调用搜索API）
  },

  /**
   * 切换筛选栏展开状态
   * 控制筛选条件的显示和隐藏
   */
  toggleFilter() {
    this.setData({
      filterExpanded: !this.data.filterExpanded
    });
  },

  /**
   * 选择活动类型筛选
   * 处理活动类型筛选条件的点击事件
   * @param {Object} e - 事件对象，包含选择的类型
   */
  selectType(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      filterType: type,
      currentPage: 1  // 重置页码
    });
    this.loadActivityData();
  },

  /**
   * 选择参与人员筛选
   * 处理参与人员筛选条件的点击事件
   * @param {Object} e - 事件对象，包含选择的人员类型
   */
  selectAudience(e) {
    const audience = e.currentTarget.dataset.audience;
    this.setData({
      filterAudience: audience,
      currentPage: 1  // 重置页码
    });
    this.loadActivityData();
  },

  /**
   * 选择活动人数筛选
   * 处理活动人数筛选条件的点击事件
   * @param {Object} e - 事件对象，包含选择的人数范围
   */
  selectPeople(e) {
    const people = e.currentTarget.dataset.people;
    this.setData({
      filterPeople: people,
      currentPage: 1  // 重置页码
    });
    this.loadActivityData();
  },

  /**
   * 选择日期筛选
   * 处理日期选择器的变化事件
   * @param {Object} e - 事件对象，包含选择的日期
   */
  selectDate(e) {
    const date = e.detail.value;
    this.setData({
      filterDate: date,
      currentPage: 1  // 重置页码
    });
    this.loadActivityData();
  },

  /**
   * 选择活动地址筛选
   * 处理活动地址筛选条件的点击事件
   * @param {Object} e - 事件对象，包含选择的地址类型
   */
  selectLocation(e) {
    const location = e.currentTarget.dataset.location;
    this.setData({
      filterLocation: location,
      currentPage: 1  // 重置页码
    });
    this.loadActivityData();
  },

  /**
   * 重置筛选条件
   * 将所有筛选条件恢复为默认值
   */
  resetFilters() {
    this.setData({
      filterType: 'all',        // 重置活动类型
      filterAudience: 'all',    // 重置参与人员
      filterPeople: 'all',      // 重置活动人数
      filterDate: '',           // 清空日期
      filterLocation: 'all',    // 重置活动地址
      currentPage: 1            // 重置页码
    });
    this.loadActivityData();
  },

  /**
   * 跳转到活动详情页
   * 处理活动项的点击事件，跳转到详情页面
   * @param {Object} e - 事件对象，包含活动ID
   */
  goToActivityDetail(e) {
    const activityId = e.currentTarget.dataset.id;
    
    // 跳转到活动详情页，并传递活动ID参数
    wx.navigateTo({
      url: `/pages/activity-detail/activity-detail?activityId=${activityId}`
    });
  },

  /**
   * 点赞活动
   * 处理点赞按钮的点击事件，切换点赞状态
   * @param {Object} e - 事件对象，包含活动ID
   */
  likeActivity(e) {
    // 阻止事件冒泡，避免触发活动项的点击事件
    e.stopPropagation();
    
    const activityId = e.currentTarget.dataset.id;
    
    // 更新活动列表中的点赞状态
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

    // 更新页面数据
    this.setData({ activityList });
    
    // 显示操作反馈
    const currentActivity = this.data.activityList.find(a => a.id === activityId);
    wx.showToast({
      title: currentActivity.isLiked ? '点赞成功' : '取消点赞',
      icon: 'success'
    });

    // 实际项目中这里应该调用API更新点赞状态
    // this.updateLikeStatus(activityId, currentActivity.isLiked);
  },

  /**
   * 翻页 - 上一页
   * 切换到上一页，如果已经是第一页则不做操作
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
   * 切换到下一页，如果已经是最后一页则不做操作
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
   * 根据输入框的值跳转到指定页码
   * @param {Object} e - 事件对象，包含输入的页码
   */
  jumpToPage(e) {
    const page = parseInt(e.detail.value);
    
    // 验证页码的有效性
    if (page >= 1 && page <= this.data.totalPages) {
      this.setData({
        currentPage: page
      });
      this.loadActivityData();
    } else {
      // 显示错误提示
      wx.showToast({
        title: '请输入有效页码',
        icon: 'none'
      });
    }
  },

  /**
   * 生命周期函数--监听页面显示
   * 页面显示/切入前台时触发
   */
  onShow() {
    // 页面显示时的逻辑，如刷新数据等
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   * 用户下拉页面时触发，用于刷新数据
   */
  onPullDownRefresh() {
    // 重置为第一页并重新加载数据
    this.setData({
      currentPage: 1
    });
    this.loadActivityData();
    
    // 停止下拉刷新动画
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   * 用户滚动到底部时触发，用于加载更多数据
   */
  onReachBottom() {
    // 如果还有更多数据且不在加载中，则加载下一页
    if (this.data.currentPage < this.data.totalPages && !this.data.loading) {
      this.setData({
        currentPage: this.data.currentPage + 1
      });
      this.loadActivityData();
    }
  },

  /**
   * 创建活动
   * 跳转到创建活动页面
   */
  createActivity() {
    wx.navigateTo({
      url: '/pages/activity-edit/activity-edit'
    });
  }
})
