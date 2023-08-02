<template>
    <div class="index" @click="toUrl('Test')">
        api-test
    </div>
    <div class="index" @click="toUrl('Three')">
        three.js
    </div>
    <div class="index" @click="toUrl('Floating')">
        floating组件
    </div>
    <div class="index" @click="toUrl('List')">
        可视区域判断
    </div>
    <div class="index" @click="toUrl('List-ListCom')">
        组件封装
    </div>
    <div class="index" @click="toUrl('Fileview')">
        文件预览
    </div>
</template>
<script setup>
import { setToken } from "@/utils/storage";
import { onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import loginApi from '@/api/login';
import analyze from '@/utils/urlAnalyze';
// analyze()
const route = useRoute();
const router = useRouter();
chalk.warn('Malita');
const toUrl = (url) => {
    router.push({
        name: url
    })
};
const loginUser = async (item) => {
    const { result } = await loginApi.mlogin({
        name: item.name,
        idCard: item.idCard
    });
    setToken(result.token)
};
onMounted(() => {
    loginUser({
        name: '沈文绒',
        idCard: '330281200010023321'
    })
    analyze.getUrlParams('https://zeekrlife.com/?name=coder&age=20&callback=https%3A%2F%2Fzeekrlife.com%3Fname%3Dtest&list[]=a&list[]=b&json=%7B%22str%22%3A%22abc%22,%22num%22%3A123%7D')
})
</script>
<style lang="less"></style>