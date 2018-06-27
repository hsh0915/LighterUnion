//index.js
var Bmob = require('../../utils/bmob.js')// 引用bmob sdk
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
//获取应用实例
const app = getApp()
var currentUser = Bmob.User.current(); // 获取当前用户

Page({
	data: {
		content: "123524", // 测试专用小可爱
		imgUrls: [],  // 存放后端传过来的images的对象
		indicatorDots: true, // 循环小点
		autoplay: true, // 图片自动循环
		interval: 3000, // 图片切换的间隔
		duration: 1000, // 图片切换的速度
		tabs: ["资金流入情况", "资金流出情况"], // navbar
		activeIndex: 0,  // navbar初始的位置
		sliderOffset: 0, // navbar
		sliderLeft: 0,  // navbar
		incomes: []   ,   // 从DB返回收资情况
		outfunds:[]  //  DB返回支出情况
	},
	//事件处理函数
	bindViewTap: function () {

	},
	onLoad: function () {
		var that = this; // ??
		// var Diary1 = Bmob.Object.extend("income");  // 从后端获取test表的title
		// var query1 = new Bmob.Query(Diary1);
		// query1.get("B8RmOOO2", {
		// 	success: function (result) {
		// 		// The object was retrieved successfully.
		// 		that.setData({content : result.get("user")});
		// 		console.log("该日记标题为" + result.get("user"));
		// 	},
		// 	error: function (result, error) {
		// 		console.log("查询失败");
		// 	}
		// });
		var Diary = Bmob.Object.extend("images");     // 从后端获取swiper中图片的URls
		var query = new Bmob.Query(Diary);
		query.find({          // 查询所有数据
			success: function (results) {
				// console.log("共查询到 " + results.length + " 条记录");
				that.setData({ imgUrls: results }) //  怎么把每一条URL存储在imgUrls数组里面？ 直接存储整个对象，在imgUrls
				// 循环的每项中调用item.url
			},
			error: function (error) {
				console.log("查询失败: " + error.code + " " + error.message);
			}

		});
		var Diary1 = Bmob.Object.extend("income");  // 查询incomes所有数据
		var query1 = new Bmob.Query(Diary1);
		query1.find({          
			success: function (res) {
				// console.log("共查询到 " + res.length + " 条记录");
				that.setData({ incomes: res })
			},
			error: function (error) {
				console.log("查询失败: " + error.code + " " + error.message);
			}
		});
		var Diary2 = Bmob.Object.extend("OutflowOfFunds");  // 查询outflowOfFunds所有数据
		var query2 = new Bmob.Query(Diary2);
		query2.find({          
			success: function (res) {
				// console.log("共查询到 " + res.length + " 条记录");
				that.setData({ outfunds: res })
			},
			error: function (error) {
				console.log("查询失败: " + error.code + " " + error.message);
			}
		});
		// navbar
		wx.getSystemInfo({    
			success: function (res) {
				that.setData({
					sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
					sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
				});
			}
		});
		// navbar

	},

	tabClick: function (e) { // navbar
		this.setData({
			sliderOffset: e.currentTarget.offsetLeft,
			activeIndex: e.currentTarget.id
		});
	},
	// onReady: function () {
	// 	UserInfo: app.appData.UserInfo;
	// },
})
