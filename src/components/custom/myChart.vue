<template>
	<div class="item-chart">
		<mu-switch :label="planName" :disabled="switchDisabled" @change="switchChart" class="switch-button" :labelClass="'switch-button-label animated fadeIn'" :trackClass="'switch-button-track'"/>	
		
		<chart :options="polar"></chart>
	</div>
</template>

<script>
	import Vue from 'vue'
	import ECharts from 'vue-echarts/components/ECharts'
	import 'echarts/lib/chart/gauge'
	import 'echarts/lib/component/tooltip'
	import 'echarts/lib/component/toolbox'
	import 'echarts/lib/component/title'
	Vue.component('chart', ECharts)
	export default {
		name: 'my-chart',
		data() {
		    return {
		    	currentValue: 0,
				polar: null,
				cachePlans: [],
				planName: '',
				maxVal: 0,
				switchDisabled: true,
				currentType: null
		    }
		},
		watch: {
			type(val,oldVal) {
				if(val[0] !== oldVal[0] || val[1] !== oldVal[1]) {
					this.initData()
				}
			}
		},
		props: {
			configData: Object,
			type: Array
		},
		methods: {
			getCurrentValue(currentType) {
				if(currentType === 0) {
					return parseInt(this.configData.cachePlans[0].counts)
				} else if(currentType === 1) {
					return parseInt(this.configData.cachePlans[1].counts)
				}
			},
			createChartOptions(plan) {
				this.currentValue = this.getCurrentValue(this.currentType)
				const maxVal = this.maxVal
				return {
			      	title: {
			      		text: plan.cname,
			      		textStyle: {
			      			fontSize: 17,
			      			fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
			      			color: '#e53935',
			      			fontWeight: 'normal'
			      		},
			      		textAlign: 'center',
			      		left: '49%',
			      		bottom: '0%'
			      	},
			      	legend: {
			      		width: 260,
			      		height: 260,
			      		padding: 0
			      	},
			        tooltip : {
				        formatter: function(params) {
				        	return "类型: "+params.seriesName+" <br/>"+params.seriesName+" : "+params.value+" 个"
				        }
				    },
				    series: [
				        {
				            name: plan.cname,
				            type: 'gauge',
				            radius: '100%',
				            startAngle: 240,
				            endAngle: -60,
				            min: 0,
				            max: maxVal,
				            axisLine: {
				            	lineStyle: {
				            		color: [[0.2, '#91c7ae'], [0.8, '#9ccc65'], [1, '#f9a825']],
					            	width: 25
					            }
				            },
				            pointer: {
				            	show: true,
				            	width: 7,
				            	length: '70%'
				            },
				            title: {
				            	show: false
				            },
				            detail: {
				            	formatter: function(value){
				            		return (value/maxVal*100).toFixed(1)+'%'
				            	}
				            },
				            data: [{
				            	value: this.currentValue,
				            	name: '计划设置百分比'
				            }]
				        }
				    ],
			        animationDuration: 2000,
			        animationEasing: 'quarticInOut',
			        animationDurationUpdate: 1500,
			        animationDelayUpdate: 400
				}
			},
			setPropsData(plan, currentType) {
				this.cachePlans = [plan.weeklyPlan,plan.monthlyPlan]
				if(this.cachePlans[0] && this.cachePlans[1]) {
					this.switchDisabled = false
					this.planName = currentType === 0 ? '周计划' : '月计划'
					this.maxVal = currentType === 0 ? plan.weekMax : plan.monthMax
				} else {
					this.planName = currentType === 0 ? '周计划' : '月计划'
					this.switchDisabled = true
					this.maxVal = currentType === 0 ? plan.weekMax : plan.monthMax
				}
				this.polar = this.createChartOptions(plan)
			},
			switchChart(val) {
				if(val) {
					if(this.currentType === 0) {
						this.currentType =  1
						this.setPropsData(this.configData, this.currentType)
					}
				} else {
					this.currentType = 0
					this.setPropsData(this.configData, this.currentType)
				}
			},
			initCurrentType(plan) {
				return plan.weeklyPlan ? 0 : 1
			},
			initData() {
				this.currentType = this.initCurrentType(this.configData)
				this.setPropsData(this.configData,this.currentType)
			}
		},
		created() {
			this.initData()
		}
	}
	
</script>
<style lang="less">

</style>