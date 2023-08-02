<template>
    <div class="index">
        <FloatingBubble axis="xy" icon="chat" magnetic="x" @offset-change="onOffsetChange" >
        </FloatingBubble>
    </div>
</template>
<script setup>
import { onMounted, ref, defineComponent } from 'vue';
import { FloatingBubble } from 'vant';

const onOffsetChange = (offset) => {
    // showToast(`x: ${offset.x.toFixed(0)}, y: ${offset.y.toFixed(0)}`);
};
onMounted(() => {

})
</script>
<style>
.index {
    /* width:100%;
    height:100%; */
}
</style>
<route>
    {
		meta: {
			layout: 'floating'
		}
	}
</route>