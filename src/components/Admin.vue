<template>
	<div>
		<div class="admin-panel" v-if="!adminSuc">
			<div class="text-center">请<a href="javascript:void(0)" @click="handleClick">登录</a>您的管理员账户！</div>
			<admin-login-Dialog :openCus="openCus" @closeDialog="closeDialog"/>
		</div>
		<div v-else>
			<div class="admin-panel-manage" :class="{'slideLeft':!!animatePanel}">
				<mu-list-item :title="adminSuc" disabled titleClass="admin-name" class="user-info">
			    	<mu-avatar slot="left" :src="userImage"/>
				</mu-list-item>
				<mu-flexbox class="set-btn" wrap="wrap">
		    		<mu-flexbox-item class="flex-demo">
						<mu-flat-button label="用户管理" class="my-flat-button" labelClass="my-flat-label" @click="manageUser"/>
		    		</mu-flexbox-item>
		    		<mu-flexbox-item class="flex-demo">
						<mu-flat-button label="退出登录" class="my-flat-button" labelClass="my-flat-label" @click="logOut"/>
		    		</mu-flexbox-item>
				</mu-flexbox>
			</div>
			<div class="admin-sub-panel"  :class="'animated '+animatePanel" v-show="showUserList">
			  <mu-table :showCheckbox="false" :selectable="false" ref="table">
			    <mu-thead>
			      <mu-tr>
			        <mu-th>ID</mu-th>
			        <mu-th>Name</mu-th>
			        <mu-th>Operation</mu-th>
			      </mu-tr>
			    </mu-thead>
			    <mu-tbody>
			    	<mu-tr v-for="(item,index) in tabelItems">
						<mu-td>{{index+1}}</mu-td>
						<mu-td>{{item.name}}</mu-td>
						<mu-td>
							<mu-flat-button label="编辑" labelPosition="before" class="demo-flat-button" secondary @click="editOneUser">
								<mu-icon value="edit" :keyId="item.name"/>
							</mu-flat-button>
							<mu-flat-button label="删除" labelPosition="before" class="demo-flat-button" secondary @click="deleteOneUser">
								<mu-icon value="delete" :keyId="item.name"/>
							</mu-flat-button>
						</mu-td>
					</mu-tr>
		        </mu-tbody>
			  </mu-table>
			  <mu-dialog :open="showEditDialog" :title="editUserName+' - 修改信息'" bodyClass="">
				<div class="content-edit-block">
					<mu-flexbox>
						<mu-flexbox-item class="field-label" grow="2">
							<label for="">密码:</label>
						</mu-flexbox-item>
						<mu-flexbox-item class="" grow="3">
							<mu-text-field hintText="请修改密码" type="password" @input="inputUpwd"/>
						</mu-flexbox-item>
					</mu-flexbox>
					<mu-flexbox>
						<mu-flexbox-item class="field-label" grow="2">
							<label for="">年龄:</label>
						</mu-flexbox-item>
						<mu-flexbox-item class="" grow="3">
							<mu-text-field hintText="请修改年龄" type="number" @input="inputUage"/>
						</mu-flexbox-item>
					</mu-flexbox>
					<mu-flexbox>
						<mu-flexbox-item class="field-label" grow="2">
							<label for="">手机号码:</label>
						</mu-flexbox-item>
						<mu-flexbox-item class="" grow="3">
							<mu-text-field hintText="请修改手机号码" type="number" :errorText="phoneErrorMsg" @blur="validatePhone" @input="inputUphone"/>
						</mu-flexbox-item>
					</mu-flexbox>
					<mu-flexbox>
						<mu-flexbox-item class="field-label" grow="2">
							<label for="">电子邮箱:</label>
						</mu-flexbox-item>
						<mu-flexbox-item class="" grow="3">
							<mu-text-field hintText="请修改电子邮箱" type="email" :errorText="mailErrorMsg" @blur="validateEmail" @input="inputUmail"/>
						</mu-flexbox-item>
					</mu-flexbox>
					<mu-flexbox>
						<mu-flexbox-item>
							<mu-flat-button primary @click="editSubmit" label="确定" class="edit-submit-button"/>
						</mu-flexbox-item>
						<mu-flexbox-item>
		    				<mu-flat-button @click="editCancel" primary label="取消" class="edit-cancel-button"/>
						</mu-flexbox-item>
					</mu-flexbox>
				</div>
			  </mu-dialog>
			  <mu-snackbar v-if="promptSnackbar" :message="promptInfo" action="关闭" @actionClick="hideSnackbar" @close="hideSnackbar"/>
			</div>
		</div>
		<mu-dialog :open="showDialog" title="提示" bodyClass="dialog-body">
		    {{promptMessage}}
		    <mu-flat-button slot="actions" primary @click="submitOpera" label="确定"/>
		    <mu-flat-button slot="actions" @click="cancelOpera" primary label="取消"/>
		</mu-dialog>
	</div>
