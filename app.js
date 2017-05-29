const pkg = require('./package')
const config = require('./config/db')
const express = require('express')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const listItems = require('./router/listItem')
const userInfo = require('./router/userInfo')
const adminInfo = require('./router/adminInfo')
const scheduleMailer = require('./mailer')

const app = express()
const port = process.env.PORT || 3000
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(favicon(__dirname + '/src/assets/favicon.ico'))
app.use(express.static('dist'))
app.use('/api',[listItems,userInfo,adminInfo])
app.use(scheduleMailer.scheduleJob)

app.listen(port, () => {
  console.log(`${pkg.name} listening on port ${port}`)
})

module.exports = app
