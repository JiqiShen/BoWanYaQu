// utils/request.js
const request = (options) => {
  return new Promise((resolve, reject) => {
    // 获取 token
    const token = wx.getStorageSync('user_token');
    
    const defaultHeader = {
      'Content-Type': 'application/json'
    };
    
    // 如果有 token，添加到 header
    if (token) {
      defaultHeader['Authorization'] = `Bearer ${token}`;
    }
    
    // 显示加载状态
    if (options.showLoading !== false) {
      wx.showLoading({
        title: '加载中...',
        mask: true
      });
    }
    
    wx.request({
      url: options.url,
      method: options.method || 'GET',
      data: options.data || {},
      header: {
        ...defaultHeader,
        ...options.header
      },
      success: (res) => {
        // 隐藏加载状态
        if (options.showLoading !== false) {
          wx.hideLoading();
        }
        
        // 统一处理响应
        if (res.statusCode === 200) {
          if (res.data.code === 200) {
            resolve(res.data.data);
          } else {
            // 业务逻辑错误
            wx.showToast({
              title: res.data.message || '请求失败',
              icon: 'none',
              duration: 2000
            });
            reject(res.data);
          }
        } else {
          // HTTP 错误
          wx.showToast({
            title: `网络错误: ${res.statusCode}`,
              icon: 'none'
            });
            reject(res);
          }
        },
        fail: (err) => {
          // 隐藏加载状态
          if (options.showLoading !== false) {
            wx.hideLoading();
        }
        
        reject(err);
      },
      complete: () => {
        // 请求完成
      }
    });
  });
};

module.exports = request;