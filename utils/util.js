// utils/util.js
class Util {
  // 防抖函数
  static debounce(func, wait) {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    }
  }
  
  // 节流函数
  static throttle(func, wait) {
    let timeout;
    let previous = 0;
    
    return function() {
      const now = Date.now();
      
      if (now - previous > wait) {
        func.apply(context, arguments);
        previous = now;
      }
    }
  }
  
  // 深拷贝
  static deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }
    
    if (obj instanceof Array) {
      return obj.map(item => this.deepClone(item));
    }
    
    const cloned = {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = this.deepClone(obj[key]);
      }
    }
    return cloned;
  }
  
  // 验证手机号
  static isPhoneNumber(phone) {
    return /^1[3-9]\d{9}$/.test(phone);
  }
  
  // 验证邮箱
  static isEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  // 显示成功提示
  static showSuccess(message) {
    wx.showToast({
      title: message,
      icon: 'success',
      duration: 2000
    });
  }
  
  // 显示错误提示
  static showError(message) {
    wx.showToast({
      title: message,
      icon: 'none',
      duration: 2000
    });
  }
  
  // 显示加载提示
  static showLoading(message = '加载中...') {
    wx.showLoading({
      title: message,
      mask: true
    });
  }
  
  // 隐藏加载提示
  static hideLoading() {
    wx.hideLoading();
  }
  
  // 格式化数字（添加千分位）
  static formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}

module.exports = Util;