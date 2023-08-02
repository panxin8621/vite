import { defineStore } from "pinia";

export const basicStore = defineStore("basic", {
	state: () => {
		return {
			uiStyle: "normal", // 'normal' || 'elder'
			depart: {},
			plightType: [], //困境类型
			riskMatter: [] //风险情形
		};
	},
	getters: {
		getUIStyle: (state) => state.uiStyle,
		getDepart: (state) => state.depart,
		getPlightType: (state) => state.plightType,
		getRiskMatter: (state) => state.riskMatter,
	},
	actions: {
		updateUIStyle(uiStyle) {
			this.uiStyle = uiStyle;
		},
		updateDepart(depart) {
			this.depart = depart;
		},
		updatePlightType(plightType) {
			this.plightType = plightType;
		},
		updateRiskMatter(riskMatter) {
			this.riskMatter = riskMatter;
		},
	},
	persist: {
		storage: sessionStorage,
	},
});
