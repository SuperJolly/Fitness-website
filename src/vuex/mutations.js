import * as types from './mutations-types'
import Vue from 'vue'
export default {
	[types.SET_ACTIVE_TYPE](state, payload) {
		state.activeType = payload.type
	},

	[types.SET_LIST](state, payload) {
		state.lists[payload.type] = payload.ids
	},

	[types.SET_ITEMS](state, payload) {
		//post请求返回的res的config里的data是JSON.stringfy后的params
		//get请求返回的res的config里的params未经过转移
		let type = JSON.parse(payload.res.config.data).params.listType
		let {
			res
		} = payload

		state.cpTypeItem.push(type)
		state.lists[type] = []
		state.items[type] = res.data.count
		res.data.items.forEach(item => {
			if(item) {
				const index = item.created_at.indexOf("T");
				item.created_at = item.created_at.slice(0,index)
				state.lists[type].push(item)
			}
		})
	},

	[types.SET_LOG_STATUS](state, payload) {
		state.userlogIn = payload.type
	},

	[types.SET_USER_NAME](state, payload) {
		state.userId = payload.res.data.userid
	},

	[types.GET_ALL_PLANS_BY_DATE](state,payload) {
		const plans = payload.data.plans
		let timeStamp,
			w_m_type,
			p_type,
			counts
		plans.forEach((v,i) => {
			v.pNums.forEach((r)=>{
				state.fieldPlans.forEach((s) => {
					if(s.type === r.p_type) {
						if(v.w_m_type === 0) {
							s.weeklyPlan = true
						} else {
							s.monthlyPlan = true
						}
						s.cachePlans[v.w_m_type] = {
							timeStamp: v.timeStamp,
							w_m_type: v.w_m_type,
							p_type: r.p_type,
							counts: r.counts
						}
					}
				})
				
			})
		})
	},

	[types.SET_PLAN_NUM](state, payload) {
		const {
			date,
			w_type,
			num,
			type
		} = payload.data

		state.fieldPlans.forEach((v) => {
			if(v.type === type) {
				v.cachePlans[w_type] = {
					timeStamp:date,
					w_m_type:w_type,
					p_type:type,
					counts:num
				}
				if(w_type === 0) {
					v.weeklyPlan = true
				} else {
					v.monthlyPlan = true
				}
			}
		})
	},
	[types.GET_TODAY_NUMS](state, payload) {
		const {
			items
		} = payload.res.data.resdata[0]
		if(items) {
			items.forEach((v,i) => {
				state.fieldPlans.forEach((s) => {
					if(s.type === v.p_type) {
						s.dayCounts = v.counts
						s.todayCompleted = true
					}
				})
			})	
		}
	},
	[types.SET_TODAY_NUM](state, payload) {
		const data = payload.data
		if(data) {
			state.fieldPlans.forEach((v) => {
				if(v.type === data.ptype) {
					v.todayCompleted = true
					v.todayCounts = data.value
				}
			})
		}
	},
	[types.SET_USER_CACHE](state, payload) {
		const data = payload.data
		if(data) {
			if(data.intro) {
				state.userIntro = data.intro
			}
		}		
	},
	[types.LOG_OUT_USER](state, payload) {
		state.userlogIn = false
		state.userId = null
		state.fieldPlans.forEach((v) => {
			v.todayCompleted = false
			v.weeklyPlan = false
			v.monthlyPlan = false
			v.cachePlans = ['', '']
			v.dayCounts = 0
		})
	},
	[types.SET_ADMIN_NAME](state, payload) {
		state.admin.adminName = payload.name
	},
	[types.LOG_OUT_ADMIN](state, payload) {
		state.admin.adminName = null
	}
}