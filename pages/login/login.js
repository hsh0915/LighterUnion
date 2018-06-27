var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
	data: {
		phonenumber: null,
		password: null,
		motto: '欢迎来到用户界面',
		array: ['美国', '+86 中国', '巴西', '日本'],
		objectArray: [
			{
				id: 0,
				name: '美国'
			},
			{
				id: 1,
				name: '+86 中国'
			},
			{
				id: 2,
				name: '巴西'
			},
			{
				id: 3,
				name: '日本'
			}
		],
		index: 1

	},

  /**
   * 生命周期函数--监听页面加载
   */
	onLoad: function (options) {

	},
	bindPickerChange: function (e) {
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			index: e.detail.value
		})
	},
	usernameInput: function (event) {
		 console.log(event)

		this.setData({ username: event.detail.value })

	},
	passwordInput: function (event) {
		console.log(event)
		this.setData({ password: event.detail.value })
	},
	wetchatLogin: function () {
		wx.navigateTo({ url: '/pagesAdd/wcLogin/wcLogin' })
	},
	loginBtnClick: function () {
		// 省略了将username和password 在服务器验证的环节
		if (this.data.username == null) {   // 验证输入的账号是否为空
			wx.showToast({
				title: '请输入正确的手机号',
				icon: 'none',
				duration: 2000
			})
			return
		}
		if (this.data.password == null) {
			wx.showToast({
				title: '请输入正确的验证码',
				icon: 'none',
				duration: 2000
			})
			return
		}
		app.appData.userinfo = { username: this.data.username, password: this.data.password }
		wx.switchTab({
			url: '../user/user',
		})
	},

})