const nodemailer = require('nodemailer')
const schedule = require('node-schedule')
const userInfoApi = require('./models/dbApi').userInfoAPI
const moment = require('moment')

let weekDate = ''

//建立周计划
const rule = new schedule.RecurrenceRule()
rule.dayOfWeek = 1
rule.hour = 16
rule.minute = 59
rule.second = 0
schedule.scheduleJob(rule, () => {
	const smtpTransport = nodemailer.createTransport({
		host: 'xxxx',
		secureConnection: false,
		port: 25,
		auth: {
			user: 'xxxx',
			pass: 'xxxx'
		}
	})
	const mailOptions = {
		from: "xxxx",
		to: '',
		subject: 'xxxx',
		html: ''
	}


	//每个用户发送邮件
	userInfoApi.getMailData().then((resdata) => {
		weekDate =  new moment().day("Monday").format("YYYYMMDD")
		resdata.forEach((p) => {
		    const uname = p.name
		    let counts = [0,0,0,0]
		    let planNum = [0,0,0,0]
		    let completeRate = [0,0,0,0]
		    p.dayComplete.forEach((v) => {
		      if(parseInt(v.timeId) >= parseInt(weekDate)) {             //符合条件的item
		        v.items.forEach((s) => {
		          counts[s.p_type-1] += parseInt(s.counts) || 0
		        })
		      }
		    })
		  	p.plans.forEach((o) => {
		  		if(o.timeStamp === weekDate && o.w_m_type === 0) {
		  			o.pNums.forEach((s) => {
		  				planNum[s.p_type-1] = parseInt(s.counts) || 0
		  			})
		  		}
		  	})
		  	if(!planNum[0] && !planNum[1] && !planNum[2] && !planNum[3]) {
		  		mailOptions.html = '<meta http-equiv="Content-Type" content="text/html; charset=utf-8">'+uname+', 您好: </br>'+
		  			'&emsp;&emsp;您本周尚未设置任何健身项目周计划,请您尽快设置，以确保正常反馈您的健身情况! :)'
		  	} else {
		  		planNum.forEach((item, i) => {
		  			if(item === 0) {
		  				completeRate[i] = 0
		  			} else {
		  				completeRate[i] = (counts[i]/item*100).toFixed(2)
		  			}
		  		})
			  	mailOptions.html = '<meta http-equiv="Content-Type" content="text/html; charset=utf-8">'+uname+', 您好: </br>'+
			  			'&emsp;&emsp;下面为【'+uname+'】本周健身周报汇报内容</br>'+
			  			'<ul>'+
			  				'<li> 引体向上周计划值为：'+'<strong>'+planNum[0]+'</strong>'+', 本周完成'+completeRate[0]+'%'+'</li>'+
			  				'<li> 俯卧撑周计划值为：'+'<strong>'+planNum[1]+'</strong>'+', 本周完成'+completeRate[1]+'%'+'</li>'+
			  				'<li> 仰卧起坐周计划值为：'+'<strong>'+planNum[2]+'</strong>'+', 本周完成'+completeRate[2]+'%'+'</li>'+
			  				'<li> 深蹲周计划值为：'+'<strong>'+planNum[3]+'</strong>'+', 本周完成'+completeRate[3]+'%'+'</li>'+
			  			'</ul></br>'+
			  			'希望您继续保持，身体健康! :)'
	  		}
		  	mailOptions.to = p.mail

		  	smtpTransport.sendMail(mailOptions, function(err, res) {
				if(err) {
					console.log(err)
				} else {
					console.log("Sent Successful !!");
				}
			})
		})
	}).catch((err) => {
		console.log(err)
	})
})

module.exports = schedule