<template>
	<div class="rank-panel">
		<div class="rank-week-container">
			<div class="week-panel" v-if="!nullDataForWeek">
				<h3>周排行榜</h3>
				<mu-table :fixedHeader="fixedHeader" :showCheckbox="showCheckbox" class="u-table">
				    <mu-thead slot="header">
				      <mu-tr>
				        <mu-th tooltip="排名">排名</mu-th>
				        <mu-th tooltip="名称">用户名</mu-th>
				        <mu-th tooltip="数量">数量</mu-th>
				      </mu-tr>
				    </mu-thead>
				    <mu-tbody>
				      <mu-tr v-for="item,index in weekData"  :key="index">
				        <mu-td>{{index + 1}}</mu-td>
				        <mu-td>{{item.name}}</mu-td>
				        <mu-td>{{item.counts}}</mu-td>
				      </mu-tr>
				    </mu-tbody>
			  	</mu-table>
			</div>
			<div class="week-panel" v-else>
				<div class="null-data">
					暂无数据!
				</div>
			</div>
		</div>
		<div class="rank-month-container">
			<div class="month-panel" v-if="!nullDataForMonth">
				<h3>月排行榜</h3>
				<mu-table :fixedHeader="fixedHeader" :showCheckbox="showCheckbox" class="u-table">
				    <mu-thead slot="header">
				      <mu-tr>
				        <mu-th tooltip="排名">排名</mu-th>
				        <mu-th tooltip="名称">用户名</mu-th>
				        <mu-th tooltip="数量">数量</mu-th>
				      </mu-tr>
				    </mu-thead>
				    <mu-tbody>
				      <mu-tr v-for="item,index in monthData"  :key="index">
				        <mu-td>{{index + 1}}</mu-td>
				        <mu-td>{{item.name}}</mu-td>
				        <mu-td>{{item.counts}}</mu-td>
				      </mu-tr>
				    </mu-tbody>
			  	</mu-table>
			</div>
			<div class="month-panel" v-else>
				<div class="null-data">
					暂无数据!
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import common_api from '../static/js/common.api'
	export default {
		data() {
			return {
				fixedHeader: true,
				showCheckbox: false,
				weekData: [],
				monthData: [],
				nullDataForWeek: false,
				nullDataForMonth: false
			}
		},
		created() {
			this.$store.dispatch('GET_TOP_ALL_RANK', {
				weekDate: common_api.getRecentWeekDay(),
				monthDate: common_api.getRecentMonthDay()
			}).then((res) => {
				if(res.week.length > 0) {
					this.weekData = res.week
				} else {
					this.nullDataForWeek = true
				}
				if(res.month.length > 0) {
					this.monthData = res.month
				} else {
					this.nullDataForMonth = true
				}
			}).catch((err) => {
				console.log(err)
			})
		}
	}		
</script>
<style lang="less">
	.rank-panel {
	    width: 80%;
	    min-height: 600px;
	    margin: 40px auto 0;
	    display: flex;
	    flex-direction: row;
		.rank-week-container,.rank-month-container {
			flex: 1 1 auto;
			width: 50%;
		}
		.week-panel,.month-panel {
			width: 80%;
			min-height: 290px;
			padding-bottom: 20px;
			margin: 20px auto 0;
			border-radius: 10px;
			border: 3px solid #fff;
			background: #000;
			position: relative;
			opacity: .7;
			
			.null-data {
			    width: 200px;
			    height: 50px;
			    color: #fff;
			    text-align: center;
			    margin: 100px auto;
			    padding: 15px 0;
			}
			h3 {
				color: #fff;
				text-align: center
			}
			.u-table {
				width: 90%;
				margin: 0 auto;
				table tr {
					&.hover td{
						color: red;
					}
					td,th {
						text-align: center;
						&:first-child,&:last-child {
							width: 25%;
						}
						width: 49%;
						padding: 0 12px;
					}
					th {
						color:#dd2c00;
					}
					td {
						color:#7e57c2;
					}
				}
			}
		}
	}
</style>