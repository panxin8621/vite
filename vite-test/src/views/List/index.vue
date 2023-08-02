<template>
    <div class="index" @mousewheel="scrollChange" @touchstart.stop="handlerTouchStart" @touchmove.stop="handlerTouchMove"
        @touchend.stop="handlerTouchEnd">
        <div class="loadingTop">
        <span v-show="!loadingTop">松开刷新</span>
        <span v-show="loadingTop"><van-loading type="spinner" /></span>
        </div>
        <div class="list" v-for="(item, index) in lis" :key="index" :class="index % 2 == 1 ? 'bg1' : 'bg2'">{{ item }}</div>
        <div class="loading"><van-loading type="spinner" />加载中。。。</div>
    </div>
</template>
<script setup>
import { onMounted, ref, defineComponent } from 'vue';
import { Loading } from 'vant';
const lis = ref([])
const pageNo = ref(1)
const pageSize = ref(10)
const loadList = () => {
    console.log('lo', pageNo.value)
    for (let i = 1 + (pageNo.value - 1) * pageSize.value; i <= pageNo.value * pageSize.value; i++) {
        lis.value.push(i)
        jieliu.value = true
    }
}
const isInViewPortOfOne = (el) => {
    const viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    const offsetTop = el.offsetTop
    const scrollTop = document.documentElement.scrollTop
    const top = offsetTop - scrollTop
    // console.log('top', viewPortHeight, top, top <= viewPortHeight)
    // 这里有个+100是为了提前加载+ 100
    return top <= viewPortHeight + 100
}
const jieliu = ref(true)
const scrollChange = () => {
    if (isInViewPortOfOne(document.querySelector('.loading')) && jieliu.value) {
        jieliu.value = false
        setTimeout(() => {
            pageNo.value++
            loadList()
        }, 1000)
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
const loadingTop = ref(false)
const handlerTouchEnd = () => {
    loadingTop.value = true
    setTimeout(() => {
        pageNo.value = 1
        lis.value=[]
        loadList()
        loadingTop.value = false
         moveDistance.value = 0
        document.querySelector('.index').style.transform = `translateY(${0}px)`
    }, 1000)
    // moveDistance.value = 0
    // document.querySelector('.index').style.transform = `translateY(${0}px)`
}
onMounted(() => {
    loadList()
    const index = document.querySelector('.index')
    window.addEventListener('scroll', scrollChange, true)
})
</script>
<style>
.index {
    width: 100%;
    height: 100%;
    transition: all 0.5s;
    .list {
        line-height: 10vh;
        text-align: center;
        width: 100vw;
        height: 20vh;
    }

    .bg1 {
        background-color: azure;
    }

    .bg2 {
        background-color: bisque;
    }

    .loading {
        height: 10vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .loadingTop{
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: -100px;
        /* transform: translateY(-100px); */
    }
}
</style>
<route>
    {
		meta: {
			layout: 'list'
		}
	}
</route>