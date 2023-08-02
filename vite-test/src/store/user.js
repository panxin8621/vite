import { defineStore } from "pinia";

export const userStore = defineStore("user", {
	state: () => {
		return {
			name: "jim green",
			token: "",
			user: {
				roleTypeList: [],
			},
			currentRole: "",
			userEX: {},
			location: {}
		};
	},
	getters: {
		getToken: (state) => state.token,
		getUser: (state) => state.user,
		getUserEX: (state) => state.userEX,
		getRoles: (state) => {
			// 1 儿童监护人 2 儿童主任 3 未保联盟 4 爱心人士/爱心机构
			const roleArr = [];
			if (state.user.childInfo) {
				roleArr.push('1');
			}
			if (state.user.charityAndSocialOrg) {
				roleArr.push('3');
			}
			if (state.user.caring) {
				roleArr.push('4');
			}
			return roleArr;
		},
		getCaringType: (state) => {
			if (state.user.caring) {
				// 1：爱心企业 2：爱心人士
				return state.user.caring.type;
			}
			return null;
		},
		getCurrentRole: (state) => state.currentRole,
		getLocation: (state) => state.location
	},
	actions: {
		updateToken(token) {
			this.token = token;
		},
		updateUser(user) {
			this.user = user;
		},
		updateUserEX(userEX) {
			this.userEX = userEX;
		},
		updateCurrentRole(currentRole) {
			this.currentRole = currentRole;
		},
		updateLocation(location) {
			this.location = location;
		},
	},
	persist: {
		storage: sessionStorage,
	},
});
