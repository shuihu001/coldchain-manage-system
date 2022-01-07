<template>
  <div>
    <div class="car">
        <div class="carriage">
          <div class="triangle-left"></div>
          <div class="triangle-right"></div>
          <div class="left">
            <img :src="image1"  alt="">
          </div>
          <div class="bottom">
            <img :src="image2"  alt="">
          </div>
          <div class="right">
            <img :src="image1"  alt="">
          </div>
          <div class="top">
            <img :src="image2"  alt="">
          </div>
          <div class="front">
            <img :src="image2"  alt="">
          </div>
<!--          <div class="back">后</div>-->
          <div class="head-top"></div>
<!--          <div class="cantboard">-->
<!--            <img :src="image2"  alt="">-->
<!--          </div>-->
          <div class="sensor1-front"></div>
          <div class="sensor1-back"></div>
          <div class="sensor1-top"></div>
          <div class="sensor1-bottom"></div>
          <div class="sensor1-left"></div>
          <div class="sensor1-right"></div>

          <div class="sensor2-front"></div>
          <div class="sensor2-back"></div>
          <div class="sensor2-top"></div>
          <div class="sensor2-bottom"></div>
          <div class="sensor2-left"></div>
          <div class="sensor2-right"></div>

          <div class="sensor3-front"></div>
          <div class="sensor3-back"></div>
          <div class="sensor3-top"></div>
          <div class="sensor3-bottom"></div>
          <div class="sensor3-left"></div>
          <div class="sensor3-right"></div>

          <div class="sensor4-front"></div>
          <div class="sensor4-back"></div>
          <div class="sensor4-top"></div>
          <div class="sensor4-bottom"></div>
          <div class="sensor4-left"></div>
          <div class="sensor4-right"></div>

          <div class="sensor5-front"></div>
          <div class="sensor5-back"></div>
          <div class="sensor5-top"></div>
          <div class="sensor5-bottom"></div>
          <div class="sensor5-left"></div>
          <div class="sensor5-right"></div>

          <div class="sensor6-front"></div>
          <div class="sensor6-back"></div>
          <div class="sensor6-top"></div>
          <div class="sensor6-bottom"></div>
          <div class="sensor6-left"></div>
          <div class="sensor6-right"></div>
        </div>
      </div>
  </div>
</template>

<script>
  export default {
    name: "cubicCar",
    data() {
      return {
        image1:require('../../../assets/img/coldCar.jpg'),
        image2:require('../../../assets/img/car.jpg'),
      }
    }
  }
</script>

