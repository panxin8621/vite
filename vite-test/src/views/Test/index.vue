<template>
    <div class="index">
        <div v-for="(item,index) in ata" :key="index">{{ item.introduction }}</div>
        姓名：<input type="text" v-model="formData.name">
        介绍：<input type="text" v-model="formData.adduser">
        <button @click="add">增加</button>
    </div>
</template>
<script setup>
import { onMounted,ref } from 'vue';
import apiTest from '@/api/test' 
const ata = ref({})
const formData = ref({

})
const getSchool = async ()=>{
    const data = await apiTest.getSchool({})
    ata.value = data.result
};
const add = async ()=>{
    console.log(formData.value)
    const {result} = await apiTest.postPeople({...formData.value})
    console.log(result)
    getSchool()
};
onMounted(()=>{
    getSchool()
})
</script>
<route>
    {
		meta: {
			layout: 'test'
		}
	}
</route>