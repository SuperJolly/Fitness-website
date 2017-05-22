const mongoose = require('mongoose')

const dbConfig =  {
  db: "mongodb://jeremygao:jeremygao@localhost:27017/Artlist",
  options: {
  	server: {
    	auto_reconnect: true,
    	poolSize: 10
   	}
  }
}



try{
  mongoose.connect(dbConfig.db, dbConfig.options)
} catch(err) {
  mongoose.createConnection(dbConfig.db, dbConfig.options)
}
mongoose.connection.on('connected', function() {
  console.log('Mongoose database connected to: ' + dbConfig.db)
})
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err)
})
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose connection disconnected!')
})

module.exports = mongoose