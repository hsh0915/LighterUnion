var Bmob= require('../../utils/bmob.js')

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		results:[] ,// 从apply表获取申请详情
		hasUserInfo: false,  // 如果获取到则 改为true
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that=this;
		var currentUser = Bmob.User.current();
		var id=currentUser.id;
		// console.log("当前用户ID："+id);
		var Diary = Bmob.Object.extend("apply");
		//创建查询对象，入口参数是对象类的实例
		var query = new Bmob.Query(Diary);	
		query.equalTo("user", id);      // 条件查询，当user== 当前用户的ID时返回结果~	
		query.find({
			success: function(results) {
			//   console.log("共查询到 " + results.length + " 条记录");	
			  that.setData({
				results:results,
				})
			},
			error: function(error) {
			  console.log("查询失败: " + error.code + " " + error.message);
			}
			});
			this.setData({
				hasUserInfo: true
			})
	},
	
})