export default {
	getRecentWeekDay() {
		// return @String {'20170427'}
		const today = new Date()
		const year = today.getFullYear()
		const month = today.getMonth()+1
		const dayOfWeek = today.getDay()
		const dayOfMonth = today.getDate()
		let mondayDay,mondayMonth,mondayYear;
		//1，3，5，7，8，10，12 31日
		if(dayOfMonth - dayOfWeek < 0) { //该周周一在上个月
			if([2,4,6,9,11].indexOf(month) > -1) {
				mondayDay = 31 + dayOfMonth - dayOfWeek + 1
				mondayMonth = this.formatMonthAndDay(month - 1)
				mondayYear = year.toString()
			} else if([1,5,7,8,10,12].indexOf(month) > -1) {
				mondayDay = 30 + dayOfMonth - datOfWeek + 1
				mondayMonth = this.formatMonthAndDay((month-1) || 12)
				mondayYear = month === 1 ? (year-1).toString() : year.toString()
			} else {           //month = 3
				if(year%4 === 0) {
					mondayDay = 29 + dayOfMonth - dayOfWeek + 1
				} else {
					mondayDay = 28 + dayOfMonth - dayOfWeek + 1
				}
				mondayMonth = '02'
				mondayYear = year.toString()
			}
		} else {
			if(dayOfMonth - dayOfWeek === 0) {
				mondayDay = '01'
			} else {
				mondayDay = this.formatMonthAndDay(dayOfMonth - dayOfWeek+1)	
			}
			mondayMonth = this.formatMonthAndDay(month)
			mondayYear = year.toString()
		}
		return mondayYear.concat(mondayMonth).concat(mondayDay)
	},
	getRecentMonthDay() {
		const today = new Date()
		const year = today.getFullYear()
		let mondayMonth, mondayYear
		mondayYear = year.toString()
		mondayMonth = this.formatMonthAndDay(today.getMonth()+1)
		return mondayYear.concat(mondayMonth)
	},
	formatMonthAndDay(value) {
		return value < 10 ? '0' + value : value.toString();
	},
	getCurrentDate() {
		const today = new Date()
		let yearString,
			monthString,
			dateString
		yearString = today.getFullYear().toString()
		monthString = (today.getMonth()+1).toString()
		dateString = today.getDate().toString()
		return yearString.concat(this.formatMonthAndDay(monthString)).concat(this.formatMonthAndDay(dateString))
	},
	getMonthDays() {
		const recentMonthDay = this.getRecentMonthDay()
		return new Date(recentMonthDay.slice(0,4),recentMonthDay.slice(-2),0).getDate()
	}
}

 