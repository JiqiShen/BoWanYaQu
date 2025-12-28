// utils/constants.js
module.exports = {
  // API 基础 URL
  BASE_API_URL: 'http://10.129.244.246:1234/v1',
  
  // 活动状态
  ACTIVITY_STATUS: {
    DRAFT: 'draft',
    PENDING: 'pending',
    PUBLISHED: 'published',
    ONGOING: 'ongoing',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled'
  },
  
  // 用户角色
  USER_ROLE: {
    STUDENT: 'student',
    CLUB_ADMIN: 'club_admin',
    SUPER_ADMIN: 'super_admin'
  },
  
  // 报名状态
  REGISTRATION_STATUS: {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    WAITLISTED: 'waitlisted',
    CANCELLED: 'cancelled',
    ATTENDED: 'attended',
    NOSHOW: 'noshow'
  },
  
  // 错误码
  ERROR_CODE: {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
  },
  
  // 业务错误码
  BUSINESS_ERROR: {
    ACTIVITY_NOT_FOUND: 1001,
    ACTIVITY_FULL: 1002,
    ACTIVITY_ENDED: 1003,
    ACTIVITY_CANCELLED: 1004,
    ALREADY_REGISTERED: 1005
  },
  
  // 页面路径
  PAGE_PATH: {
    INDEX: '/pages/index/index',
    ACTIVITY_LIST: '/pages/activity-list/activity-list',
    ACTIVITY_DETAIL: '/pages/activity-detail/activity-detail',
    CLUB_LIST: '/pages/club-list/club-list',
    CLUB_DETAIL: '/pages/club-detail/club-detail',
    LOGIN: '/pages/login/login',
    REGISTER: '/pages/register/register'
  },
  
  // 存储键名
  STORAGE_KEY: {
    TOKEN: 'user_token',
    USER_INFO: 'user_info'
  }
};