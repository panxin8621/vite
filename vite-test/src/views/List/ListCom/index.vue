<template>
    <div>
        <div class="title">top</div>
        <rufesh-list ref="rufesh" @change='change' :jieliu="isUpre" :loadingTop='isDownre' >
            <div class="wu" v-for="(item, index) in list" :key="index">{{ item.contactName }}</div>
        </rufesh-list>
    </div>
</template>
<script setup>
import RufeshList from '../../../components/RufeshList.vue';
import { onMounted, ref } from 'vue';
import loginApi from '@/api/login'
const isUpre = ref(true)
const isDownre = ref(false)
const change = (e) => {
    isUpre.value = false
    // isDownre.value = true
    console.log(e)
    if (e == 'up') {
        pageNo.value++
        loadList()
    } else {
        list.value = []
        pageNo.value = 1
        loadList()
    }
};
const pageNo = ref(1)
const list = ref([])
const rufesh = ref()
const loadList = async () => {
    const { result } = await loginApi.listTest({ pageNo: pageNo.value, type: 0, pageSize: 3 })
    list.value = [...list.value, ...result.records]
    rufesh.value.computedNum(list.value.length,result.total)
    rufesh.value.downOk()
    isUpre.value = true
    // isDownre.value = false
}

onMounted(() => {
    loadList()
})
</script>
<style>
.title{
    width: 100vw;
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #d0d0d0;
    z-index: 99;
    /* position: fixed;
    top: 0;
    left: 0; */
}
.wu {
    width: 100%;
    height: 40vh;
    margin-bottom: 10px;
    border-bottom: 1px solid #ccc;
}
</style>
<route>
    {
        meta: {
			layout: 'list'
		}
    }
</route>