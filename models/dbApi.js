const listItemModel = require('../data/pagelist')
const userListModel = require('../data/users')
const adminListModel = require('../data/admins')
const listItemAPI =  {
	findByType: function(type, size, curPage) {
		return listItemModel.findItemsByType(type, size, curPage)
	},
	findItemCount: function(type) {
		return listItemModel.findItemCount(type)
	}
}
const userInfoAPI = {
	findUserByName: function(uname) {
		return userListModel.findUserByName(uname)
	},
	addNewUser: function(data) {
		return userListModel.addNewUser(data)
	},
	loginUser: function(data) {
		return userListModel.loginUser(data)
	},
	getTopWeekRank: function(data) {
		return userListModel.getTopWeekRank(data)
	},
	getTopMonthRank: function(data) {
		return userListModel.getTopMonthRank(data)
	},
	getWeekPlan: function(data) {
		return userListModel.getWeekPlan(data)
	},
	getMonthPlan: function(data) {
		return userListModel.getMonthPlan(data)
	},
	setPlanNum: function(data) {
		return userListModel.setPlanNum(data)
	},
	getPlansByDate: function(data) {
		return userListModel.getPlansByDate(data)
	},
	getTodayNum: function(data) {
		return userListModel.getTodayNum(data)
	},
	setTodayNum: function(data) {
		return userListModel.setTodayNum(data)
	},
	getMonthNumByType: function(data) {
		return userListModel.getMonthNumByType(data)		
	},
	validate_user: function(data) {
		return userListModel.loginUser(data)	
	},
	saveUserInfo: function(data) {
		return userListModel.saveUserInfo(data)
	},
	getMailData: function() {
		return userListModel.getMailData()
	}
}

const adminInfoAPI = {
	adminLogIn: function(data) {
		return adminListModel.adminLogIn(data)
	},
	getUserList: function() {
		return userListModel.getUserList()
	},
	deleteOneUser: function(data) {
		return userListModel.deleteOneUser(data)
	},
	editOneUserInfo: function(data) {
		return userListModel.editOneUserInfo(data)
	}
}
module.exports = {
	listItemAPI,
	userInfoAPI,
	adminInfoAPI
}