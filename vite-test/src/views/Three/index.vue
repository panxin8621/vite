<template>
    <div class="index" id="index">
    </div>
</template>
<script setup>
import { onMounted, ref, getCurrentInstance } from 'vue';
import * as Three from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import iTab from './iTab.jpg'
const $Three = ref(null);
let scene = null;
let camera = null;
let renderer = null;
let mesh = null;
let controls = null;
let angle = 0;
let getmetry = null;
// const $OrbitControls = proxy.$OrbitControls;
const options = {
    message: 'dat.gui',
    speed: 0.8,
    displayOutline: false,
    number:0,
    color0:'#ffae23',
    button: function () { 
        console.log('click')
    }
}
const guiRender = () => {
    const gui = new GUI();
    gui.add(options, 'message')
    var controller = gui.add(options, 'speed', -5, 5)
    gui.add(options, 'displayOutline')
   
     gui.add(options, 'number').min(0).max(10).step(1);
    controller.onChange(function (value) {
        console.log("onChange:" + value)
    });
    controller.onFinishChange(function (value) {
        console.log("onFinishChange" + value)
    });
    gui.add(mesh.position, 'x').min(0).max(300).step(10).name('移动x轴').onChange(value => {
        console.log('x轴的值:', value)
    })
    options.color0 = '#ffae23' // CSS string
    options.color1 = [0, 128, 255] // RGB array
    options.color2 = [0, 128, 255, 0.3] // RGB with alpha
    options.color3 = { h: 350, s: 0.9, v: 0.3 } // Hue, saturation, value

    // 修改立方体颜色
    gui.addColor(options, 'color0').name('立方体颜色').onChange((value) => {
        console.log(value)
        mesh.material.color.set(value)
    })
    gui.addColor(options, 'color1')
    gui.addColor(options, 'color2')
    gui.addColor(options, 'color3')
    gui.add(options, 'button')
};


const init = () => {
    // const { proxy } = getCurrentInstance()
    let index = document.getElementById('index');
    console.log(Three)
    // 创建场景对象
    scene = new Three.Scene();
    // PerspectiveCamera（透视相机-有好多种，暂且先试用这个）
    // 第一个参数是视野角度:显示器上看到的场景的范围，
    // 第二个参数是长宽比（aspect ratio）：物体的宽/高
    // 三四参数是视锥体的近截面（near）和远截面（far）（这个慢慢查资料吧，哈哈哈） 
    // 创建相机对象
    camera = new Three.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 3000);
    // 相机位置
    camera.position.set(0, 0, 200);
    // 创建渲染器对象
    renderer = new Three.WebGLRenderer();
    // 渲染区域的宽高
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
    // 给dom添加渲染器
    index.appendChild(renderer.domElement);
    // 创建正方体
    getmetry = new Three.PlaneGeometry(200,100 );
    //纹理贴图加载器TextureLoader
    const texLoader = new Three.TextureLoader();
    const texture = texLoader.load(iTab);
    // 创建材质来让它有颜色（MeshBasicMaterial-材质,十六进制的颜色格式,transparent是否透明，透明度)
    // 材质：MeshBasicMaterial：以平面或线框方式来绘制几何体的材质（不受光照影响）
    // 材质：MeshLambertMaterial：漫反射材质（受光照影响） 
    // 这里使用MeshLambertMaterial是为了测试光照，任选其一都可以
    const material = new Three.MeshBasicMaterial({ color: options.color0, transparent: false, opacity: 0.5, map: texture, });
    // 需要一个网格模型对象（mesh）
    // 网格包含一个几何体以及作用在此几何体上的材质
    // 接受参数（创建的实例，显示的材质）这样实例就已经显示到网格上了
    mesh = new Three.Mesh(getmetry, material);
    // 设置网格位置
    mesh.position.set(0, 0, 0);
    // 把网格添加到场景中
    scene.add(mesh);
    // 环境光：AmbientLight
    // 点光源：PointLight
    // 可接受两个参数-表述光源颜色和光照强度
    const light = new Three.AmbientLight(0xffffff, 40);
    // 光照位置
    light.position.set(0, 0, 0);
    scene.add(light);


    // 创建轨道控制器
    controls = new OrbitControls(camera, renderer.domElement);
    // 监听轨道控制器变化重新渲染
    controls.addEventListener('change', changRender)
};
//
// 渲染循环”（render loop）或者“动画循环 (animate loop）
const animate = () => {
    // requestAnimationFrame：相比较定时器，当用户切换到其它的标签页时，它会暂停，因此不会浪费用户宝贵的处理器资源
    requestAnimationFrame(animate);

    // 改变网格位置，获得旋转动画
    // mesh.rotation.x += 0.01;
    // mesh.rotation.y += 0.01;

    // 改变相机的位置.position，三维场景在canvas画布上呈现不同的效果，如果连续改变相机的位置.position，就可以获得一个动画效果。
    // this.camera.position.z += 0.9;

    // 在渲染循环中，改变相机位置，在XOZ平面上绕着y轴圆周运动
    // angle += 0.01;
    // camera.position.x = 100 * Math.cos(angle);
    // camera.position.z = 100 * Math.sin(angle);
    // camera.position.y = 100 * angle;
    //  保持相机镜头始终指向坐标原点或其它位置，实现圆周运动
    camera.lookAt(mesh.position);
    changRender()
};
// 执行渲染操作
const changRender = () => {
    renderer.render(scene, camera);
}
onMounted(() => {
    init();
    animate();
    guiRender();
})
</script>
<route>
    {
		meta: {
			layout: 'three'
		}
	}
</route>