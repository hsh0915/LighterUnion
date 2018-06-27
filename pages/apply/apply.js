var Bmob = require('../../utils/bmob.js')// 引用bmob sdk
Page({
	data: {
		showTopTips: false,
		name:null, // 申请人姓名
		idcard:null,// 身份证号
		pname:null, // 监护人姓名
		pidcard:null, // 监护人身份证号
		cardNum:null, // 银行卡号
		phoneNum:null, //手机号
		moneyNum:null, // 申请的金额数
		bankCodes: ["建行", "农行", "工行", "交行"],
		bankCodeIndex: 0,

		relations: ["父子", "母子", "其它"],
		relationIndex: 0,

		isAgree: true,
	},
	// showTopTips: function () {  
	// 	var that = this;
	// 	this.setData({
	// 		showTopTips: true
	// 	});
	// 	setTimeout(function () {
	// 		that.setData({
	// 			showTopTips: false
	// 		});
	// 	}, 3000);
	// },
	
	bindDateChange: function (e) {
		this.setData({
			date: e.detail.value
		})
	},
	bindTimeChange: function (e) {
		this.setData({
			time: e.detail.value
		})
	},
	bindBankCodeChange: function (e) {
		// console.log('picker country code 发生选择改变，携带值为', e.detail.value);
		this.setData({
			bankCodeIndex: e.detail.value
		})
	},
	bindRelationyChange: function (e) {
		// console.log('picker country 发生选择改变，携带值为', e.detail.value);
		this.setData({
			relation: e.detail.value
		})
	},
	// bindAccountChange: function (e) {
	// 	console.log('picker account 发生选择改变，携带值为', e.detail.value);

	// 	this.setData({
	// 		accountIndex: e.detail.value
	// 	})
	// },
	bindAgreeChange: function (e) {
		this.setData({
			isAgree: !!e.detail.value.length
		});
	},
	nameInput:function(e){
		// console.log(e)
		this.setData({
			name: e.detail.value
		})
	},
	idcardInput:function(e){
		// console.log(e)
		this.setData({
			idcard: e.detail.value
		})
	},
	pnameInput:function(e){
		// console.log(e)
		this.setData({
			pname: e.detail.value
		})
	},
	pidcardInput:function(e){
		// console.log(e)
		this.setData({
			pidcard: e.detail.value
		})
	},
	cardNumInput:function(e){
		// console.log(e)
		this.setData({
			cardNum: e.detail.value
		})
	},
	moneyNUmInput:function(e){
		// console.log(e)
		if(e.detail.value>5000){   // 校验申请金额是否大于5000
			wx.showToast({
				title: '"单次申请金额不能超过5000"',
				icon: 'none',
				duration: 2000
			})
			return
		}
		this.setData({
			moneyNum: e.detail.value
		})
	},
	
	phoneInput:function(e){
		// console.log(e)
		this.setData({
			phoneNum: e.detail.value
		})
	},
	// 以下代码为校验input控件输入内容
	incardbindblur:function(e){   // 校验身份证号位数是否为
		if (e.detail.value.length != 18) {
			wx.showToast({
				title: '"请输入有效的18位身份证号码"',
				icon: 'none',
				duration: 2000
			})
			return
		}
	},
	phonebindblur:function(e){   // 校验手机号码是否为11位
		if (e.detail.value.length != 11) { 
			wx.showToast({
				title: '"请输入有效的11位手机号码"',
				icon: 'none',
				duration: 2000
			})
			return
		}
	},
	//以上代码为校验input控件输入内容
	loginBtnClick: function () {
		var that = this
		// 省略了将username和password 在服务器验证的环节
		if (that.data.name == null || that.data.idcard == null || that.data.pname == null
			|| that.data.pidcard == null || that.data.cardNum == null || that.data.phoneNum == null ||  that.data.moneyNum==null) {// 验证输入的账号是否为空
			wx.showToast({
				title: '"请完善申请信息"',
				icon: 'none',
				duration: 2000
			})
			return
		}		

		var currentUser = Bmob.User.current();
		var Diary = Bmob.Object.extend("apply"); // 往apply表中保存用户申请信心
		var diary = new Diary();
		diary.set("name", that.data.name);
		diary.set("idcard", that.data.idcard);
		diary.set("pname", that.data.pname);
		diary.set("pidcard", that.data.pidcard);
		diary.set("cardNum", that.data.cardNum);
		diary.set("phoneNum", that.data.phoneNum);
		diary.set("money",that.data.moneyNum);
		diary.set("user",currentUser.id);

		//添加数据，第一个入口参数是null
		diary.save(null, {
			success: function (result) {
				// 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
				console.log("日记创建成功, objectId:" + result.id);
			},
			error: function (result, error) {
				// 添加失败
				console.log('创建日记失败');
			}
		});
		wx.navigateTo({   // 跳转到”申请成功“提示界面
			url: '/pages/apply/msg_success',
		  })
	},
	
});