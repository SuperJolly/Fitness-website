<template>
	<div class="pl-field-picker">
		<div class="init-field" v-if="fieldPlans" v-for="fieldPlan in fieldPlans">
			<div class="init-field-container" :class="fieldPlan.class" @mouseenter="mouseenter" @mouseleave="mouseleave">
				<div class="field-container-body animated" :class="{'slideInUp display-config':showConfig&&activeConfig===fieldPlan.type,'nodis-config slideInDown':!firstLoad&&activeConfig===fieldPlan.type}">
					<span class="pl-icon-title">{{fieldPlan.ename}}</span>
					<span class="pl-icon"></span>
					<div class="pl-msg animated pluse" v-if="disableBtn&&activeConfig!==fieldPlan.type">
						<span class="pl-msg-warning animated bounceIn"><a href="javascript:void(0)">当前设置操作未完成!</a></span>
					</div>
					<div class="pl-msg animated pulse" v-else-if="!disableBtn">
						<span class="pl-msg-week animated bounceInDown" @click="showWeeklyPlan"><a href="javascript:void(0)" :type="fieldPlan.type">周计划</a></span>
						<span class="pl-msg-month animated bounceInUp" @click="showMonthlyPlan"><a href="javascript:void(0)" :type="fieldPlan.type">月计划</a></span>
					</div>

				</div>
				<div class="field-config-body animated" v-if="showConfig&&activeConfig===fieldPlan.type" :class="{'slideInUp display-config':showConfig&&activeConfig===fieldPlan.type}">
					<span class="toLeft" @click="minusCount"></span>
					<div class="number-picker">
						<mu-text-field class="field-input" @input="inputVal" :value="inVal" />
					</div>
					<span class="toRight" @click="plusCount"></span>
			  		<mu-flat-button label="确定" class="submit-flat-button" @click="setPlanNum" primary/>
				</div>
			</div>
		</div>
		 <mu-snackbar v-if="snackbar" message="计划详情已显示" action="关闭" @actionClick="closeSnackbar" @close="closeSnackbar" class="pl-snackbar"/>
	</div>
