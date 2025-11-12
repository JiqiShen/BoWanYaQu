// utils/auth.js
const Api = require('./api.js');

class Auth{
  static checkLogin(){
    return new Promise((resolve, reject) => {
      const token = wx.getStorageSync('user_token');

      if(!token){
        reject(new Error('未登录'));
        return;
      }

      Api.getUserProfile().then(
        userInfo => {
          getApp().globalData.userInfo = userInfo;
          resolve(userInfo);
        }
      ).catch(
        err => {
          reject(err);
        }
      )
    });
  }
  // 微信登录
  static wechatLogin() {
    return new Promise((resolve, reject) => {
      wx.login({
        success: (res) => {
          if(res.code){
            Api.login(res.code).then(loginRes => {
              wx.setStorageSync('user_token', loginRes.token);
              getApp().globalData.userInfo = loginRes.userInfo;
              resolve(loginRes);
            }).catch(
              err => {
                reject(err);
              }
            );
          }else{
            reject(new Error('微信登陆失败'));
          }
        },
      })
    })
  }
  // 退出登录
  static logout() {
    wx.removeStorageSync('user_token');
    getApp().globalData.userInfo = null;
  }
  
  
  // 检查权限
  static checkPermission(requiredRole) {
    const userInfo = getApp().globalData.userInfo;
    
    if (!userInfo) {
      return false;
    }
    
    // 简单的角色权限检查
    const roleHierarchy = {
      'student': 1,
      'club_admin': 2,
      'super_admin': 3
    };
    
    return roleHierarchy[userInfo.role] >= roleHierarchy[requiredRole];
  }
}

module.exports = Auth;