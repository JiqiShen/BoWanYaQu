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
    today: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    calendarDays: [],
    selectedDate: null,
    
    // 活动数据
    activities: [],
    todayActivities: [],
  },

  onLoad: function(options) {
    this.refreshActivities();
    this.onToday();
  },

  onShow: function() {
    this.refreshActivities();
  },

  // 生成月视图日期数据
  generateCalendarDays: function(year, month) {
    const days = [];
    const formatDate = (y, m, d) => {
      const utcDate = new Date(Date.UTC(y, m - 1, d));
      return utcDate.toISOString().split('T')[0];
    };
    
    // 获取当月第一天
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    
    // 上个月最后几天
    const prevMonthLastDay = new Date(year, month - 1, 0);
    const prevMonthDays = prevMonthLastDay.getDate();
    const firstDayWeek = firstDay.getDay();
    const todayStr = this.data.today;
    const prevYear = month === 1 ? year - 1 : year;
    const prevMonth = month === 1 ? 12 : month - 1;
    const nextYear = month === 12 ? year + 1 : year;
    const nextMonth = month === 12 ? 1 : month + 1;
    
    // 添加上个月的日期
    for (let i = prevMonthDays - firstDayWeek + 1; i <= prevMonthDays; i++) {
      const dateStr = formatDate(prevYear, prevMonth, i);
      days.push({
        date: dateStr,
        day: i,
        isCurrentMonth: false,
        isToday: dateStr === todayStr,
        activitiesCount: this.getActivitiesCount(dateStr)
      });
    }
    
    // 添加当月日期
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const dateStr = formatDate(year, month, i);
      days.push({
        date: dateStr,
        day: i,
        isCurrentMonth: true,
        isToday: dateStr === todayStr,
        activitiesCount: this.getActivitiesCount(dateStr)
      });
    }
    
    // 添加下个月的日期
    const totalCells = Math.ceil(days.length / 7) * 7;
    const remainingCells = totalCells - days.length;
      
    for (let i = 1; i <= remainingCells; i++) {
      const dateStr = formatDate(nextYear, nextMonth, i);
      days.push({
        date: dateStr,
        day: i,
        isCurrentMonth: false,
        isToday: dateStr === todayStr,
        activitiesCount: this.getActivitiesCount(dateStr)
      });
    }
    this.setData({ calendarDays: days });
  },

  // 根据选择日期筛选活动
  filterActivitiesByDate: function(date = null) {
    const selectedDate = date || this.data.selectedDate;
    const todayActivities = this.data.activities.filter(activity => {
      const activityDate = activity.date;
      return activityDate === selectedDate;
    });
    
    this.setData({
      todayActivities: todayActivities
    });
  },

  // 获取指定日期的活动数量，供日历标记显示
  getActivitiesCount: function(date) {
    if (!date) {
      return 0;
    }

    const activities = Array.isArray(this.data.activities) ? this.data.activities : [];
    return activities.reduce((count, activity) => {
      if (!activity || !activity.startTime) {
        return count;
      }

      const activityDate = activity.date;
      return activityDate === date ? count + 1 : count;
    }, 0);
  },

  // 刷新数据
  refreshActivities: function() {
    // call api for events
    const today = new Date().toISOString().split('T')[0];
    this.setData({
      activities: [
        {
          id: 0,
          title: '人工智能讲座1',
          date: `${today}`,
          startTime: `15:00`,
          endTime: `17:00`,
          location: '信息科学大楼 101',
          clubName: 'AI研究社',
          maxParticipants: 200,
          currentParticipants: 150,
          status: 'open'
        },
        {
          id: 1,
          title: '人工智能讲座2',
          date: `${today}`,
          startTime: `17:00`,
          endTime: `19:00`,
          location: '信息科学大楼 102',
          clubName: 'AI研究社',
          maxParticipants: 200,
          currentParticipants: 150,
          status: 'open'
        },
        {
          id: 2,
          title: '人工智能讲座3',
          date: `2025-12-01`,
          startTime: `15:00`,
          endTime: `17:00`,
          location: '信息科学大楼 102',
          clubName: 'AI研究社',
          maxParticipants: 200,
          currentParticipants: 150,
          status: 'open'
        }
      ]
    });
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
    this.filterActivitiesByDate(this.data.today);
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
    this.filterActivitiesByDate(this.data.today);
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

  // 跳转到活动详情
  onGoToActivityDetail: function(e) {
    const activityId = e.currentTarget.dataset.id;
    
    wx.navigateTo({
      url: `/pages/activity-detail/activity-detail?id=${activityId}`
    });
  },

});