<template>
    <div>
        <van-overlay :show="show"  @click="overlayClose()"/>
    </div>
</template>
<script setup>
import { Overlay } from 'vant';
import {ref,defineProps,watch} from 'vue'
// const show = ref(false)
const props = defineProps({
    show:{
        type:Boolean,
        default:false
    }
});
const overlayClose = ()=>{

};
watch(
     ()=>props.show,
     (val,oldval)=>{
        console.log(val,oldval)
     }
)
</script>