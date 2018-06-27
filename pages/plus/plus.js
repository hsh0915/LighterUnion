var app = getApp()
Page({
	btnclick: function () {
		wx.navigateTo({
			url: '../apply/apply',
		})
		// if (app.appData.userinfo == null) {
		// 	wx.redirectTo({
		// 		url: '../login/login',
		// 	})
		// } else {
		// 	wx.navigateTo({
		// 		url: '../apply/apply',
		// 	})
		// }
	}
})