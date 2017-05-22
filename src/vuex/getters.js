export default {
	completedPlans(state) {
		return state.fieldPlans
	},
	getAuthStatus(state) {
		return state.userlogIn
	},
	getUserImage(state) {
		return state.userImage
	},
	getUserName(state) {
		return state.userId
	},
	getUserIntro(state) {
		return state.userIntro
	},
	getAdminName(state) {
		return state.admin.adminName
	}
}