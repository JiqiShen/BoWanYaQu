// utils/api.js
const request = require('./request.js');
const { BASE_API_URL } = require('./constants.js');

class Api {
  // ==================== 认证相关 ====================
  static login(code) {
    return request({
      url: `${BASE_API_URL}/auth/login`,
      method: 'POST',
      data: code
    });
  }

  static register(code) {
    return request({
      url: `${BASE_API_URL}/auth/register`,
      method: 'POST',
      data: code
    });
  }
  
  static refreshToken() {
    return request({
      url: `${BASE_API_URL}/auth/refresh`,
      method: 'POST'
    });
  }
  
  // ==================== 用户相关 ====================
  static getUserProfile(params) {
    return request({
      url: `${BASE_API_URL}/user/profile`,
      method: 'GET',
      data: params
    });
  }
  
  static updateUserProfile(userInfo) {
    return request({
      url: `${BASE_API_URL}/users/profile`,
      method: 'PUT',
      data: userInfo
    });
  }
  
  // ==================== 活动相关 ====================
  static getActivities(params = {}) {
    return request({
      url: `${BASE_API_URL}/activities`,
      method: 'GET',
      data: params
    });
  }

  static getLatestActivities(params = {}) {
    return request({
      url: `${BASE_API_URL}/activities/latest`,
      method: 'GET',
      data: params
    });
  }
  
  static getActivityDetail(activityId) {
    return request({
      url: `${BASE_API_URL}/activities/${activityId}`,
      method: 'GET'
    });
  }
  
  static createActivity(activityData) {
    return request({
      url: `${BASE_API_URL}/activities`,
      method: 'POST',
      data: activityData
    });
  }

  static extractActivity(params) {
    return request({
      url: `${BASE_API_URL}/extract/wechat`,
      method: 'POST',
      data: params
    });
  }
  
  // ==================== 报名相关 ====================
  static signUpActivity(activityId, options = {}) {
    return request({
      url: `${BASE_API_URL}/activities/${activityId}/register`,
      method: 'POST',
      data: options
    });
  }
  
  static cancelRegistration(activityId) {
    return request({
      url: `${BASE_API_URL}/activities/${activityId}/registrations`,
      method: 'DELETE'
    });
  }
  
  static getMyRegistrations(params = {}) {
    return request({
      url: `${BASE_API_URL}/user/registered-activities`,
      method: 'GET',
      data: params
    });
  }
  
  // ==================== 社团相关 ====================
  static getClubs(params = {}) {
    return request({
      url: `${BASE_API_URL}/clubs`,
      method: 'GET',
      data: params
    });
  }

  static getClubDetail(clubId) {
    return request({
      url: `${BASE_API_URL}/clubs/${clubId}`,
      method: 'GET'
    });
  }

  static followClub(clubId) {
    return request({
      url: `${BASE_API_URL}/clubs/${clubId}/follow`,
      method: 'POST'
    });
  }

  static cancelFollowClub(clubId) {
    return request({
      url: `${BASE_API_URL}/clubs/${clubId}/follow`,
      method: 'DELETE'
    });
  }
  
  // ==================== 日历相关 ====================
  static getCalendarEvents(params = {}) {
    return request({
      url: `${BASE_API_URL}/calendar/events`,
      method: 'GET',
      data: params
    });
  }
}

module.exports = Api;