<template>
	<div class="info-pl-picker">
		<mu-flexbox class="sub-pl-picker" v-if="completedPlans" wrap="wrap" justify="space-between">
			<mu-flexbox-item v-for="completedPlan in completedPlans" v-if="completedPlan.weeklyPlan || completedPlan.monthlyPlan" class="sub-picker">
				<my-chart :configData="completedPlan" :type="[completedPlan.weeklyPlan,completedPlan.monthlyPlan]"></my-chart>
			</mu-flexbox-item>
		</mu-flexbox>
	</div>	
</template>

<script>
	import common_api from '../../static/js/common.api.js'
	import myChart from './myChart'
	export default {
		name: 'info-pl-picker',
		data() {
			return {
			}
		},
		computed: {
			completedPlans() {
				return this.$store.getters.completedPlans
			}
		},
		beforeCreate() {
			this.$store.dispatch('GET_ALL_PLANS',{
				date:[common_api.getRecentWeekDay(),common_api.getRecentMonthDay()]
			})
		},
		components: {
			myChart
		}
	}
</script>

<style lang="less">
	.info-pl-picker {
		position: relative;
		margin-top: 60px;
		width: 100%;
		padding-bottom: 0px;
		.sub-pl-picker {
			width: 100%;
			.sub-picker {
				height:300px;
				width: 260px;
				.switch-button {
					height: 30px;
					.switch-button-track {
						width: 45px
					}
					.switch-button-label {
						margin-left: 10px;
						color: #e53935;
						font-size: 17px;
					}
					input[type=checkbox]:checked+.mu-switch-wrapper .mu-switch-thumb {
						transform: translate3d(25px,0,0);
					}
				}
				.item-chart {
					margin: 0 auto;
					width: 260px;
					height: 300px;
					.echarts {
						height: 260px;
						width: 260px
					}
				}
			}
	
		}
	}
</style>