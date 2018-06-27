//app.js
const Bmob = require('/utils/bmob.js');  // 将bmob-sdk引入到微信小程序中
Bmob.initialize("31e8ac8bfa5a5a1518923aa960da81f5",
	"15861cab6d7f7753419e3712bee13aaa");

App({
	appData: {
	},
	onLaunch: function () {
		var that = this
		var user = new Bmob.User() //实例化一个用户对象
		wx.login({
			success: function (res) {
				user.loginWithWeapp(res.code).then(function (user) {
					var openid = user.get("authData").weapp.openid;
					// console.log(user, 'user', user.id, res);
					if (user.get("nickName")) {
						// 第二次登录，打印用户之前保存的昵称
						// console.log(user.get("nickName"), 'res.get("nickName")');
						//更新openid
						wx.setStorageSync('openid', openid)
					} else {//注册成功的情况
						var u = Bmob.Object.extend("_User");
						var query = new Bmob.Query(u);
						query.get(user.id, {
							success: function (result) {
								console.log(user.id);
								// console.log("查询成功");
								wx.setStorageSync('own', result.get("uid"));
							},
							error: function (result, error) {
								console.log("查询失败");
							}
						});
						// <!-- 获取用户信息 -->
						wx.getSetting({
							success: res => {
								if (res.authSetting['scope.userInfo']) {
									//保存用户其他信息，比如昵称头像之类的
									wx.getUserInfo({
										success: function (result) {
											that.globalData.userInfo = result.userInfo
											var userInfo = result.userInfo;
											var nickName = userInfo.nickName;
											var avatarUrl = userInfo.avatarUrl;
											var u = Bmob.Object.extend("_User");
											var query = new Bmob.Query(u);
											// 这个 id 是要修改条目的 id，你在生成这个存储并成功时可以获取到，请看前面的文档
											query.get(user.id, {
												success: function (result) {
													// 自动绑定之前的账号
													console.log(user.id);
													result.set('nickName', nickName);
													result.set("userPic", avatarUrl);
													result.set("openid", openid);
													result.save();

												}
											});
											// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
											// 所以此处加入 callback 以防止这种情况
											if (this.userInfoReadyCallback) {
												this.userInfoReadyCallback(res)
											}
										}
									})
								}
							}
						})
						// <!-- 获取用户信息 -->
					}
				}, function (err) {
					console.log(err, 'errr');
				});
			}
		});
	},

	globalData: {
		userInfo: null
	}
})