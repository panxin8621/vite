<template>
    <div class="index" @mousewheel="scrollChange" @touchstart.stop="handlerTouchStart" @touchmove.stop="handlerTouchMove"
        @touchend.stop="handlerTouchEnd">
        <div class="loadingTop">
            <span v-show="loadingTop == 1">松开刷新</span>
            <span v-show="loadingTop == 2"><van-loading type="spinner" /></span>
            <span v-show="loadingTop == 3">刷新完毕</span>
        </div>
        <div class="content">
            <slot></slot>
        </div>
        <div class="loading" v-if="more"><van-loading type="spinner" />加载中。。。</div>
        <div class="nomore" v-if="!more">没有更多了</div>
    </div>
</template>
<script setup>
import { onMounted, ref, defineComponent, watch } from 'vue';
import { Loading } from 'vant';
const props = defineProps({
    pageSize: {
        type: Number,
        default: 10,
    },
    // loadingTop: {
    //     type: Boolean,
    //     default: false
    // },
    jieliu: {
        type: Boolean,
        default: true
    },
    more: {
        type: Boolean,
        default: false
    }
});
const more = ref(true)
const computedNum = (size, total) => {
    if (size >= total) {
        more.value = false
    }
};

const emit = defineEmits(['change'])
const isInViewPortOfOne = (el) => {
    if (!el) {
        return
    }
    const viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    const offsetTop = el.offsetTop
    const scrollTop = document.documentElement.scrollTop
    const top = offsetTop - scrollTop
    // console.log('top', viewPortHeight, top, top <= viewPortHeight)
    // 这里有个+100是为了提前加载+ 100
    console.log(top <= viewPortHeight + 100, props.jieliu)
    return top <= viewPortHeight + 100
}
const scrollChange = () => {
    if (isInViewPortOfOne(document.querySelector('.loading')) && props.jieliu) {
        // props.jieliu = false
        emit('change', 'up')
        return
    }
}
/*
下拉拖动函数
touchstart:手指触屏触发事件，主要作用是在触发时获取鼠标点击的y坐标 event.touches[0].pageY
touchmove:手指滑动触发事件,主要工作是在触发时获取移动的Y坐标减去开始时的 Y坐标，得出移动的距离，然后利用transform改变容器的位置
touchend：手指松开事件，主要工作是让容器回到原来位置
*/
const startLocation = ref(''); // 记录鼠标点击的位置
const moveDistance = ref(0); // 记录移动的位置
const distance = ref('') // 记录移动的距离
const handlerTouchStart = (event) => {
    startLocation.value = event.touches[0].pageY
};
const handlerTouchMove = (event) => {
    moveDistance.value = Math.floor(event.touches[0].pageY - startLocation.value)
    if (moveDistance.value < 100) {
        document.querySelector('.index').style.transform = `translateY(${moveDistance.value}px)`
    }
};
const loadingTop = ref(1)
const handlerTouchEnd = () => {
    if (moveDistance.value > 50) {
        loadingTop.value = 2
        emit('change', 'down')
    }
};
const downOk = () => {
    loadingTop.value = 3
};
watch(
    () => loadingTop.value,
    (val, oldval) => {
        if (val == 3) {
            moveDistance.value = 0
            document.querySelector('.index').style.transform = `translateY(${0}px)`
            setTimeout(()=>{
                loadingTop.value = 1
            },800)
        }
    }
)
defineExpose({
    computedNum,
    downOk
})
onMounted(() => {
    const index = document.querySelector('.index')
    window.addEventListener('scroll', scrollChange, true)
})
</script>
<style>
.index {
    width: 100%;
    height: 100%;
    transition: all 0.5s;
    position: relative;
    .content {
        min-height: 80vh;
    }

    .loading {
        height: 10vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .loadingTop {
        position: absolute;
        top: 0 ;
        left: 0;
        width: 100%;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        /* margin-top: -100px; */
        z-index: 0;
        transform: translateY(-100px);
    }
}
</style>
