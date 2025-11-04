// pages/edit/edit.js
Page({
  data: {
    contactId: '',
    formData: {
      name: '',
      phone: '',
      class: '',
      remark: ''
    }
  },

  onLoad: function (options) {
    this.setData({
      contactId: options.id
    });
    this.loadContact(options.id);
  },

  loadContact: function (id) {
    const db = wx.cloud.database();
    const collection = db.collection('contacts');
    
    collection.doc(id).get({
      success: res => {
        console.log('获取联系人成功', res.data);
        this.setData({
          formData: res.data
        });
      },
      fail: err => {
        console.error('获取联系人失败', err);
        wx.showToast({
          title: '获取数据失败',
          icon: 'none'
        });
      }
    });
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

  updateForm: function (e) {
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
    
    // 更新数据库
    const db = wx.cloud.database();
    const collection = db.collection('contacts');
    
    collection.doc(this.data.contactId).update({
      data: {
        name: formData.name,
        phone: formData.phone,
        class: formData.class,
        remark: formData.remark
      },
      success: res => {
        console.log('更新成功', res);
        wx.showToast({
          title: '更新成功',
          icon: 'success'
        });
        
        // 延迟返回，让用户看到成功提示
        setTimeout(() => {
          wx.navigateBack();
        }, 1500);
      },
      fail: err => {
        console.error('更新失败', err);
        wx.showToast({
          title: '更新失败',
          icon: 'none'
        });
      }
    });
  }
});