</template>
<script>
	import adminLoginDialog from './custom/adminLoginDialog'
	export default {
		data() {
			return {
				openCus: false,
				showDialog: false,
				dialogType: '',
				animatePanel: '',
				promptSnackbar: false,
				showUserList: false,
				promptMessage: '',
				promptInfo: '',
				showEditDialog: false,
				tabelItems: null,
				editUserName: '',
				phoneErrorMsg: '',
				mailErrorMsg:'',
				upwd: '',
				uage:'',
				uphone: '',
				umail: ''
			}
		},
		computed: {
			adminSuc() {
				return this.$store.getters.getAdminName
			},
			userImage() {
				return this.$store.getters.getUserImage
			}
		},
		methods: {
			handleClick() {
				this.openCus = true
			},
			closeDialog() {
				this.openCus = false
			},
			manageUser() {
				this.showUserList = true
				this.animatePanel = 'slideInRight'
				this.$store.dispatch('LOAD_USER_LIST').then((resdata) => {
					this.tabelItems = resdata
				}).catch((err) => {
					console.log(err)
				})
			},
			logOut() {
				this.showDialog = true
				this.promptMessage = '确定要退出登录吗?'
				this.dialogType = 'LOG_OUT'
			},
			submitOpera() {
				if(this.dialogType === 'LOG_OUT') {
					this.closePromptDialog()
					this.animatePanel = ''
					this.tabelItems = null
					this.promptInfo = ''
					this.showUserList = false
					this.promptSnackbar = false
					this.$store.commit('LOG_OUT_ADMIN')
				}
			},
			closePromptDialog() {
				this.showDialog = false
			},
			cancelOpera() {
				this.closePromptDialog()
			},
			showSnackbar () {
		      this.promptSnackbar = true
		      if (this.snackTimer) clearTimeout(this.snackTimer)
		      this.snackTimer = setTimeout(() => { this.promptSnackbar = false }, 2000)
		    },
		    hideSnackbar () {
		      this.promptSnackbar = false
		      if (this.snackTimer) clearTimeout(this.snackTimer)
		    },
			editOneUser(val) {
				this.showEditDialog = true
				this.editUserName = val.target.nextElementSibling.nextElementSibling.attributes['keyid'].value
			},
			deleteOneUser(val) {
				const defineElem = val.target.nextElementSibling.nextElementSibling
				const uname = defineElem.attributes['keyid'].value
				this.$store.dispatch('DELETE_ONE_USER', {
					uname
				}).then((rescode) => {
					if(rescode === 204) {
						this.tabelItems = this.tabelItems.filter((v) => {
							return v.name !== uname
						})
						this.promptInfo = '删除成功'
						this.showSnackbar()
					}

				}).catch((err) => {
					this.promptInfo = '删除失败'
					this.showSnackbar()
					console.log(err)
				})
			},
			editSubmit() {
				if(this.upwd || this.uage || this.uphone || this.umail) {
					if(this.mailErrorMsg || this.phoneErrorMsg) {
						return
					}
					const data = {
						uname: this.editUserName
					}
					if(this.upwd) {
						data.upwd = this.upwd
					}
					if(this.uage) {
						data.uage = this.uage
					}
					if(this.uphone) {
						data.uphone = this.uphone
					}
					if(this.umail) {
						data.umail = this.umail
					}
					this.closeEditDialog()
					this.$store.dispatch('EDIT_ONE_USER_INFO', data)
						.then((rescode) => {
							if(rescode === 202) {
								this.showSnackbar()
								this.promptInfo = '修改成功'
							} else {
								this.showSnackbar()
								this.promptInfo = '修改失败'
							}
						})
						.catch((err) => {
							console.log(err)
						})
				}
			},
			closeEditDialog() {
				this.showEditDialog = false
				this.upwd = this.editUserName = this.umail = this.uphone = this.uage = this.phoneErrorMsg = this.mailErrorMsg = ''
			},
			editCancel() {
				this.closeEditDialog()
			},
			validatePhone(e) {
				const value = e.target.value
				const exp = new RegExp('^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$','g')
				if(value) {
					if(!exp.test(value)) {
						this.phoneErrorMsg = '手机号码格式不正确'
						return false
					}
				}
				this.phoneErrorMsg = ''
				return true
			},
			validateEmail(e) {
				const value = e.target.value
				const exp = new RegExp('^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$','g')
				if(value) {
					if(!exp.test(value)) {
						this.mailErrorMsg = '邮箱格式不正确'
						return false
					}
				}
				this.mailErrorMsg = ''
				return true
			},

			inputUpwd(val) {
				this.upwd = val
			},
			inputUage(val) {
				this.uage = parseInt(val)
			},
			inputUphone(val) {
				this.uphone = val
			},
			inputUmail(val) {
				this.umail = val
			}
		},
		components: {
			adminLoginDialog
		}
	}
