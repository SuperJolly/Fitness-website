const mongoose = require('../config/db')
const mPromise = require('mpromise')
let Schema = mongoose.Schema

//用户Schema
const userSchema = new Schema({
  name: { type: String, required: true },
  pwd: { type: String, required: true},
  age: { type: Number, default: -1},
  sex: { type: Number, default: -1},                                                          //0 -> '男', 1 -> '女'
  mail: { type: String, default: ''},
  phone: { type: String, default: ''},
  image: { type: String, default: ''},
  intro: { type: String, default: ''},
  plans: [{
  	pNums: [{
  		p_type: Number,                                                   //训练类型,1-4 分别代表 [引体向上, 俯卧撑, 仰卧起坐, 深蹲]
  		counts:{ type:Number, default: 0}                               //该训练类型计划数量
  	}],
  	w_m_type: { type: Number, default: 0},                                  //0代表周计划,1代表月计划
  	timeStamp: { type:String, required: true, default: '-1'}           //时间戳代表独一无二的计划
  }],
  dayComplete: [{
  	timeId: {type: String, default: '-1', required: true},
  	items: [{
  		p_type: Number,
  		counts: {type:Number, default: 0}
  	}],
  	updated_day_at: {type: Date, default: Date.now }
  }],
  created_at: { type : Date, default : Date.now },
  updated_at: { type : Date, default : Date.now }
})


userSchema.statics.findUserByName = function(uname, cb) {
	return this.findOne({'name':uname},{name:1}).exec(cb)
}

userSchema.statics.addNewUser = function(user, cb) {
  const newUser = new userListModel({
    name:user.uname,
    pwd:user.upwd
  })
  return this.create(newUser,cb)
}

userSchema.statics.loginUser =  function(user, cb) {
	return this.findOne({'name':user.uname,'pwd':user.upwd}).exec(cb)
}

userSchema.statics.getWeekPlan = function(data, cb) {
  return this.findOne({
      'name':data.uname,
    },{plans:1}).where('plans')
    .elemMatch({
      'w_m_type': 0,
      'timeStamp':data.date,
      'pNums.p_type':data.type
    })
    .exec(cb)
  // return this.find({'name':data.uname, 'plans.w_m_type': 0,'plans.pNums.p_type':data.type,'plans.timeStamp':data.date},{plans:1}).exec(cb)
}

userSchema.statics.getMonthPlan = function(data, cb) {
  return this.findOne({
      'name':data.uname
    },{plans:1}).where('plans')
    .elemMatch({
      'w_m_type': 1,
      'timeStamp':data.date,
      'pNums.p_type':data.type
    })
    .exec(cb)
}

userSchema.statics.setPlanNum = function(data, cb) {
  const self = this
  let promise = new mPromise
  self.findOne({'name':data.uname},(err,Ares)=>{
    if(err) {
      console.log(err)
      promise.reject(err)
    }
    if(Ares) {
      self.findOne({'plans.timeStamp':data.date,'plans.w_m_type':data.w_type,'name':data.uname},(err,res)=>{
        if(err) {
          console.log(err)
          promise.reject(err)
        }
        if(res) {
          //更新数据
          for(let i = 0;i < res.plans.length;i++){
            if(res.plans[i].timeStamp == data.date && res.plans[i].w_m_type == data.w_type) {
              let pNums = res.plans[i].pNums
              if(pNums.length === 0) {
                pNums.push({counts:data.num,p_type:data.type})
                res.plans[i].pNums = pNums
                break
              }
              for(let j = 0;j < pNums.length;j++){
                if(pNums[j].p_type === data.type) {
                  pNums[j].counts = data.num
                  res.plans[i].pNums[j] = pNums[j]
                  break
                }
                if(j === pNums.length - 1) {
                  pNums.push({counts:data.num,p_type:data.type})
                  res.plans[i].pNums = pNums
                  break
                }         
              }
              break
            }
          }
          res.updated_at = Date.now()
          res.save(function(err){
            if(err){
                promise.reject(err)
            }else{
                console.log('update a plan item sucessed');
                promise.resolve(res)
            }
          });
        } else {
          //插入数据
          self.findOne({'name':data.uname},(err,subres) => {
            if(err) {
              console.log(err)
              promise.reject(err)
            }
            subres.plans.push({
              timeStamp:data.date,
              w_m_type:data.w_type,
              pNums:[{
                p_type:data.type,
                counts:data.num
              }]
            })
            subres.updated_at = Date.now()
            subres.save(function(err){
              if(err){
                console.log(err);
                promise.reject(err)
              }else{
                  console.log('insert a plan item successed');
                  promise.resolve(subres)
              }
            })
          })
        }
      })
    } else {
      promise.resolve(null)
    }
  })

  return promise

}

userSchema.statics.getPlansByDate = function(data, cb) {
  const date = data.date
  let ins_promise = new mPromise
  this.findOne({
    'name':data.uname
  },{plans:1},function(err,res){
      if(err) {
        console.log(err)
        ins_promise.reject(err)
      }
      if(res) {
        res = res.plans.filter((v) => {
          return v.timeStamp === date[0] || v.timeStamp === date[1]
        })
        ins_promise.resolve(res)
      } else {
        ins_promise.resolve(null)
      }
  }).where('plans.timeStamp').in(date)
  return ins_promise
}

userSchema.statics.getTodayNum = function(data, cb) {
  // return
  return this.findOne({
      'name':data.uname
    },{'dayComplete':1}).where('dayComplete')
    .elemMatch({
      'timeId': data.date
    })
    .exec(cb)
}

