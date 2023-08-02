import axios from "axios";
import { showToast, closeToast } from "vant";
import router from "@/router";
// import { userStore } from "@/store/user";
import { getToken } from "./storage";

// import { useRoute,useRouter } from "vue-router";
axios.defaults.headers.post["Content-Type"] =
    "application/json";

// 创建axios实例
const service = axios.create({
    // 根据不同env设置不同的baseURL
    baseURL: import.meta.env.VITE_APP_BASE_URL,
    withCredentials: true, // send cookies when cross-domain requests
    timeout: 15000, // request timeout
});
// const router = useRouter();
// axios实例拦截请求
service.interceptors.request.use(
    (config) => {
        // 默认开启loading
        if (!config.loading) {
            // loading
            showToast({
                type: "loading",
                message: "正在加载",
                duration: 0,
                forbidClick: true,
            });
        }

        // const UserStore = userStore();

        config.headers = {
            ...config.headers,
            "X-Access-Token": getToken(),
            // token: UserStore.getters.getToken,
            // ...auth.headers(), // 你的自定义headers，如token等
        };
        return config;
    },
    (error) => {
        showToast({
            type: "fail",
            message: "Error: " + error,
            forbidClick: true,
        });
        return Promise.reject(error);
    }
);

// axios实例拦截响应
service.interceptors.response.use(
    // 2xx时触发
    (response) => {
        // response.data就是后端返回的数据，结构根据你们的约定来定义
        const { code, message, success } = response.data;
        // let errMessage = "";
        // switch (code) {
        // 	case 0:
        // 		break;
        // 	case 1: // token过期
        // 		errMessage = "Token expired";
        // 		router.push("/login");
        // 		break;
        // 	case 2: // 无权限
        // 		errMessage = "No permission";
        // 		break;
        // 	default:
        // 		errMessage = message;
        // 		break;
        // }
        // if (errMessage) Toast.fail(errMessage);
        if (!success) {
            showToast({
                type: "fail",
                message: "Error: " + message,
                forbidClick: true,
            });
            return Promise.reject(response.data);
        }

        // if (response.data.result?.sensitive) {
        // 	res.data.result2 = JSON.parse(
        // 		DecryptRSA(res.data.resultData.encrypt)
        // 	);
        // 	res.data.result = res.data.result.sensitive;
        // }
      

        closeToast();

        return response;
    },
    // 非2xx时触发
    (error) => {
        if (error.message.indexOf('timeout') > -1) {
            showToast({
                type: "fail",
                message: "网络繁忙，请稍候再试",
                forbidClick: true,
            });
        } else {
            showToast({
                type: "fail",
                message: "Error: " + error,
                forbidClick: true,
            });
        }

        return Promise.reject(error);
    }
);

export default service;
