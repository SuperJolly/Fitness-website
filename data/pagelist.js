const mongoose = require('../config/db')

let Schema = mongoose.Schema
//文章Schema
const listSchema = new Schema({
  title: { type:String, required : true },
  url: { type:String, required: true},
  author: String,
  body: String,
  image: String,
  pointCount: Number,
  comments: [{ body: String, date: Date }],
  created_at: { type : Date, default : Date.now },
  update_at: { type : Date, default : Date.now }
})

listSchema.statics.findItemsByType = function(type, size, curPage, cb) {
	if(type === 'newPub') {
		console.log('---最新三天发布的文章---')
    const update_now = Date.now() - 3*1000*60*60*24;
		return this.find({'update_at':{'$gt':new Date(update_now)}}).sort({'update_at':-1}).limit(size).skip((curPage - 1)*size).exec(cb)
	} else if(type === 'hotPub') {
    console.log('---最热门的文章---')
    return this.find({}).sort({'pointCount':-1}).limit(size).skip((curPage - 1)*size).exec(cb)
  }
}

listSchema.statics.findItemCount = function(type, cb) {
  if(type === 'newPub') {
    const update_now = Date.now() - 3*1000*60*60*24;
    return this.find({'update_at':{'$gt':new Date(update_now)}}).count().exec(cb)
  } else if(type === 'hotPub') {
    return this.find({}).count().exec(cb)
  }
}
const listItemModel = module.exports = mongoose.model('pagelist',listSchema)