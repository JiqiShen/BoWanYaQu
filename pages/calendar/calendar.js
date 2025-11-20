// pages/calendar/calendar.js
const Api = require('../../utils/api.js');
const TimeUtil = require('../../utils/time.js');
const Util = require('../../utils/util.js');
const { ACTIVITY_STATUS } = require('../../utils/constants.js');
Page({
  data: {
    // 日历数据
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    days: [],
    selectedDate: null,
    
    // 活动数据
    activities: [],
    filteredActivities: [],
    selectedActivity: null,
    
    // 页面状态
    loading: false,
    currentView: 'month', // month, week, day
    today: new Date().toISOString().split('T')[0],
    
    // 周视图数据
    weekDays: [],
    currentWeek: 0
  },

  onLoad: function(options) {
    this.initCalendar();
    this.loadCalendarEvents();
  },

  onShow: function() {
    // 页面显示时刷新数据
    this.refreshData();
  },

  onPullDownRefresh: function() {
    this.refreshData().then(() => {
      wx.stopPullDownRefresh();
    });
  },

  // 初始化日历
  initCalendar: function() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    
    this.setData({
      year: year,
      month: month,
      selectedDate: today.toISOString().split('T')[0]
    });
    
    this.generateCalendarDays(year, month);
    this.generateWeekView();
  },

  // 生成月视图日期数据
  generateCalendarDays: function(year, month) {
    const days = [];
    
    // 获取当月第一天
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    
    // 上个月最后几天
    const prevMonthLastDay = new Date(year, month - 1, 0);
    const prevMonthDays = prevMonthLastDay.getDate();
    const firstDayWeek = firstDay.getDay();
    
    // 添加上个月的日期
    for (let i = prevMonthDays - firstDayWeek + 1; i <= prevMonthDays; i++) {
      days.push({
        date: `${year}-${month - 1}-${i}`,
      day: i,
      isCurrentMonth: false,
      isToday: false
      });
    }
    
    // 添加当月日期
    const todayStr = this.data.today;
    
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const dateStr = `${year}-${month}-${i}`;
      days.push({
        date: dateStr,
        day: i,
        isCurrentMonth: true,
        isToday: dateStr === todayStr
      });
    }
    
    // 添加下个月的日期
    const totalCells = 42; // 6行7列
    const remainingCells = totalCells - days.length;
      
    for (let i = 1; i <= remainingCells; i++) {
      days.push({
        date: `${year}-${month + 1}-${i}`,
        day: i,
        isCurrentMonth: false,
        isToday: false
      });
    }
    this.setData({ days: days });
  },

  // 生成周视图数据
  generateWeekView: function() {
    const today = new Date();
    const currentWeek = this.getWeekNumber(today);
    
    // 生成本周的日期数组
    const weekDays = [];
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      
      weekDays.push({
        date: date.toISOString().split('T')[0],
      day: date.getDate(),
      weekday: date.getDay(),
      isToday: date.toISOString().split('T')[0] === this.data.today
      });
    }
    
    this.setData({
      weekDays: weekDays,
      currentWeek: currentWeek
    });
  },

  // 加载日历事件
  loadCalendarEvents: function() {
    this.setData({ loading: true });
    const today = new Date().toISOString().split('T')[0];
    
    this.setData({
      activities: [{
        id: 3,
        title: '人工智能讲座',
        startTime: `${today}T15:00:00Z`,
        endTime: `${today}T17:00:00Z`,
        location: '信息科学大楼 101',
        clubName: 'AI研究社',
        maxParticipants: 200,
        currentParticipants: 150,
        status: 'open'
      }],
      
      loading: false
    });
      
    this.filterActivitiesByDate();
    
  },

  // 根据选择日期筛选活动
  filterActivitiesByDate: function(date = null) {
    const selectedDate = date || this.data.selectedDate;
    const filteredActivities = this.data.activities.filter(activity => {
      const activityDate = activity.startTime.split('T')[0];
      return activityDate === selectedDate;
    });
    
    this.setData({
      filteredActivities: filteredActivities
    });
  },

  // 刷新数据
  refreshData: function() {
    
  },

  // ==================== 用户交互事件 ====================

  // 选择日期
  onDateSelect: function(e) {
    const selectedDate = e.currentTarget.dataset.date;
    
    this.setData({ selectedDate: selectedDate });
    this.filterActivitiesByDate(selectedDate);
  },

  // 切换到上个月
  onPrevMonth: function() {
    let year = this.data.year;
    let month = this.data.month - 1;
    
    if (month === 0) {
      year = year - 1;
      month = 12;
    }
    
    this.setData({
      year: year,
      month: month
    });
    
    this.generateCalendarDays(year, month);
    this.loadCalendarEvents();
  },

  // 切换到下个月
  onNextMonth: function() {
    let year = this.data.year;
    let month = this.data.month + 1;
    
    if (month === 13) {
      year = year + 1;
      month = 1;
    }
    
    this.setData({
      year: year,
      month: month
    });
    
    this.generateCalendarDays(year, month);
    this.loadCalendarEvents();
  },

  // 切换到今天
  onToday: function() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    
    this.setData({
      year: year,
      month: month,
      selectedDate: this.data.today
    });
    
    this.generateCalendarDays(year, month);
    this.filterActivitiesByDate(this.data.today);
  },

  // 切换视图（月/周/日）
  onViewChange: function(e) {
    const view = e.currentTarget.dataset.view;
    
    this.setData({ currentView: view });
    
    if (view === 'week') {
      this.generateWeekView();
    }
  },

  // 选择活动
  onActivitySelect: function(e) {
    const activityId = e.currentTarget.dataset.id;
    const activity = this.data.activities.find(a => a.id === activityId);
    
    this.setData({ selectedActivity: activity });
  },

  // 跳转到活动详情
  onGoToActivityDetail: function(e) {
    const activityId = e.currentTarget.dataset.id;
    
    wx.navigateTo({
      url: `/pages/activity-detail/activity-detail?id=${activityId}`
    });
  },

  // 添加到系统日历
  onAddToSystemCalendar: function(e) {
    const activityId = e.currentTarget.dataset.id;
    
    wx.showModal({
      title: '添加到日历',
      content: '是否将此活动添加到手机系统日历？',
      success: (res) => {
        if (res.confirm) {
          // 这里可以调用系统日历 API
          wx.showToast({
            title: '已添加到日历',
            icon: 'success'
          });
        }
      }
    });
  },

  // ==================== 工具方法 ====================

  // 获取周数
  getWeekNumber: function(date) {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  },

  // 获取日期显示文本
  getDateDisplayText: function(dateStr) {
    const date = new Date(dateStr);
    const today = new Date();
    
    if (date.toDateString() === today.toDateString()) {
      return '今天';
    }
    
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  }

});