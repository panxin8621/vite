<template>
    <div class="index">
        <van-button @click="show=!show">预览</van-button>
       <file-view v-model:show="show"></file-view>
    </div>
</template>
<script setup>
import FileView from '@/components/FileView.vue';
import { onMounted, ref } from 'vue';
const show = ref(false)
onMounted(() => {
})
</script>
<route>
    {
		meta: {
			layout: 'fileview'
		}
	}
</route>