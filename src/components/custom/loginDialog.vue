<template>
    <div class="main-login">
        <mu-dialog :open="signOpen" @hide="hideDialog">
            <div class="login-header">
                <mu-switch class="signInOrUp" @change="toInOrUp" :disabled="disableSwitch" :value="signUp"/>
                <h3 slots="title" class="titleClass">{{signTitle}}</h3>
                <div class="close-Btn">
                    <mu-icon-button icon="close" tooltip="关闭" @click="close" slot="actions" :disabled="closeSignPanel"/>
                </div>
            </div>
            <div v-if="signUp" class="center">
                <div>
                    <label for="uname">&emsp;请输入用户名:</label>
                    <mu-text-field :name="'uname'" type="text" :value="userVal" :errorText="errorUserMsg" @blur="validateUser" @change="expUser" @input="inputUser"></mu-text-field>
                </div>
                <div>
                    <label for="upassword">&emsp;&emsp;请输入密码:</label>
                    <mu-text-field :name="'upassword'" :value="pwdVal" type="password" :errorText="errorPassMsg" @blur="validatePass" @focus="validateFrontUser" @input="inputPwd" @change="expPwd"></mu-text-field>
                </div>
                <div>
                    <label for="ugpassword">请重新输入密码:</label>
                    <mu-text-field :name="'ugpassword'" :value="ugpwdVal" type="password" :errorText="errorPassAMsg" @blur="validatePassAgain" @focus="validateFrontPwd" @input="inputUgPwd" @change="expUgPwd"></mu-text-field>
                </div>
                <div class="register">
                    <mu-raised-button v-if="registerStatus === 'pending'" label="注册账号" slot="actions" class="demo-raised-button" primary @click="registerUser" :disabled="disabled"></mu-raised-button>
                    <mu-flat-button v-else-if="registerStatus === 'resolved'" label="注册成功" slot="actions" class="demo-raised-button" primary @click="close" /></mu-flat-button>
                    <mu-raised-button v-else-if="registerStatus === 'failed'" label="注册失败" slot="actions" class="demo-raised-button" secondary @click="close" /></mu-flat-button>
                </div>
            </div>
            <div v-else class="center">
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
    name: 'login-dialog',
    data() {
        return this.initialData()
    },
    props: {
        openCus: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        //响应式注册按钮
        errorUserMsg(val) {
        	if(this.signUp) {
        		if (!val && !this.errorPassMsg && !this.errorPassAMsg && this.userVal && this.pwdVal && this.ugpwdVal) {
                	this.disabled = false
                	return true
	            } else {
	                this.disabled = true
	                return false
	            }
        	} else {
        		if(!val && !this.errorPassMsg && this.userVal && this.pwdVal) {
        			this.disabled = false
        			return true
        		} else {
        			this.disabled = true
        			return false
        		}
        	}
        },
        errorPassMsg(val) {
        	if(this.signUp) {
        		if (!val && !this.errorUserMsg && !this.errorPassAMsg && this.userVal && this.pwdVal && this.ugpwdVal) {
                	this.disabled = false;
                	return true
	            } else {
	                this.disabled = true;
	                return false
	            }	
        	} else {
        		if(!val && !this.errorUserMsg && this.userVal && this.pwdVal) {
        			this.disabled = false
        			return true
        		} else {
        			this.disabled = true
        			return false
        		}
        	}
            
        },
        errorPassAMsg(val) {
            if (!val && !this.errorUserMsg && !this.errorPassMsg && this.userVal && this.pwdVal && this.ugpwdVal) {
                this.disabled = false;
                return true
            } else {
                this.disabled = true;
                return false
            }
        },
        signUp(val,oldVal) {
            if(val !== oldVal)
        	   this.resetData()
        }
    },
    computed: {
        signTitle() {
            return this.signUp ? '注册账号' : '账号登录'
        },
        signOpen() {
            return this.openCus
        }
    },
    methods: {
        initialData() {
            return {
                signUp: false,
                errorUserMsg: '',
                errorPassMsg: '',
                errorPassAMsg: '',
                userVal: '',
                pwdVal: '',
                ugpwdVal: '',
                disableSwitch: false,
                closeSignPanel: false,
                registerStatus: 'pending',
                disabled: false
            }
        },
        resetData() {
        	const {
        		errorUserMsg,
        		errorPassMsg,
        		errorPassAMsg,
        		userVal,
        		pwdVal,
        		ugpwdVal,
        		registerStatus,
                disableSwitch,
        		disabled,
                closeSignPanel    		
        	} = this.initialData()
        	this.errorUserMsg = errorUserMsg
        	this.errorPassMsg = errorPassMsg
        	this.errorPassAMsg = errorPassAMsg
        	this.userVal = userVal
        	this.pwdVal = pwdVal
        	this.ugpwdVal = ugpwdVal
			this.registerStatus = registerStatus
			this.disabled = disabled
            this.closeSignPanel = closeSignPanel
            this.disableSwitch = disableSwitch
        },
        close() {
            this.signOpen = false
            this.signUp = false
            this.$emit('backBeforeSign')
        },
        toInOrUp() {
            this.signUp = !this.signUp
        },
        logSuccess() {
            this.close()
            this.$emit('setLogStatus',{
                type: true
            })
        },
        logFailed() {
            this.close()
            this.$emit('setLogStatus', {
                type: false
            })
        },
        hideDialog() {
        	this.resetData()
        },
        inputUser(val) {
            this.userVal = val
        },
        inputPwd(val) {
            this.pwdVal = val
        },
        inputUgPwd(val) {
            this.ugpwdVal = val
        },
        expUser(val) {
            const value = typeof val === 'string' ? val : val.target.value
            const expUser = new RegExp(/^([a-zA-Z]|[\u4E00-\u9FA5]){1}([a-zA-Z0-9]|[\u4E00-\u9FA5]|[_]){5,15}$/, "g")
            if (value.length < 6 || value.length > 16) {
                this.errorUserMsg = "用户名只能由6-16位字符组成"
                return false
            }
            if (!expUser.test(value)) {
                this.errorUserMsg = "用户名不合法"
                return false
            } else {
                this.findSameUser(value)
            }
        },
        expPwd(val) { //改变密码并失去焦点后
            const value = typeof val === 'string' ? val : val.target.value
            if (value.length < 8 || value.length > 16) {
                this.errorPassMsg = "密码必须为8-16位"
                return false
            } else if (value !== this.ugpwdVal && this.ugpwdVal) {
                this.errorPassAMsg = "用户密码不一致"
            } else if (value === this.ugpwdVal) {
                this.errorPassAMsg = ""
            }
            this.errorPassMsg = "";
            return true
        },
        expUgPwd(val) {
            const value = typeof val === 'string' ? val : val.target.value
            if (value !== this.pwdVal) {
                this.errorPassAMsg = "用户密码不一致"
                return false
            }
            this.errorPassAMsg = "";
            return true
        },
        /*
         *  validate-* methods 是输入框失去焦点触发的事件
         */
        validateUser(val) {
            const value = typeof val === 'string' ? val : val.target.value
            if (!value) {
                this.errorUserMsg = "用户名不能为空"
                return false
            }
            if(!this.signUp){       //如果是账号登录面板,若验证通过则重置正确的errormsg
            	this.errorUserMsg = ""
            	return true
            }
        },
        validatePass(val) {
            const value = typeof val === 'string' ? val : val.target.value
            if (!value) {
                this.errorPassMsg = "密码不能为空"
                return false
            }
            if(!this.signUp){       //如果是账号登录面板,若验证通过则重置正确的errormsg
            	this.errorPassMsg = ""
            	return true
            }
        },
        validatePassAgain(val) {
            const value = typeof val === 'string' ? val : val.target.value
            if (value === "" || value === undefined) {
                this.errorPassAMsg = "密码不能为空"
                return false
            }
            if (value !== this.pwdVal) {
                this.errorPassAMsg = "用户密码不一致"
                return false
            } else {
                this.errorPassAMsg = ""
                if (!this.errorUserMsg && !this.errorPassMsg) this.disabled = false
                return true
            }
        },
        validateFrontUser() {
            if (!this.userVal) {
                this.errorUserMsg = "用户名不能为空"
                return false
            }
        },
        validateFrontPwd() {
            if (!this.userVal) {
                this.errorUserMsg = "用户名不能为空"
            }
            if (!this.pwdVal) {
                this.errorPassMsg = "密码不能为空"
            }
            return this.errorUserMsg || this.errorPassMsg ? false : true
        },
        findSameUser(val) { //检查该用户名是否已被占用
            this.$store.dispatch('SAME_USERNAME', {
                value: val
            }).then((data) => {
                if (data.rescode === 1) {
                    this.errorUserMsg = "此用户名已被注册"
                    return false
                } else {
                    console.log('here will be fix 加右边提示正确按钮')
                    this.errorUserMsg = ""
                    return true
                }
            }).catch((err) => {
                console.log(err)
                return false
            })
        },
        registerUser() {
        	if(!this.userVal || !this.pwdVal || !this.ugpwdVal)
        	{
        		return this.validateUser(this.userVal) && this.validatePass(this.pwdVal) && this.validatePassAgain(this.ugpwdVal)
        	}
            const udata = {
                uname: this.userVal,
                upwd: this.pwdVal
            }
            this.$store.dispatch('REGISTER_USER', {
                data: udata
            }).then((data) => {
                if (data.rescode === 0) {
                    console.log('用户注册成功')
                    this.registerStatus = 'resolved'
                    this.closeSignPanel = true
                    this.disableSwitch = true
                }
            }).catch((err) => {
                console.log('用户注册失败=>>> ', err)
                this.registerStatus = 'failed'

            })
        },
        loginUser() {
        	if(!this.userVal || !this.pwdVal) {
        		return this.validateUser(this.userVal) && this.validatePass(this.pwdVal)
        	}
        	const udata = {
        		uname: this.userVal,
        		upwd: this.pwdVal
        	}
        	this.$store.dispatch('LOGIN_USER', {
        		data: udata
        	}).then((res) => {
        		if(res.rescode === 0) {
        			console.log('用户登录成功')
                    this.registerStatus = 'resolved'
                    this.disableSwitch = true
                    this.closeSignPanel = true
        		} else {
        			console.log('用户不存在或密码错误')
        			this.errorUserMsg = "用户不存在或密码错误"
        			// this.registerStatus = 'failed'
        		}
        	}).catch((err) => {
                this.registerStatus = "failed"
        		console.log(err)
        	})
        }
    }
}
</script>
<style lang="scss">
.main-login {
    width: 60%;
    min-width: 450px;
    height: 300px;
    margin: 0 auto;
}
.close-Btn {
    display: inline-block;
    float: right;
}
.signInOrUp {
    transform: rotate(90deg)
}

.center {
    margin: 0 auto;
    width: 400px;
    min-width: 400px;
}

.register, .login {
    margin-top: 30px;
    text-align: center;
}

.titleClass {
    color: #009688;
    margin-left: 20px;
    display: inline-block;
}
</style>
