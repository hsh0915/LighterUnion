// var Bmob = require('../../utils/bmob.js')
// var currentUser = Bmob.User.current(); // 获取当前用户
var app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		userInfo: {},
		hasUserInfo: false,
		canIUse: wx.canIUse('button.open-type.getUserInfo')
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		// if  (app.appData.userinfo  ==  null) {
		// 	      wx.redirectTo({
		// 		        url:  '../login/login',
		// 	      })
		//     } else {
		// 	      this.setData({ username:  app.appData.userinfo.username })
		//     }  
	},
	getUserInfo: function (e) {
		console.log(e)
		app.globalData.userInfo = e.detail.userInfo
		this.setData({
			userInfo: e.detail.userInfo,
			hasUserInfo: true
		})
	},
	open: function () {
		wx.showActionSheet({
			itemList: ['18835106338', '382855904@qq.com', 'address：xjtu'],
			success: function (res) {
				if (!res.cancel) {
					console.log(res.tapIndex)
				}
			}
		});
	}


})