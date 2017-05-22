import axios from 'axios'

export function fetchItem (type,pageSize,currentPage) {
	return axios.post('/api/items', {
		params: {
			listType: type,
			size: pageSize,
			curPage: currentPage
		}
	})
}

export function findSameUser(val) {
	return axios.get('/api/get_user_by_name', {
		params: {
			uname: val
		}
	})
}

export function registerUser(data) {
	return axios.post('/api/register_user', {
		params: {
			uname: data.uname || '',
			upwd: data.upwd || ''
		}
	})
}

export function loginUser(data) {
	return axios.post('/api/login_user', {
		params: {
			uname: data.uname || '',
			upwd: data.upwd || ''
		}
	})
}

export function getPlansByDate(data) {
	return axios.post('/api/get_all_plan', {
		params: {
			uname: data.uid,
			date: data.date || []
		}
	})
}

export function getWeekPlan(data) {
	return axios.post('/api/get_week_plan', {
		params: {
			uname: data.uid || '',
			type: data.type || '',
			date: data.date || ''
		}
	})
}

export function getMonthPlan(data) {
	return axios.post('/api/get_month_plan', {
		params: {
			uname: data.uid || '',
			type: data.type || '',
			date: data.date || ''
		}
	})
}

export function setPlanNum(data) {
	return axios.post('/api/set_plan_num', {
		params: {
			uname: data.uid || '',
			type: data.type || null,
			w_type: data.w_type,
			date: data.date || '',
			num: data.num
		}
	})
}
 
export function getTodayPlan(data) {
	return axios.post('/api/get_today_num', {
		params: {
			 date: data.date || '',
			 uname: data.uid || ''
		}
	})
}

export function setTodayPlan(data) {
	return axios.post('/api/set_today_num', {
		params: {
			date: data.date || '',
			value: parseInt(data.value) || 0,
			uname: data.uid || '',
			type: data.ptype,
		}
	})
}

export function getMonthNumByType(data) {
	return axios.post('/api/get_monthNum_byType', {
		params: {
			date: data.date || '',
			type: data.ptype,
			uname: data.uid || ''
		}
	})
}

export function valiedateNameAndPwd(data) {
	return axios.post('/api/validate_user', {
		params: {
			pwd: data.pwd || '',
			uname: data.uid || ''
		}
	})
}

export function saveUserInfo(data) {
	return axios.post('/api/save_user_info', {
		params: data
	})
}

export function getTopWeekRank(data) {
	return axios.get('/api/get_top_week_rank', {
		params: data
	})
}

export function getTopMonthRank(data) {
	return axios.get('/api/get_top_month_rank', {
		params: data
	})
}

export function adminLogIn(data) {
	return axios.post('/api/admin_login', {
		params: data
	})
}

export function getUserList() {
	return axios.get('/api/get_user_list')
}

export function deleteOneUser(data) {
	return axios.post('/api/delete_one_user', {
		params: data
	})
}

export function editOneUserInfo(data) {
	return axios.post('/api/edit_one_user', {
		params: data
	})
}