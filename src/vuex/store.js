import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import mutations from './mutations'
import getters from './getters'
// import newPubItem from './modules/newPubItem'

Vue.use(Vuex);

//需要维护的状态
const state = {
	cpTypeItem: [],     //各list组件id
	activeType: null,
	pageSize: 2,
	user: {},
	userIntro: '这个家伙很懒,什么也没留下',
	userImage: require('../static/images/img.png'),
	userlogIn: false,
	userId: null,
	admin: {
		adminName: null,
		adminLevel: null
	},
	items: {            //every list’s counts
		newPub: 0,
		hotPub: 0
	},
	fieldPlans: [
		{
			cname:'引体向上',
			class:'pullup',
			ename:'Pullups',
			todayCompleted:false,
			type: 1,
			monthMax: 1000,
			weekMax: 200,
			weeklyPlan: false,
			monthlyPlan: false,
			cachePlans: ['',''],
			dayCounts: 0
		},
		{
			cname:'俯卧撑',
			class:'pushup',
			ename:'Pushups',
			todayCompleted:false,
			type: 2,
			monthMax: 3000,
			weekMax: 1000,
			weeklyPlan: false,
			monthlyPlan: false,
			cachePlans: ['',''],
			dayCounts: 0
		},
		{
			cname:'仰卧起坐',
			class:'situp',
			ename:'Situps',
			todayCompleted:false,
			type: 3,
			monthMax: 2000,
			weekMax: 700,
			weeklyPlan: false,
			monthlyPlan: false,
			cachePlans: ['',''],
			dayCounts: 0
		},
		{
			cname:'深蹲',
			class:'squat',
			ename:'Squats',
			todayCompleted:false,
			type: 4,
			monthMax: 1500,
			weekMax: 400,
			weeklyPlan: false,
			monthlyPlan: false,
			cachePlans: ['',''],
			dayCounts: 0
		}
	],

	lists: {
		newPub:[],
		hotPub:[]
	}
};

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	state,
	actions,
	getters,
	mutations
})