userSchema.statics.setTodayNum = function(data, cb) {
  const self = this
  let promise = new mPromise
  self.findOne({'name':data.uname},(err, Ares) => {
    if(err) {
      console.log(err)
      promise.reject(err)
    }
    if(Ares) {
      self.findOne({'dayComplete.timeId':data.date,'name':data.uname},(err,Bres)=>{
        if(err) {
          console.log(err)
          promise.reject(err)
        }
        if(Bres) {                                   //存在今日的dayComplete
          Bres.dayComplete.forEach((v) => {
            if(v.timeId === data.date) {
              v.items.push({
                p_type: data.type,
                counts: data.value
              })
            }
          })
          Bres.dayComplete.updated_day_at = Date.now()
          Bres.save(function(err){
            if(err){
              console.log(err);
              promise.reject(err)
            }else{
                console.log('insert a today item successed');
                promise.resolve(Bres)
            }
          })
        } else {
          Ares.dayComplete.push({
            updated_day_at: Date.now(),
            timeId: data.date,
            items: [{
              p_type: data.type,
              counts: data.value
            }]
          })
          Ares.save(function(err) {
            if(err){
              console.log(err)
              promise.reject(err)
            }else{
                console.log('insert a dayComplete item successed')
                promise.resolve(Ares)
            }
          })
        }
      })
    } else {
      promise.resolve(null)
    }
  })
  return promise
}

userSchema.statics.getMonthNumByType = function(data, cb) {
  return this.findOne({'name': data.uname,'dayComplete.timeId':{'$gte': data.date}}, {'dayComplete':1}).exec(cb)
}

userSchema.statics.saveUserInfo = function(data, cb) {
  if(data.newPwd) {          //如果修改了密码
    return this.findOne({'name':data.uname}).update({$set: {'pwd':data.newPwd,'sex':data.sex,'age':data.age,'mail':data.mail,'phone':data.phone,'intro':data.intro}})
  } else {
    return this.findOne({'name': data.uname}).update({$set: {'sex':data.sex,'age':data.age,'mail':data.mail,'phone':data.phone,'intro':data.intro}})
  }
}

userSchema.statics.editOneUserInfo = function(data, cb) {
  const setObj = {}
  if(data.upwd) {
    setObj.pwd = data.upwd
  }
  if(data.uage) {
    setObj.age = data.uage
  }
  if(data.uphone) {
    setObj.phone = data.uphone
  }
  if(data.umail) {
    setObj.mail = data.umail
  }
  return this.findOne({'name': data.uname}).update({$set: setObj}).exec(cb)
}

userSchema.statics.getTopWeekRank = function(data, cb) {
  const weekDate = data.weekDate
  let resData = []
  let promise = new mPromise
  //根据周,月日期进行统计排名
  this.find({},{'dayComplete':1,'name':1}).where('dayComplete').elemMatch(
    {
      'timeId': {'$gte':weekDate}
    }).exec(function(err, res) {
      if(err) {
        console.log(err)
        promise.reject(err)
      }
      res.forEach((p) => {
        let uname = p.name
        let counts = 0
        p.dayComplete.forEach((v) => {
          if(parseInt(v.timeId) >= parseInt(weekDate)) {             //符合条件的item
            v.items.forEach((s) => {
              counts += s.counts
            })
          }
        })
        resData.push({
          name: uname,
          counts: counts
        })
      })
      resData = resData.sort((a,b) => {
        return b.counts - a.counts
      }).slice(0,10)
      promise.resolve(resData)
    })
  return promise
}

userSchema.statics.getTopMonthRank = function(data, cb) {
  const monthDate = data.monthDate
  let resData = []
  let promise = new mPromise
  this.find({},{'dayComplete':1,'name':1}).where('dayComplete').elemMatch(
    {
      'timeId': {'$gte':monthDate}
    }).exec(function(err, res) {
      if(err) {
        console.log(err)
        promise.reject(err)
      }
      res.forEach((p) => {
        let uname = p.name
        let counts = 0
        p.dayComplete.forEach((v) => {
          if(v.timeId.slice(0,6) === monthDate) {             //符合条件的item
            v.items.forEach((s) => {
              counts += s.counts
            })
          }
        })
        resData.push({
          name: uname,
          counts: counts
        })
      })
      resData = resData.sort((a,b) => {
        return b.counts - a.counts
      }).slice(0,10)
      promise.resolve(resData)
    })
    return promise
}

userSchema.statics.getMailData = function(cb) {
  return this.find({},'name dayComplete plans mail').where('mail').ne('').exec(cb)
}

userSchema.statics.getUserList = function(cb) {
  return this.find({},'name').exec(cb)
}

userSchema.statics.deleteOneUser = function(data,cb) {
  return this.remove({'name': data.uname}).exec(cb)
}

const userListModel = mongoose.model('userlist', userSchema)
module.exports = userListModel

// var test = new userListModel({
//   'name': 'jere1234',
//   'pwd': 'jere1234',
//   'dayComplete': [{
//     'timeId':'20170403',
//     'items': [{
//       'p_type': 2,
//       'counts': 12
//     },{
//       'p_type': 1,
//       'counts': 34
//     },{
//       'p_type': 3,
//       'counts': 56
//     }]
//   },{
//     'timeId':'20170306',
//     'items': [{
//       'p_type': 1,
//       'counts': 64
//     },{
//       'p_type': 2,
//       'counts': 78
//     },{
//       'p_type': 4,
//       'counts': 30
//     }]
//   }]
// })
// test.save(function(err,res){
//   console.log('test save successed!')
// })