</script>
<style lang="less">
	.admin-panel,.admin-panel-manage {
	    width: 500px;
	    position: relative;
	    top: 150px;
	    background: #000;
	    opacity: .66;
	    border-radius: 10px;
	}
	.admin-sub-panel {
		width: 500px;
		height: 450px;
		overflow: scroll;
		position: relative;
		top: 100px;
		left: 21%;
		float: left;
		.mu-table thead tr th:last-child{
			text-align: center;
		}
		.mu-table thead tr {
			th:nth-child(1),th:nth-child(2) {
				width: 130px;
			}
		}
	}
	.admin-panel {
	    .text-center {
	    	text-align: center;
	    	color: #fff;
	    	font-size: 18px;
	    	line-height: 36px;
	    }
	    margin: 0 auto;
	    padding: 32px 40px;
	    height: 100px;
	}
	.dialog-body {
		text-indent: 60px;
	}

	.content-edit-block {
		max-width: 500px;
	    padding: 8px 16px;
	    margin: 0 auto;
	    .field-label label{
    	    display: inline-block;
		    height: 48px;
		    padding-top: 4px;
	    }
    	.edit-submit-button,.edit-cancel-button {
		    margin: 10px auto 0;
	    	display: block;
		}
	}
	.admin-panel-manage {
		left: 30%;
		float: left;
		padding: 15px 40px 15px;
		transition: left .6s ease-in;
		-webkit-transition: left .6s ease-in;
		&.slideLeft {
			left: 10%;
			width: 200px;
			padding: 10px 20px;
			.set-btn {
				margin-bottom: 5px;
				.flex-demo {
					min-width: 95px;
					min-height: 50px;
					&:last-child {
						padding-right:9px;
						margin-top: 8px;
					}
				}
			}
		}
		.user-info {
			margin-bottom: 30px;
		}
		.admin-name {
			color: #fff;
		}
		.set-btn {
			margin-bottom: 20px;
		}
		.flex-demo {
			text-align: center;
			.my-flat-button {
				border-image-source:-webkit-linear-gradient(92deg,#f35626,#feab3a);
				border-image-source:linear-gradient(92deg,#f35626,#feab3a);
				-webkit-animation: hue 60s infinite linear;
				animation: hue 60s infinite linear;
				border-style: solid;
				border-image-width: 1px;
				border-image-slice: 1 0;
				
				.my-flat-label {
					color:#fff;
					line-height:32px;
				}
				&.hover {
					transform: rotateZ(-30deg);
					-webkit-transform: rotateZ(-30deg);
					-moz-transform: rotateZ(-30deg);
				}

			}
		}

	}
	@-webkit-keyframes hue {.mixi-frames-1;}
	@-moz-keyframes hue {.mixi-frames-1;}
	@-ms-keyframes hue {.mixi-frames-1;}
	@-o-keyframes hue {.mixi-frames-1;}
	@keyframes hue {.mixi-frames-1;}

	.mixi-frames-1 ()  {
		from {
			-webkit-filter: hue-rotate(0deg);
		}

		to {
			-webkit-filter: hue-rotate(-360deg);
		}
	}
	
</style>