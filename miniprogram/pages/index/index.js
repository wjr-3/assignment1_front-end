// pages/index/index.js
Page({
  data: {
    contacts: [],
    filteredContacts: [],
    searchKeyword: ''
  },

  onLoad: function () {
    this.loadContacts();
  },

  onShow: function() {
    // 页面显示时重新加载数据，确保显示最新信息
    this.loadContacts();
  },

  loadContacts: function () {
    const db = wx.cloud.database();
    const collection = db.collection('contacts');
    
    collection.orderBy('createTime', 'desc').get({
      success: res => {
        console.log('获取联系人成功', res.data);
        this.setData({
          contacts: res.data,
          filteredContacts: res.data
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

  onSearchInput: function (e) {
    const keyword = e.detail.value;
    this.setData({
      searchKeyword: keyword
    });
    
    if (keyword) {
      const filtered = this.data.contacts.filter(item => 
        item.name.includes(keyword) || item.phone.includes(keyword)
      );
      this.setData({
        filteredContacts: filtered
      });
    } else {
      this.setData({
        filteredContacts: this.data.contacts
      });
    }
  },

  goToAdd: function () {
    wx.navigateTo({
      url: '/pages/add/add'
    });
  },

  goToEdit: function (e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/edit/edit?id=${id}`
    });
  },

  deleteContact: function (e) {
    // 移除 e.stopPropagation()，因为现在使用 catchtap
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这个联系人吗？',
      success: (res) => {
        if (res.confirm) {
          const db = wx.cloud.database();
          const collection = db.collection('contacts');
          
          collection.doc(id).remove({
            success: res => {
              console.log('删除成功', res);
              wx.showToast({
                title: '删除成功',
                icon: 'success'
              });
              this.loadContacts(); // 重新加载数据
            },
            fail: err => {
              console.error('删除失败', err);
              wx.showToast({
                title: '删除失败',
                icon: 'none'
              });
            }
          });
        }
      }
    });
  }
});