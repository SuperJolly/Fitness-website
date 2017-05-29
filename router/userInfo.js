const express = require('express')
const router = express.Router()
const userInfoApi = require('../models/dbApi').userInfoAPI
//根据用户名查询该用户是否存在
router.get('/get_user_by_name', (req, res) => {
	const uname = req.query.uname

	userInfoApi.findUserByName(uname)
		.then((data) => {
			if(data === null) {              //可以注册该用户名
				res.json({
					rescode: 0
				})
			} else if(data && data.name){    //反之,不可以注册该用户名
				res.json({
					rescode: 1
				})				
			}
		})
		.catch((err) => {
			res.json(err)
		})
})

router.get('/get_top_week_rank', (req, res) => {
	const data = req.query
	userInfoApi.getTopWeekRank(data).onResolve((resdata) => {
		if(!resdata) {              // 暂无用户数据
			res.json({'rescode':400})
		}else if(resdata.name && resdata.name.slice(-5) === 'Error' && resdata.message) {          // return ERROR
			res.json({'error_type':resdata.name,'error_message':resdata.message,'error_code':402})
		} else {
			res.json({resdata,'rescode':203,'type':'week'})
		}
	})
})

router.get('/get_top_month_rank', (req, res) => {
	const data = req.query
	userInfoApi.getTopMonthRank(data).onResolve((resdata) => {
		if(!resdata) {              // 暂无用户数据
			res.json({'rescode':400})
		}else if(resdata.name && resdata.name.slice(-5) === 'Error' && resdata.message) {          // return ERROR
			res.json({'error_type':resdata.name,'error_message':resdata.message,'error_code':402})
		} else {
			res.json({resdata,'rescode':203,'type':'month'})
		}
	})
})

router.post('/register_user', (req, res) => {
	const data = {
		uname:req.body.params.uname || '',
		upwd:req.body.params.upwd || ''
	}
	userInfoApi.addNewUser(data)
		.then((data) => {
			res.json({
				rescode: 0
			})
		})
		.catch((err) => {
			res.json(err)
		})
})

router.post('/login_user', (req, res) => {
	const data = {
		uname:req.body.params.uname || '',
		upwd:req.body.params.upwd || ''	
	}
	userInfoApi.loginUser(data)
		.then((data) => {
			if(data !== null) {             //登录成功
				res.json({
					userid: data.name,
					rescode: 0
				})
			} else {
				res.json({
					rescode: 1
				})
			}
		})
		.catch((err) => {
			res.json(err)
		})
})

router.post('/get_week_plan', (req, res) => {
	const data = {
		uname: req.body.params.uname || '',
		type: req.body.params.type || '',
		date: req.body.params.date || ''
	}

	userInfoApi.getWeekPlan(data)
		.then((resdata) => {
			if(resdata !== null) {
				res.json({resdata,'rescode': 203})
			} else {
				res.json({
					'rescode': 300
				})
			}
		})
		.catch((err) => {
			res.json(err)
		})
})

router.post('/get_month_plan', (req, res) => {
	const data = {
		uname: req.body.params.uname || '',
		type: req.body.params.type || '',
		date: req.body.params.date || ''
	}

	userInfoApi.getMonthPlan(data)
		.then((resdata) => {
			if(resdata !== null) {
				res.json({resdata,'rescode': 203})
			} else {
				res.json({
					'rescode': 300
				})
			}
		})
		.catch((err) => {
			res.json(err)
		})
})

router.post('/set_plan_num',(req, res) => {
	const data = {
		uname: req.body.params.uname || '',
		type: req.body.params.type || null,
		date: req.body.params.date || '',
		num: req.body.params.num || 0,
		w_type: req.body.params.w_type
	}
	//来自mpromise的回调
	userInfoApi.setPlanNum(data).onResolve((resdata) => {
		if(!resdata) {              // resdata == NULL
			res.json({'rescode':400})
		}else if(resdata.name && resdata.name.slice(-5) === 'Error' && resdata.message) {          // return ERROR
			res.json({'error_type':resdata.name,'error_message':resdata.message,'error_code':402})
		} else {
			const filterPlans = resdata.plans.filter((v) => {
				return v.timeStamp === data.date && v.w_m_type === data.w_type
			})
			res.json({'plans':filterPlans,'rescode':202})
		}
	})
})

router.post('/get_all_plan', (req, res) => {
	const data = {
		uname: req.body.params.uname || '',
		date: req.body.params.date || []
	}
	userInfoApi.getPlansByDate(data).onResolve((resdata) => {
		if(!resdata) {             // resdata == NULL
			res.json({'rescode':300})
		} else if(resdata.name && resdata.name.slice(-5) === 'Error' && resdata.message){
			res.json({'error_type':resdata.name,'error_message':resdata.message,'error_code':404})
		} else {
			res.json({'plans':resdata, 'rescode':203})
		}
	})

})

router.post('/get_today_num', (req, res) => {
	const data = {
		uname: req.body.params.uname || '',
		date: req.body.params.date || ''
	}
	userInfoApi.getTodayNum(data)
		.then((resdata) => {
			const complated = resdata.dayComplete.filter((v) => {
				return v.timeId === data.date
			})
			res.json({'resdata':complated,'rescode':203})
		})
		.catch((err) => {
			res.json(err)
		})
})

router.post('/set_today_num', (req, res) => {
	const data = {
		value: req.body.params.value || 0,
		date: req.body.params.date || '',
		uname: req.body.params.uname || '',
		type: req.body.params.type
	}
	userInfoApi.setTodayNum(data).onResolve((resdata) => {
		if(!resdata) {
			res.json({'rescode': 400})
		} else if(resdata.name && resdata.name.slice(-5) === 'Error' && resdata.message) {
			res.json({'error_type':resdata.name,'error_message':resdata.message,'error_code':402})
		} else {
			res.json({'rescode':202})
		}
	})
})

router.post('/get_monthNum_byType', (req, res) => {
	const data = {
		type: req.body.params.type,
		uname: req.body.params.uname || '',
		date: req.body.params.date || ''
	}
	userInfoApi.getMonthNumByType(data)
		.then((resdata) => {
			const resObj = {
				type: data.type,
				data: []
			}
			resdata.dayComplete.forEach((v) => {
				v.items.forEach((s) => {
					if(s.p_type === resObj.type) {
						resObj.data.push({
							time:v.timeId,
							counts: s.counts
						})
					}
				})
			})
			res.json({'resdata':resObj,'rescode':203})
		})
		.catch((err) => {
			res.json(err)
		})
})

router.post('/validate_user', (req, res) => {
	const data = {
		uname: req.body.params.uname || '',
		upwd: req.body.params.pwd || ''
	}
	userInfoApi.validate_user(data)
		.then((resdata) => {
			if(resdata !== null) {
				res.json({'rescode':0})
			} else {
				res.json({'rescode':1})
			}
		})
		.catch((err) => {
			res.json(err)
		})
})

router.post('/save_user_info', (req, res) => {
	const data = req.body.params
	userInfoApi.saveUserInfo(data)
		.then((resdata) => {
			if(resdata !== null) {
				res.json({data,'rescode':202})
			} else {
				res.json({'rescode':402})
			}
		})
		.catch((err) => {
			res.json(err)
		})
})
module.exports = router