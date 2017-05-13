<template>
	<div class="main-login">
		<mu-dialog :open="signOpen" @hide="hideDialog">
			<div class="login-header">
                <h3 slots="title" class="titleClass">{{signTitle}}</h3>
                <div class="close-Btn">
                    <mu-icon-button icon="close" tooltip="关闭" @click="close" slot="actions" :disabled="closeSignPanel"/>
                </div>
            </div>
			<div class="center">
            	<div>
                    <label for="ulogname">请输入用户名:</label>
                    <mu-text-field :name="'ulogname'" type="text" :value="userVal" :errorText="errorUserMsg" @blur="validateUser" @input="inputUser"></mu-text-field>
                </div>
                <div>
                    <label for="ulogpassword">&emsp;请输入密码:</label>
                    <mu-text-field :name="'ulogpassword'" :value="pwdVal" type="password" :errorText="errorPassMsg" @blur="validatePass" @input="inputPwd"></mu-text-field>
                </div>
                <div class="login">
                	<mu-raised-button v-if="registerStatus === 'pending'" label="登录" slot="actions" class="demo-raised-button" primary @click="loginUser" :disabled="disabled"></mu-raised-button>
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
                userVal: '',
                pwdVal: '',
                closeSignPanel: false,
				registerStatus: 'pending'
			}
		},
		computed: {
			signOpen() {
				return this.openCus
			},
	        signTitle() {
	            return this.signUp ? '注册账号' : '账号登录'
	        },
		},
		props: {
			openCus: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			inputPwd() {

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