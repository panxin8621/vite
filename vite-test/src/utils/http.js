import service from "./axios";

export const request = (config) => {
    return new Promise((resolve, reject) => {
        service
            .request(config)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                console.error("request fail: " + err.message);
            });
    });
};

const http = {
    get(url, params = {}, config = {}) {
        return request({ url, params, ...config, method: "GET" });
    },
    post(url, data = {}, config = {}) {
        return request({ url, data, ...config, method: "POST" });
    },
    put(url, params = {}, config = {}) {
        return request({ url, params, ...config, method: "PUT" });
    },
};

export default http;
