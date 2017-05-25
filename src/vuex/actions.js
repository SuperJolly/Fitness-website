import * as types from './mutations-types'
import * as client_api  from './store-client-api'
import getters from './getters'

//获取最新发布的文章
export const FETCH_ITEMS = ({ commit, state }, { type, currentPage }) => {
	if(!!type) {
		return client_api.fetchItem(type, state.pageSize, currentPage)
			.then((res) => {
				commit(types.SET_ITEMS, { res })
				return true
			})
			.catch((err) => {
				console.log(err);
			})
	} else {
		return Promise.resolve()
	}
}

//查找该用户是否已注册
export const SAME_USERNAME = ({commit, state}, {value}) => {
	if(!!value) {
		return client_api.findSameUser(value)
			.then((res) => {
				return res.data
			})
			.catch((err) => {
				throw err
			})
	} else {
		return Promise.resolve()
	}
}

//注册用户
export const REGISTER_USER = ({commit, state}, {data}) => {
	return client_api.registerUser(data)
		.then((res) => {
			return res.data
		})
		.catch((err) => {
			throw err
		})
}

//用户登录
export const LOGIN_USER = ({commit, state}, {data}) => {
	return client_api.loginUser(data)
		.then((res) => {
			if(res.data.rescode === 0) {
				commit(types.SET_USER_NAME, {res})
			}
			return res.data
		})
		.catch((err) => {
			throw err
		})
}

export const GET_ALL_PLANS = ({commit, state}, {date}) => {
	const data = {
		uid: state.userId || '',
		date: date || []
	}
	return client_api.getPlansByDate(data)
		.then((res) => {
			if(res.data.rescode === 203) {
				commit(types.GET_ALL_PLANS_BY_DATE, {data:res.data})
			}
		})
		.catch((err) => {
			throw err
		})
}
//获取当月是否设置月计划,若有则返回
export const GET_WEEK_PLAN = ({commit, state}, {data}) => {
	return client_api.getWeekPlan(data)
		.then((res) => {
			return res.data.rescode
		})
		.catch((err) => {
			throw err
		})
}

//获取当周是否设置周计划,若有则返回
export const GET_MONTH_PLAN = ({commit, state}, {data}) => {
	return client_api.getMonthPlan(data)
		.then((res) => {
			return res.data.rescode
		})
		.catch((err) => {
			throw err
		})
}

//设置计划数
export const SET_PLAN_NUM = ({commit, state}, {data}) => {
	return client_api.setPlanNum(data)
		.then((res) => {
			if(res.data.rescode === 202) {
				commit(types.SET_PLAN_NUM, {data})
			}
			return res.data.rescode
		})
		.catch((err) => {
			throw err
		})
}


//查询今日训练情况
export const GET_TODAY_COMPLETE = ({commit, state}, {date}) => {
	const data = {
		date,
		uid: state.userId
	}
	return client_api.getTodayPlan(data)
		.then((res) => {
			if(res.data.rescode === 203) {
				commit(types.GET_TODAY_NUMS, {res})
			}
		})
		.catch((err) => {
			throw err
		})
}

//设置今日训练情况
export const SET_TODAY_COMPLETE = ({commit, state}, {date, value, ptype}) => {
	const data = {
		date,
		value,
		ptype,
		uid: state.userId
	}
	return client_api.setTodayPlan(data)
		.then((res) => {
			if(res.data.rescode === 202) {     //更新成功
				commit(types.SET_TODAY_NUM, {data})
				return res.data.rescode
			} else if(res.data.error_code === 402) {
				throw new Error(res.data.error_type+": "+res.data.error_message)
			}
		})
		.catch((err) => {
			throw err
		})
}

//获取该类型的本月训练情况
export const GET_MONTH_NUM_BY_TYPE = ({commit, state}, {date, ptype}) => {
	const data = {
		date,
		ptype,
		uid: state.userId
	}
	return client_api.getMonthNumByType(data)
		.then((res) => {
			if(res.data.rescode === 203) {
				return res.data.resdata
			}
		})
		.catch((err) => {
			throw err
		})
}

//校验当前用户名和密码是否一致
export const VALIDATE_NAME_AND_PWD = ({commit, state}, {pwd}) => {
	const data = {
		uid: state.userId,
		pwd
	}

	return client_api.valiedateNameAndPwd(data)
		.then((res) => {
			if(res.data.rescode === 0) {       //密码校验成功
				console.log('密码校验成功')
				return res.data.rescode
			} else {
				console.log('密码不正确')
				return res.data.rescode
			}
		})
		.catch((err) => {
			throw err
		})
}

//保存当前用户设置
export const SAVE_USER_INFO = ({commit, state}, {data}) => {
	return client_api.saveUserInfo(data)
		.then((res) => {
			if(res.data.rescode === 202) {
				commit(types.SET_USER_CACHE, {'data':res.data.data})
			}
			return res.data.rescode
		})
		.catch((err) => {
			throw err
		})
}

//获取周/月排行榜
export const GET_TOP_ALL_RANK = ({commit, state}, {weekDate, monthDate}) => {
	const data = {
		weekDate,
		monthDate
	}
	const resData = {
		week: [],
		month: []
	}
	return Promise.all([client_api.getTopWeekRank(data),client_api.getTopMonthRank(data)])
		.then((res) => {
			res.forEach((v) => {
				if(v.data.rescode === 203) {
					console.log(v.data.type)
					if(v.data.type === 'week') {
						resData.week = v.data.resdata
					} else {
						resData.month = v.data.resdata
					}
				}
			})
			return resData
		})
		.catch((err) => {
			throw err
		})
}

export const LOGIN_ADMIN = ({commit, state}, {uname, upwd}) => {
	const data = {
		uname,
		upwd
	}
	return client_api.adminLogIn(data)
		.then((res) => {
			return res.data
		})
		.catch((err) => {
			throw err
		})
	console.log(data)
}

export const LOAD_USER_LIST = ({commit, state}) => {
	return  client_api.getUserList()
		.then((res) => {
			return res.data
		})
		.catch((err) => {
			throw err
		})
}

export const DELETE_ONE_USER = ({commit, state}, {uname}) => {
	const data = {
		uname
	}
	return client_api.deleteOneUser(data)
		.then((res) => {
			return res.data.rescode
		})
		.catch((err) => {
			throw err
		})
}

export const EDIT_ONE_USER_INFO = ({commit, state}, data) => {
	return client_api.editOneUserInfo(data)
		.then((res) => {
			return res.data.rescode
		})
		.catch((err) => {
			throw err
		})
}