</template>
<script>
	import common_api from '../../static/js/common.api.js'
	export default {
		name: 'pl-field-picker',
		data() {
			return  {
				firstLoad:true,
				fieldPlans: this.$store.state.fieldPlans,
				disableBtn: false,
				inVal: 0,
				minVal: 1,
				snackbar: false
			}
		},
		props: {
			showConfig: {
				type:Boolean,
				default: false
			},
			activeConfig: {
				type:Number,
				default: null	
			},
			wType: {
				type: Number,
				default: null
			},
			maxVal: {
				type: Number
			}
		},
		watch: {
			activeConfig(newVal) {
				if(newVal) {
					this.firstLoad = true
				}
			},
			showConfig(newVal) {
				if(newVal === false) {
					this.firstLoad = false
				} else {
					this.firstLoad = true
				}
			}
		},
		updated() {
			this.inVal = this.handleInput(this.inVal)
		},
		methods: {
			mouseenter(val) {
				//add 'pl-msg-display' Class
				let target = val.target
				if(target.querySelector(".field-container-body").className.indexOf("display-config") === -1) {             //若当前container没在设置
					if(this.activeConfig && this.showConfig) {                //如果container当中有正在设置计划的操作
						this.disableBtn = true
					} else {
						this.disableBtn = false
					}
					if(target.querySelector(".pl-msg") && target.querySelector(".pl-msg").className) {
						target.querySelector(".pl-msg").className +=" pl-msg-display"
					}
				}
				
			},
			mouseleave(val) {
				// remove 'pl-msg-display' Class
				let target = val.target
				if(target.querySelector(".field-container-body").className.indexOf("display-config") === -1) {
					if(this.activeConfig && this.showConfig) {                //如果container当中有正在设置计划的操作
						this.disableBtn = true
					} else {
						this.disableBtn = false
					}
					let plMsgClass = target.querySelector(".pl-msg").className
					if(!plMsgClass)
						return
					const index = plMsgClass.indexOf('pl-msg-display')
					if( index !== -1) {
						plMsgClass = plMsgClass.split(" pl-msg-display").join("")
						target.querySelector(".pl-msg").className = plMsgClass
					}
				}
			},
			showWeeklyPlan(val) {
				const data = {
					uid: this.$store.state.userId,
					type: parseInt(val.target.type || val.target.children[0].type),
					date: common_api.getRecentWeekDay()
				}
				this.$store.dispatch('GET_WEEK_PLAN', 
					{
						data: data
					}).then((rescode) => {
						if(rescode === 203) {
							console.log('显示周计划详情')
							this.showSnackbar()
						} else {
							this.$emit('configPlan',{type: data.type,date: data.date,w_type:'周计划'})
							console.log('用户暂未设置周计划')
						}
					}).catch((err) => {
						console.log(err)
					})
			},
			showMonthlyPlan(val) {
				const data = {
					uid: this.$store.state.userId,
					type:  parseInt(val.target.type || val.target.children[0].type),
					date: common_api.getRecentMonthDay()
				}
				this.$store.dispatch('GET_MONTH_PLAN', 
					{
						data: data
					}).then((rescode) => {
						if(rescode === 203) {
							console.log('显示月计划详情')
							this.showSnackbar()
							console.log(this.$store.state.fieldPlans)
						} else {
							this.$emit('configPlan',{type: data.type,date: data.date,w_type:'月计划'})
							console.log('用户暂未设置月计划')
						}
					}).catch((err) => {
						console.log(err)
					})
			},
			minusCount() {
				this.inVal -= 5
			},
			plusCount() {
				this.inVal += 5
			},
			inputVal(val) {
				this.inVal = val
			},
			handleInput(val) {
				val = parseInt(val)
				if(isNaN(val)) {
					return 1
				} else if(val < this.minVal) {
					return this.minVal
				} else if(val > this.maxVal) {
					return this.maxVal
				} else {
					return val
				}
			},
			setPlanNum(val) {                     //设置计划数量
				const data = {
					type: this.activeConfig,
					w_type: this.wType,
					num: parseInt(this.inVal),
					uid: this.$store.state.userId,
					date: this.wType === 0 ? common_api.getRecentWeekDay() : common_api.getRecentMonthDay()
				}
				this.$store.dispatch('SET_PLAN_NUM', {
					data: data
				}).then((rescode) => {
					if(rescode === 202) {
						console.log('设置成功')
					} else if(rescode === 400) {
						console.log('用户不存在')
					} else if(rescode === 402){
						console.log('错误: '+rescode.name+rescode.message)
					}
					this.$emit('configPlanOver')
				})
			},
			showSnackbar() {
				this.snackbar = true
				if (this.snackTimer) clearTimeout(this.snackTimer)
      			this.snackTimer = setTimeout(() => { this.snackbar = false }, 2000)
			},
			closeSnackbar() {
				this.snackbar = false
  				if (this.snackTimer) clearTimeout(this.snackTimer)
			}
		}
	}
