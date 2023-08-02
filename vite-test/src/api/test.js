import http from '@/utils/http';

const apiTest = {
    async getSchool(params){
        return await http.get(`users/school`,params)
    },
    async postPeople(params){
        return await http.post(`users/man`,params)
    },
}


export default apiTest