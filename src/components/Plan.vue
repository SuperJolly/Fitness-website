<template>
		<div v-if="isLogin" class="main-i">
			<pl-field-picker @configPlan="configPlan" @configPlanOver="configPlanOver" :showConfig="showConfig" :activeConfig="activeConfig" :wType="wType" :maxVal="maxVal" ref="fdPicker">
			</pl-field-picker>
			<info-pl-picker></info-pl-picker>
			<mu-dialog :open="openDialog" @close="close" :title="'设置'+title_type">
				<mu-content-block>
					您暂未设置{{title_type}},是否前往设置?
				</mu-content-block>
				<mu-flat-button slot="actions" primary @click="setWeeklyPlan" label="确定" class="dialog-btn"/>
				<mu-flat-button slot="actions" @click="cancelWeeklyPlan" primary label="取消" class="dialog-btn"/>	
	   				
			</mu-dialog>
		</div>
		<div v-else class="main-i-log">
			<div class="text-center">请<a href="javascript:void(0)" @click="handleClick">点击登录</a>您的账户！</div>
			<login-dialog :openCus="openCus" @setLogStatus="setLogStatus" @backBeforeSign="backBeforeSign"></login-dialog>
		</div>
</template>
<script>
	import loginDialog from './custom/loginDialog'
	import plFieldPicker from './custom/plFieldPicker'
	import infoPlPicker from './custom/infoPlPicker'
	export default {
		data() {
			return {
				openCus: false,
				openDialog: false,
				buttonClass: true,
				title_type: '',
				activeConfig: null,
				showConfig: false,
				wType: null,
				maxValtemp: 0,
				maxVal: 0
			}
		},
		watch: {
			maxValtemp(val) {
				if(val)
					this.maxVal = val
			}
		},
		computed: {
			isLogin() {
				return this.$store.getters.getAuthStatus
			}
		},
		methods: {
			handleClick() {
				this.openCus = true
			},
			setLogStatus(type) {
				this.$store.commit('SET_LOG_STATUS', type)
			},
			configPlan(ob) {
				let name
				this.$store.state.fieldPlans.map((v) => {
					if(v.type === ob.type) {
						name = v.cname
					}
				})
				this.open()
				this.activeConfig = parseInt(ob.type)
				this.wType = ob.w_type === '周计划' ? 0 : 1
				this.maxValtemp = this.wType === 0 ? this.$store.state.fieldPlans[ob.type-1].weekMax : this.$store.state.fieldPlans[ob.type-1].monthMax
				this.title_type = name + ob.w_type
			},
			configPlanOver() {
				this.showConfig = false
				this.title_type = ''
			},
			open() {
				this.openDialog = true
			},
			close() {
				this.openDialog = false
			},
			setWeeklyPlan() {
				this.close()
				this.showConfig = true
			},
			cancelWeeklyPlan() {
				this.close()
				this.activeConfig = null
			},
			backBeforeSign() {
				this.openCus = false
			}
		},
		components: {
			plFieldPicker,
			loginDialog,
			infoPlPicker
		}
	}
</script>
<style lang="scss">
	.main-i {
		position: relative;
		width: 80%;
		padding-bottom: 0px;
		margin: 50px 0 0 10%;
	}
	.dialog-btn {
		&:first-child {
			right: 60%;
		}
		&:last-child {
			right: 20%;
		}
	}
	.main-i-log {
		position: relative;
		width: 80%;
		min-height: 500px;
		margin: 50px 0 0 10%;
		.text-center {
			text-align:center;
			margin-top:200px;
			font-size:16px
		}
	}
</style>