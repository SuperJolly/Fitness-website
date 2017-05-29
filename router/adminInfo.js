const express = require('express')
const router = express.Router()

const adminInfoApi = require('../models/dbApi').adminInfoAPI

router.post('/admin_login', (req, res) => {
	const data = {
		uname: req.body.params.uname || '',
		upwd: req.body.params.upwd || ''
	}
	adminInfoApi.adminLogIn(data).then((resdata) => {
		if(resdata !== null) {
			res.json({'rescode': 203,'resdata':resdata.adminName})
		} else {
			res.json({'rescode': 400})
		}
	}).catch((err) => {
		console.log(err)
		res.json({err,'rescode': 404})
	})
})

router.get('/get_user_list', (req, res) => {

	adminInfoApi.getUserList().then((resdata) => {
		res.json(resdata)
	}).catch((err) => {
		res.json(err)
	})
})

router.post('/delete_one_user', (req, res) => {
	const data = {
		uname: req.body.params.uname || '',
	}
	adminInfoApi.deleteOneUser(data)
		.then((resdata) => {
			if(resdata.result.n === 1 && resdata.result.ok === 1) {
				res.json({'rescode': 204})
			}
		})
		.catch((err) => {
			res.json({err, 'rescode': 405})
		})
})

router.post('/edit_one_user', (req, res) => {
	const data = req.body.params

	adminInfoApi.editOneUserInfo(data)
		.then((resdata) => {
			if(resdata.nModified === 1) {
				res.json({'rescode': 202})
			}
		})
		.catch((err) => {
			res.json({err, 'rescode':402})
		})
})
module.exports = router