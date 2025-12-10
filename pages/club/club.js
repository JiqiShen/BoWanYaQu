// pages/club-detail/club-detail.js
Page({
  data: {
    clubName: '',           // 从URL传来的社团名称
    clubInfo: {},           // 社团详细信息
    activities: [],         // 活动列表
    members: [],            // 成员列表
    isJoined: false,        // 是否已加入
    isLoading: true         // 加载状态
  },

  onLoad(options) {
    console.log('接收到的参数:', options); // 调试用
    
    // 获取传递过来的社团名称
    const clubName = options.club ? decodeURIComponent(options.club) : '';
    
    if (!clubName) {
      wx.showToast({
        title: '未选择社团',
        icon: 'error',
        complete: () => {
          setTimeout(() => {
            wx.navigateBack();
          }, 1500);
        }
      });
      return;
    }
    
    this.setData({
      clubName: clubName,
      isLoading: true
    });
    
    // 设置页面标题
    wx.setNavigationBarTitle({
      title: clubName
    });
    
    // 根据社团名称获取数据
    this.loadClubData(clubName);
  },

  // 加载社团数据
  loadClubData(clubName) {
    // 模拟数据，根据社团名称返回不同数据
    const clubData = {
      '篮球社': {
        description: '热爱篮球，挥洒汗水！每周固定训练，定期组织校内比赛。',
        leader: '张三',
        memberCount: 45,
        foundedDate: '2022-03-15',
        logo: '/assets/clubs/bkb.jpg',
        contact: '微信号：basketball_club',
        tags: ['运动', '团队', '竞技', '校内热门']
      },
      '足球社': {
        description: '激情足球，团结拼搏！欢迎所有热爱足球的同学加入。',
        leader: '李四',
        memberCount: 38,
        foundedDate: '2021-09-10',
        logo: '/assets/clubs/football.jpg',
        contact: 'QQ群：12345678',
        tags: ['运动', '户外', '团队']
      },
      '音乐社': {
        description: '用音乐连接心灵，定期举办音乐会和街头表演。',
        leader: '王五',
        memberCount: 52,
        foundedDate: '2020-11-20',
        logo: '/assets/clubs/music.jpg',
        contact: '电话：13888888888',
        tags: ['艺术', '表演', '创意']
      },
      '舞蹈社': {
        description: '舞动青春，展现自我！涵盖街舞、民族舞、现代舞等多种舞种。',
        leader: '舞者小陈',
        memberCount: 58,
        foundedDate: '2022-05-20',
        logo: '/assets/clubs/dance.jpg',
        contact: '微信：dance_club2023',
        tags: ['舞蹈', '表演', '健身', '节奏感']
      },
      '摄影社': {
        description: '发现美，记录美，分享美。定期组织外拍活动和摄影讲座。',
        leader: '摄影师小张',
        memberCount: 42,
        foundedDate: '2020-08-08',
        logo: '/assets/clubs/photo.jpg',
        contact: 'Instagram：@photo_club_school',
        tags: ['摄影', '旅行', '记录', '视觉艺术']
      },
      '文学社': {
        description: '以文会友，笔耕不辍。定期举办读书分享会和写作工作坊。',
        leader: '文青小李',
        memberCount: 28,
        foundedDate: '2019-10-01',
        logo: '/assets/clubs/wenxue.jpg',
        contact: '邮箱：literature_club@school.com',
        tags: ['阅读', '写作', '文化', '分享']
      },
      '志愿者协会': {
        description: '奉献爱心，服务社会。组织各种公益活动和社会实践。',
        leader: '热心小王',
        memberCount: 85,
        foundedDate: '2018-03-12',
        logo: '/assets/clubs/volunteer.jpg',
        contact: '公众号：校园志愿者',
        tags: ['公益', '服务', '爱心', '社会实践']
      },
      '辩论社': {
        description: '辩以明理，论以求真。锻炼逻辑思维和语言表达能力。',
        leader: '辩手小赵',
        memberCount: 34,
        foundedDate: '2021-04-18',
        logo: '/assets/clubs/arg.jpg',
        contact: 'QQ群：辩论爱好者群',
        tags: ['辩论', '思辨', '逻辑', '口才']
      },
      '动漫社': {
        description: '二次元爱好者的聚集地，动漫、cosplay、同人创作交流。',
        leader: '宅魂小周',
        memberCount: 67,
        foundedDate: '2019-05-12',
        logo: '/assets/clubs/anime.jpg',
        contact: '微博：@校园动漫社',
        tags: ['动漫', '二次元', '创作', 'ACGN']
      },
      '科创社': {
        description: '科技创造未来，聚焦科技创新和项目实践。',
        leader: '极客小钱',
        memberCount: 42,
        foundedDate: '2023-01-08',
        logo: '/assets/clubs/sci.jpg',
        contact: 'GitHub：TechInnovationClub',
        tags: ['科技', '创新', '实践', '项目开发']
      },
      '美术社': {
        description: '用画笔记录美好，用色彩表达情感。涵盖绘画、素描、水彩等多种形式。',
        leader: '画家小孙',
        memberCount: 35,
        foundedDate: '2021-03-15',
        logo: '/assets/clubs/art.jpg',
        contact: '微信：art_club_2022',
        tags: ['美术', '绘画', '创意', '艺术创作']
      }
    };
    
    // 默认数据（如果找不到对应的社团）
    const defaultData = {
      description: '这个社团很神秘，还没有留下介绍哦~',
      leader: '未知',
      memberCount: 0,
      foundedDate: '未知',
      logo: '/assets/clubs/default.JPG',  // 建议创建一个默认图片
      contact: '暂无联系方式',
      tags: ['新社团']
    };
    
    // 模拟API请求延迟
    setTimeout(() => {
      this.setData({
        clubInfo: clubData[clubName] || defaultData,
        activities: this.generateMockActivities(clubName),
        members: this.generateMockMembers(clubName),
        isJoined: this.checkIfJoined(clubName), // 检查是否已加入
        isLoading: false
      });
    }, 800);
  },

  // 生成模拟活动数据
  generateMockActivities(clubName) {
    const today = new Date();
    return [
      {
        id: 1,
        title: `${clubName}本周训练`,
        date: this.formatDate(new Date(today.getTime() + 86400000)), // 明天
        time: '19:00-21:00',
        location: '体育馆',
        participants: Math.floor(Math.random() * 30) + 10
      },
      {
        id: 2,
        title: `${clubName}招新活动`,
        date: this.formatDate(new Date(today.getTime() + 3 * 86400000)), // 3天后
        time: '14:00-17:00',
        location: '学生广场',
        participants: Math.floor(Math.random() * 50) + 20
      },
      {
        id: 3,
        title: `${clubName}友谊赛`,
        date: this.formatDate(new Date(today.getTime() + 7 * 86400000)), // 一周后
        time: '15:00-18:00',
        location: clubName.includes('篮') ? '篮球场' : 
                 clubName.includes('足') ? '足球场' : '活动中心',
        participants: Math.floor(Math.random() * 40) + 15
      }
    ];
  },

  // 生成模拟成员数据
  generateMockMembers(clubName) {
    const names = ['张三', '李四', '王五', '赵六', '钱七', '孙八', '周九', '吴十'];
    const roles = ['社长', '副社长', '部长', '资深成员', '普通成员'];
    
    return names.slice(0, 5).map((name, index) => ({
      id: index + 1,
      name: name,
      role: roles[index] || '成员',
      avatar: `/assets/clubs/default.JPG`
    }));
  },

  // 检查是否已加入该社团
  checkIfJoined(clubName) {
    // 这里可以从本地存储读取用户的加入状态
    try {
      const joinedClubs = wx.getStorageSync('joinedClubs') || [];
      return joinedClubs.includes(clubName);
    } catch (e) {
      console.error('读取存储失败:', e);
      return false;
    }
  },

  // 格式化日期
  formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  },

  // 加入/退出社团
  toggleJoin() {
    const newStatus = !this.data.isJoined;
    const action = newStatus ? '加入' : '退出';
    
    wx.showModal({
      title: `${action}社团`,
      content: `确定要${action}【${this.data.clubName}】吗？`,
      success: (res) => {
        if (res.confirm) {
          // 更新本地存储
          try {
            const joinedClubs = wx.getStorageSync('joinedClubs') || [];
            let newJoinedClubs;
            
            if (newStatus) {
              // 加入社团
              if (!joinedClubs.includes(this.data.clubName)) {
                newJoinedClubs = [...joinedClubs, this.data.clubName];
              }
            } else {
              // 退出社团
              newJoinedClubs = joinedClubs.filter(name => name !== this.data.clubName);
            }
            
            wx.setStorageSync('joinedClubs', newJoinedClubs);
          } catch (e) {
            console.error('存储失败:', e);
          }
          
          // 更新UI状态
          this.setData({ isJoined: newStatus });
          
          wx.showToast({
            title: `${action}成功！`,
            icon: 'success',
            duration: 1500
          });
        }
      }
    });
  },

  // 联系社团
  contactClub() {
    if (this.data.clubInfo.contact) {
      wx.showModal({
        title: '联系方式',
        content: this.data.clubInfo.contact,
        showCancel: false,
        confirmText: '复制',
        success: (res) => {
          if (res.confirm) {
            wx.setClipboardData({
              data: this.data.clubInfo.contact,
              success: () => {
                wx.showToast({
                  title: '已复制到剪贴板',
                  icon: 'success'
                });
              }
            });
          }
        }
      });
    } else {
      wx.showToast({
        title: '暂无联系方式',
        icon: 'none'
      });
    }
  },

  // 查看活动详情
  viewActivity(e) {
    const activityId = e.currentTarget.dataset.id;
    const activity = this.data.activities.find(item => item.id === activityId);
    
    if (activity) {
      wx.navigateTo({
        url: `/pages/activity-detail/activity-detail?data=${encodeURIComponent(JSON.stringify(activity))}`
      });
    }
  },

  // 查看全部活动
  viewAllActivities() {
    const clubName = encodeURIComponent(this.data.clubName);
    wx.navigateTo({
      url: `/pages/activity-list/activity-list?club=${clubName}`
    });
  },
});