<style scoped>
.car{
    height: 400px;
    width: 100%;
  }
  .carriage{
    height: 200px;
    width: 100%;
    margin: 0 auto;
    /*background-color: #a4ba24;*/
    position: absolute;
    transform: translateX(-800px) translateY(-800px) translateZ(-800px);
    transform-style: preserve-3d;
    animation: rotateanimation 5s ease;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
  .car>div{
    position: absolute;
    opacity: 1;
    /*border: black 2px solid;*/
  }
  .head-top{
    width: 100px;
    height: 200px;
    position: absolute;
    /*transform: rotateX(270deg) translateZ(-100px) translateY(0px) translateX(60px);*/
    transform: rotateX(90deg) translateZ(1000px) translateX(100px) translateY(0px);
    background: darkgray;
  }
  /*.cantboard{*/
  /*  width: 100px;*/
  /*  height: 200px;*/
  /*  position: absolute;*/
  /*  transform: rotateX(90deg)  rotateY(-60deg) translateZ(480px) translateX(800px) translateY(00px);*/
  /*  background: blue;*/
  /*}*/
  /*.cantboard>img{*/
  /*  width: 100px;*/
  /*  height: 300px;*/
  /*  opacity: 1;*/
  /*  transform: translateZ(400px) translateX(150px) translateY(00px);*/
  /*}*/
  .triangle-left{
    width: 100px;
    height: 0;
    border-color: transparent transparent darkgray;
    transform: translateZ(100px) translateX(65px) translateY(300px);
    border-width: 0px 0px 100px 37px;
    border-style: solid;
  }
  .triangle-right{
    width: 100px;
    height: 0;
    border-color: transparent transparent darkgray ;
    transform: translateZ(-100px) translateY(200px) translateX(65px);
    border-width: 0px 0px 100px 37px;
    border-style: solid;
  }
  .left{
    width: 400px;
    height: 200px;
    transform: translateZ(100px) translateX(200px);
    /*background:red;*/
  }
  .left>img{
    width: 400px;
    height: 200px;
    opacity: 0.5;
  }
  .right{
    width: 400px;
    height: 200px;
    transform: rotateY(180deg) translateZ(100px) translateY(-400px) translateX(-200px);
    /*background:green;*/
  }
  .right>img{
    width: 400px;
    height: 200px;
    opacity: 0.8;
    /*position: absolute;*/
    position: fixed;
    /*float: left;*/
  }
  .bottom{
    width: 500px;
    height: 200px;
    transform: rotateX(270deg) translateZ(-100px) translateY(0px) translateX(-90px);
    /*background:deeppink;*/
  }
  .bottom>img{
    width: 540px;
    height: 200px;
    opacity: 1;
    transform:  translateX(150px);
  }
  .top{
    width: 400px;
    height: 200px;
    transform: rotateX(90deg) translateZ(700px) translateY(0px) translateX(200px);
    background: yellow;
  }
  .top>img{
    width: 400px;
    height: 200px;
    opacity: 1;
  }
  .front{
    width: 200px;
    height: 200px;
    transform: rotateY(270deg) translateZ(-100px) translateY(-800px) ;
    background: black;
  }
  .front>img{
    width: 200px;
    height: 200px;
    opacity: 1;
  }
  .back{
    width: 200px;
    height: 200px;
    transform: rotateY(90deg) translateZ(500px);
    /*background: #a7cbf0;*/
  }
  .sensor{
    height: 50px;
    width: 50px;
    transform: translateX(400px) translateZ(800px) translateY(-500px);
    transform-style: preserve-3d;
  }
  .sensor1-front{
    height: 40px;
    width: 40px;
    transform: rotateY(270deg) translateZ(-180px) translateY(-1000px) translateX(-80px) ;
    background: #a8a3a5;
    opacity: 0.2;
  }
  .sensor1-back{
    height: 40px;
    width: 40px;
    transform: rotateY(270deg) translateZ(-220px) translateY(-1040px) translateX(-80px);
    background: #a8a3a5;
  }
  .sensor1-top{
    height: 40px;
    width: 40px;
    transform: rotateX(90deg) translateZ(1100px) translateY(-80px) translateX(200px);
    background: #a8a3a5;
  }
  .sensor1-bottom{
    height: 40px;
    width: 40px;
    transform: rotateX(90deg) translateZ(1100px) translateY(-80px) translateX(200px);
    background: #a8a3a5;
  }
  .sensor1-left{
    height: 40px;
    width: 40px;
    transform: rotateY(180deg) translateZ(60px) translateY(-1160px) translateX(-200px);
    background: #a8a3a5;
  }
  .sensor1-right{
    height: 40px;
    width: 40px;
    transform: rotateY(180deg) translateZ(100px) translateY(-1200px) translateX(-200px);
    background: #a8a3a5;
    opacity: 0.5;
  }
  .sensor2-front{
    height: 40px;
    width: 40px;
    transform: rotateY(270deg) translateZ(-180px) translateY(-1240px) translateX(80px) ;
    background: #a8a3a5;
    opacity: 0.2;
  }
  .sensor2-back{
    height: 40px;
    width: 40px;
    transform: rotateY(270deg) translateZ(-220px) translateY(-1280px) translateX(80px) ;
    background:#a8a3a5;
    opacity: 1;
  }
  .sensor2-top{
    height: 40px;
    width: 40px;
    transform: rotateX(90deg) translateZ(1340px) translateY(80px) translateX(200px);
    background: #a8a3a5;
  }
  .sensor2-bottom{
    height: 40px;
    width: 40px;
    transform: rotateX(90deg) translateZ(1340px) translateY(80px) translateX(200px);
    background: #a8a3a5;
  }
  .sensor2-left{
    height: 40px;
    width: 40px;
    transform: rotateY(180deg) translateZ(-100px) translateY(-1400px) translateX(-200px);
    background: #a8a3a5;
    opacity: 0.5;
  }
  .sensor2-right{
    height: 40px;
    width: 40px;
    transform: rotateY(180deg) translateZ(-60px) translateY(-1440px) translateX(-200px);
    background: #a8a3a5;
    opacity: 1;
  }
  .sensor3-front{
    height: 40px;
    width: 40px;
    position: absolute;
    transform: rotateY(270deg) translateZ(-360px) translateY(-1480px) translateX(-80px) ;
    background: #a8a3a5;
    opacity: 1;
  }
  .sensor3-back{
    height: 40px;
    width: 40px;
    position: absolute;
    transform: rotateY(270deg) translateZ(-400px) translateY(-1480px) translateX(-80px);
    background: #a8a3a5;
  }
  .sensor3-top{
    height: 40px;
    width: 40px;
    position: absolute;
    transform: rotateX(90deg) translateZ(1500px) translateY(-80px) translateX(380px);
    background: #a8a3a5;
  }
  .sensor3-bottom{
    height: 40px;
    width: 40px;
    position: absolute;
    transform: rotateX(90deg) translateZ(1460px) translateY(-80px) translateX(380px);
    background: #a8a3a5;
  }
  .sensor3-left{
    height: 40px;
    width: 40px;
    position: absolute;
    transform: rotateY(180deg) translateZ(60px) translateY(-1480px) translateX(-380px);
    background: #a8a3a5;
  }
  .sensor3-right{
    height: 40px;
    width: 40px;
    position: absolute;
    transform: rotateY(180deg) translateZ(100px) translateY(-1480px) translateX(-380px);
    background: #a8a3a5;
    opacity: 0.5;
  }
  .sensor4-front{
    height: 40px;
    width: 40px;
    transform: rotateY(270deg) translateZ(-360px) translateY(-1480px) translateX(80px) ;
    background: #a8a3a5;
    opacity: 1;
  }
  .sensor4-back{
    height: 40px;
    width: 40px;
    transform: rotateY(270deg) translateZ(-400px) translateY(-1520px) translateX(80px) ;
    background:#a8a3a5;
    opacity: 1;
  }
  .sensor4-top{
    height: 40px;
    width: 40px;
    transform: rotateX(90deg) translateZ(1580px) translateY(80px) translateX(380px);
    background: #a8a3a5;
  }
  .sensor4-bottom{
    height: 40px;
    width: 40px;
    transform: rotateX(90deg) translateZ(1580px) translateY(80px) translateX(380px);
    background: #a8a3a5;
  }
  .sensor4-left{
    height: 40px;
    width: 40px;
    transform: rotateY(180deg) translateZ(-100px) translateY(-1640px) translateX(-380px);
    background: #a8a3a5;
    opacity: 1;
  }
  .sensor4-right{
    height: 40px;
    width: 40px;
    transform: rotateY(180deg) translateZ(-60px) translateY(-1680px) translateX(-380px);
    background: #a8a3a5;
    opacity: 1;
  }
  .sensor5-front{
    height: 40px;
    width: 40px;
    position: absolute;
    transform: rotateY(270deg) translateZ(-540px) translateY(-1720px) translateX(-80px) ;
    background: #a8a3a5;
    opacity: 1;
  }
  .sensor5-back{
    height: 40px;
    width: 40px;
    position: absolute;
    transform: rotateY(270deg) translateZ(-580px) translateY(-1720px) translateX(-80px);
    background: #a8a3a5;
  }
  .sensor5-top{
    height: 40px;
    width: 40px;
    position: absolute;
    transform: rotateX(90deg) translateZ(1740px) translateY(-80px) translateX(560px);
    background: #a8a3a5;
  }
  .sensor5-bottom{
    height: 40px;
    width: 40px;
    position: absolute;
    transform: rotateX(90deg) translateZ(1700px) translateY(-80px) translateX(560px);
    background: #a8a3a5;
  }
  .sensor5-left{
    height: 40px;
    width: 40px;
    position: absolute;
    transform: rotateY(180deg) translateZ(60px) translateY(-1720px) translateX(-560px);
    background: #a8a3a5;
  }
  .sensor5-right{
    height: 40px;
    width: 40px;
    position: absolute;
    transform: rotateY(180deg) translateZ(100px) translateY(-1720px) translateX(-560px);
    background: #a8a3a5;
    opacity: 1;
  }
  .sensor6-front{
    height: 40px;
    width: 40px;
    transform: rotateY(270deg) translateZ(-540px) translateY(-1720px) translateX(80px) ;
    background: #a8a3a5;
    opacity: 1;
  }
  .sensor6-back{
    height: 40px;
    width: 40px;
    transform: rotateY(270deg) translateZ(-580px) translateY(-1760px) translateX(80px);
    background: #a8a3a5;
  }
  .sensor6-top{
    height: 40px;
    width: 40px;
    transform: rotateX(90deg) translateZ(1820px) translateY(80px) translateX(560px);
    background: #a8a3a5;
  }
  .sensor6-bottom{
    height: 40px;
    width: 40px;
    transform: rotateX(90deg) translateZ(1820px) translateY(80px) translateX(560px);
    background: #a8a3a5;
  }
  .sensor6-left{
    height: 40px;
    width: 40px;
    transform: rotateY(180deg) translateZ(-100px) translateY(-1880px) translateX(-560px);
    background: #a8a3a5;
  }
  .sensor6-right{
    height: 40px;
    width: 40px;
    transform: rotateY(180deg) translateZ(-60px) translateY(-1920px) translateX(-560px);
    background: #a8a3a5;
    opacity: 1;
  }
  @keyframes rotateanimation{
    0%{
      transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
    }
    100%{
      transform: rotateX(30deg) rotateY(-180deg) rotateZ(0deg);
    }
  }
</style>