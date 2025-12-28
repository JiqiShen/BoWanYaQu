// utils/time.js
class TimeUtil {
  // 格式化时间为友好显示
  static formatTimeDisplay(startTime, endTime) {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const now = new Date();
    
    // 今天
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (start >= today && start < tomorrow) {
      return `今天 ${start.getHours().toString().padStart(2, '0')}:${start.getMinutes().toString().padStart(2, '0')}`;
    }
    
    // 明天
    const dayAfterTomorrow = new Date(tomorrow);
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);
    
    if (start >= tomorrow && start < dayAfterTomorrow) {
      return `明天 ${start.getHours().toString().padStart(2, '0')}:${start.getMinutes().toString().padStart(2, '0')}`;
    }
    
    // 本周内
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    
    if (start >= weekStart && start < tomorrow) {
      const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
    return `周${weekDays[start.getDay()]} ${start.getHours().toString().padStart(2, '0')}:${start.getMinutes().toString().padStart(2, '0')}`;
    }
    
    // 其他情况
    return `${start.getMonth() + 1}月${start.getDate()}日 ${start.getHours().toString().padStart(2, '0')}:${start.getMinutes().toString().padStart(2, '0')}`;
  }
  
  // 计算剩余时间
  static getRemainingTime(targetTime) {
    const target = new Date(targetTime);
    const now = new Date();
    const diff = target - now;
    
    if (diff <= 0) {
      return '已开始';
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)));
    
    if (days > 0) {
      return `剩余${days}天`;
    } else {
      return `剩余${hours}小时`;
    }
  }
  
  // 格式化持续时间
  static formatDuration(startTime, endTime) {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const duration = end - start;
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}小时${minutes}分钟`;
    } else {
      return `${minutes}分钟`;
    }
  }
  
  // 判断活动状态
  static getActivityStatus(startTime, endTime) {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const now = new Date();
    
    if (now < start) {
      return 'upcoming';
    } else if (now >= start && now <= end) {
      return 'ongoing';
    } else {
      return 'completed';
    }
  }

  /**
   * 格式化时间
   * @param {string} dateString - 时间字符串
   * @param {string} format - 格式，默认 'YYYY-MM-DD HH:mm:ss'
   * @returns {string} 格式化后的时间
   */
  static formatDate(dateString, format = 'YYYY-MM-DD HH:mm:ss') {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    
    // 检查日期是否有效
    if (isNaN(date.getTime())) {
      return dateString;
    }
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    const second = String(date.getSeconds()).padStart(2, '0');
    
    // 替换格式字符串
    return format
      .replace('YYYY', year)
      .replace('MM', month)
      .replace('DD', day)
      .replace('HH', hour)
      .replace('mm', minute)
      .replace('ss', second);
  }

  /**
   * 获取相对时间（如：刚刚、3分钟前、昨天等）
   * @param {string} dateString - 时间字符串
   * @returns {string} 相对时间
   */
  static getRelativeTime(dateString) {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    console.log(date);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) {
      return '刚刚';
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes}分钟前`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours}小时前`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) {
      return '昨天';
    }
    
    if (diffInDays < 7) {
      return `${diffInDays}天前`;
    }
    
    if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7);
      return `${weeks}周前`;
    }
    
    // 超过一个月显示具体日期
    return this.formatDate(dateString, 'YYYY-MM-DD');
  }

  /**
   * 获取活动常用时间格式
   * @param {string} dateString - 时间字符串
   * @returns {string} 格式化后的时间
   */
  static getActivityTime(dateString) {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    const now = new Date();
    
    // 判断是否是今天
    const isToday = date.toDateString() === now.toDateString();
    
    // 判断是否是今年
    const isThisYear = date.getFullYear() === now.getFullYear();
    
    if (isToday) {
      // 今天：显示时间
      return this.formatDate(dateString, 'HH:mm');
    } else if (isThisYear) {
      // 今年：显示月-日 时间
      return this.formatDate(dateString, 'MM-DD HH:mm');
    } else {
      // 往年：显示年-月-日
      return this.formatDate(dateString, 'YYYY-MM-DD');
    }
  }
}

module.exports = TimeUtil;