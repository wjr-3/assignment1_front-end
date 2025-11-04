// pages/add/add.js
Page({
  data: {
    formData: {
      name: '',
      phone: '',
      class: '',
      remark: '',
      createTime: null
    }
  },

  onNameInput: function (e) {
    this.setData({
      'formData.name': e.detail.value
    });
  },

  onPhoneInput: function (e) {
    this.setData({
      'formData.phone': e.detail.value
    });
  },

  onClassInput: function (e) {
    this.setData({
      'formData.class': e.detail.value
    });
  },

  onRemarkInput: function (e) {
    this.setData({
      'formData.remark': e.detail.value
    });
  },

  submitForm: function (e) {
    const formData = this.data.formData;
    
    // 验证必填字段
    if (!formData.name.trim()) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      });
      return;
    }
    
    if (!formData.phone.trim()) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      });
      return;
    }
    
    // 验证手机号格式
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      });
      return;
    }
    
    // 添加到数据库
    const db = wx.cloud.database();
    const collection = db.collection('contacts');
    
    collection.add({
      data: {
        ...formData,
        createTime: new Date()
      },
      success: res => {
        console.log('添加成功', res);
        wx.showToast({
          title: '添加成功',
          icon: 'success'
        });
        
        // 延迟返回，让用户看到成功提示
        setTimeout(() => {
          wx.navigateBack();
        }, 1500);
      },
      fail: err => {
        console.error('添加失败', err);
        wx.showToast({
          title: '添加失败',
          icon: 'none'
        });
      }
    });
  }
});