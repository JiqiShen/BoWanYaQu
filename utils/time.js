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
}

module.exports = TimeUtil;