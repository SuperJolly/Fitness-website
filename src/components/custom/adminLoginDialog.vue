<template>
	<div class="main-login">
		<mu-dialog :open="openDialog">
			<div class="login-header">
                <h3 slots="title" class="titleClass">管理员登录</h3>
                <div class="close-Btn">
                    <mu-icon-button icon="close" tooltip="关闭" @click="close" slot="actions" :disabled="closeDisabled"/>
                </div>
            </div>
			<div class="center">
            	<div>
                    <label for="ulogname">请输入用户名:</label>
                    <mu-text-field :name="'adminName'" type="text" :value="adminNameVal" :errorText="errorUserMsg" @blur="validateUser" @input="inputUser"></mu-text-field>
                </div>
                <div>
                    <label for="ulogpassword">&emsp;请输入密码:</label>
                    <mu-text-field :name="'adminPass'" type="password" :value="adminPwdVal" :errorText="errorPassMsg" @blur="validatePass" @input="inputPwd"></mu-text-field>
                </div>
                <div class="login">
                	<mu-raised-button v-if="registerStatus === 'pending'" label="登录" slot="actions" class="demo-raised-button" primary @click="loginUser" :disabled="disabled" @keyup.enter="loginUser"></mu-raised-button>
					<mu-raised-button v-else-if="registerStatus === 'resolved'" label="登录成功" slot="actions" class="demo-raised-button" secondary @click="logSuccess"></mu-raised-button>
                    <mu-raised-button v-else-if="registerStatus === 'failed'" label="登录失败" slot="actions" class="demo-raised-button" secondary @click="logFailed" /></mu-flat-button>
                </div>
            </div>
		</mu-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				errorUserMsg: '',
                errorPassMsg: '',
                adminNameVal: '',
                adminPwdVal: '',
                adminAuth: '',
                disabled: false,
                closeDisabled: false,
				registerStatus: 'pending'
			}
		},
		computed: {
			openDialog() {
				return this.openCus
			}
		},
		props: {
			openCus: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			initData() {
				this.errorUserMsg = ''
				this.errorPassMsg = ''
				this.adminNameVal = ''
				this.adminPwdVal = ''
				this.disabled = false
				this.closeDisabled = false
				this.registerStatus = 'pending'
			},
			inputUser(val) {
				this.adminNameVal = val
			},
			inputPwd(val) {
				this.adminPwdVal = val
			},
			validateUser() {
				if(!this.adminNameVal) {
					this.errorUserMsg = '管理员名不能为空'
					this.disabled = true
					return false
				}
				this.errorUserMsg = ''
				this.disabled = false
				return true
			},
			validatePass() {
				if(!this.adminPwdVal) {
					this.errorPassMsg = '管理员密码不能为空'
					this.disabled = true
					return false
				}
				this.errorPassMsg = ''
				this.disabled = false
				return true
			},
			close() {
				this.initData()
				this.$emit('closeDialog')
			},
			loginUser() {
				this.closeDisabled = true
				if(this.validateUser() && this.validatePass()) {
					this.$store.dispatch('LOGIN_ADMIN', {
						'uname': this.adminNameVal,
						'upwd': this.adminPwdVal
					}).then((resdata) => {
						if(resdata.rescode === 203) {           //用户登录成功
							this.registerStatus = 'resolved'
							this.adminAuth = resdata.resdata
						} else {     					//用户不存在或登录出错
							this.registerStatus = 'failed'
						}
					}).catch((err) => {
						console.log(err)
					})
				}
			},
			logSuccess() {
				this.close()
				this.$store.commit('SET_ADMIN_NAME', {name:this.adminAuth})
			},
			logFailed() {
				this.close()
			}
		}
	}
</script>

<style lang="less">
	.main-login {
	    width: 60%;
	    min-width: 450px;
	    height: 300px;
	    margin: 0 auto;
	}
	.center {
	    margin: 0 auto;
	    width: 400px;
	    min-width: 400px;
	}
</style>