</script>
<style lang="less">
	@plIcon128: 128px;
	@plIcon169: 169px;
	@plIcon256: 256px;
	.pl-field-picker {
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		flex-wrap: wrap;
		.pl-snackbar {
		    top: 50px;
    		right: 190px;
		}
		&.fullWidth {
			width: 100%
		}
		.init-field {
			width: 25%;
			text-align: center;
			height: 240px;
			position: relative;
			.init-field-container {
				width: 100%;
				height: 100%;
				border: 4px solid #fff;
				border-radius: 10px;
				cursor: pointer;
				overflow: hidden;
				&.squat {
					background-color: #a1887f;
					.pl-icon {
						background-image:url('../../static/images/squatX169.png');
					}
				}
				&.pullup {
					background-color: #a1887f;
					.pl-icon {
					background-image:url('../../static/images/pullupX169.png');
					}
				}
				&.pushup {
					background-color: #a1887f;
					.pl-icon {
						background-image:url('../../static/images/pushupX169.png');
					}
				}
				&.situp {
					background-color: #a1887f;
					.pl-icon {
						background-image:url('../../static/images/situpX169.png');
					}
				}
				.field-config-body, .field-container-body {
					width:100%;
					position: relative;
					border-radius: 10px;
					-moz-user-select:none;/*火狐*/
					-webkit-user-select:none;/*webkit浏览器*/
					-ms-user-select:none;/*IE10*/
					user-select:none;
				}
				.field-config-body {
					height:36%;
					&.display-config {
						z-index: 299;
						top: -36%;
					}
					.toLeft, .toRight, .number-picker {
						display: inline-block;
						height: 40px;
						position: relative;
					    font-size: 20px;
					    -moz-user-select:none;/*火狐*/
						-webkit-user-select:none;/*webkit浏览器*/
						-ms-user-select:none;/*IE10*/
						user-select:none;
					}
					.toLeft, .toRight {
						width: 40px;
					    line-height: 40px;
						z-index: 199;
						top: 0;
					}
					.toLeft {
						background:url('../../static/images/leftX40.png') no-repeat center;
					}
					.toRight {
						background:url('../../static/images/rightX40.png') no-repeat center;
					}
					.number-picker {
						width: 110px;
						top: -17px;
						.field-input {
						    margin: 0;
    						width: 40px;
    						min-height: 40px;
    						&.focus-state {
    							color: #84ffff;
    						}
    						.mu-text-field-content {
    							padding-bottom: 0;
    							padding-top: 0;
    							.mu-text-field-input {
    								text-align: center;
    							}
								.mu-text-field-focus-line{
									background-color:#84ffff;
									&.focus {
										background-color: #84ffff;
									}
								}
    						}
						}
					}
					.submit-flat-button {
						display:block;
						position: relative;
						top: -10px;
						left:50%;
						transform:translateX(-50%);
						&.mu-flat-button-primary {
							color: #fff;
						}
						.mu-flat-button-label {
							padding: 0 5px;
					    	letter-spacing: 5px;
							margin-left: 2px;
						}
					}

				}
				.field-container-body {
					height: 100%;
					padding-top: 10px;
					&.display-config {
						top: -32%;
					}
					&.nodis-config {
						top: 0;
					}
					.pl-icon-title {
						position: relative;
					    font-size: 35px;
					    display: block;
					    color: #fff;
					    letter-spacing: 2px;
					    font-family: sans-serif;
					}
					.pl-icon {
						width: @plIcon169;
						height: @plIcon169;
						display: block;
						margin: 0 auto;
					}
					.pl-msg {
						/**background: url(http://demo.lanrenzhijia.com/2014/pic0909/images/jia.png) no-repeat center 80px;**/
						background-color: #000;
					    opacity: 0.7;
					    display: none;
					    width: 100%;
					    height: 100%;
					    position: absolute;
					    border-radius: 6px;
					    left: 0;
					    top: 0;
					    z-index: 15;
					    overflow: hidden;
					    span {
					    	position: relative;
						    display: block;
						    margin: 0 auto;
					        border: 1px solid #ff5722;
						    width: 40%;
						    padding: 5px;
						    letter-spacing: 2px;
    						text-align: center;
    						transition: all .8s;
    						&:hover {
    							a {
									color:#ff5722;
								}
								border: 1px solid #fff;
    						}
    						a {
    							color: #fff;
    						}
						    &.pl-msg-week {
						    	top: 40px;
						    }
						    &.pl-msg-month {
								top: 127px;
						    }
						    &.pl-msg-warning {
						    	top: 84px;
						    	width: 43%;
						    }
					    }
					}
					.pl-msg-display {
						display: block;
					}
				}
			}
			
		}
	}

</style>