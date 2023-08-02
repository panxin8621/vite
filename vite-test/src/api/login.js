import http from '@/utils/http'

const loginApi = {
    async mlogin(params){
        return await http.post("/appUser/login", params);
    },
    async listTest(params){
        return await http.get("/zlb/supportresource/resourceCommon/list",params)
    }
}

export default loginApi