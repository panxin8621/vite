const analyze = {
    // 获取URL中的参数
    getUrlParams(name){
        let url = new URL(name).search
        const params = {};
        const keys = url.match(/([^?&]+)(?==)/g);
        const values = url.match(/(?<==)([^&]*)/g);
        console.log(keys)
        console.log(values)
        for (const index in keys) {
            if (params[keys[index]] === undefined){
                if (decodeURIComponent(values[index]).indexOf('{')!=-1){
                    params[keys[index]] = JSON.parse(decodeURIComponent(values[index]))
                }else{
                    params[keys[index]] =decodeURIComponent(values[index]) 
                }
               
            }else{
                params[keys[index]] = [params[keys[index]],decodeURIComponent(values[index])]; 
                let newList = keys[index].split('[')[0];
                params[newList] = params[keys[index]]
                delete params[keys[index]]
            }
        }
        console.log(params);
    }
}
export default analyze