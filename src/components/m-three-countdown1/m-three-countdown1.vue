<template>
  <view
    class="count"
  >
      <view v-if="delaySeconds>0" class="">

      </view>
      <van-circle
      v-else-if="countDownSeconds > 0&&delaySeconds==0"
      :value="countDownPercent"
     
    >
    <view style="font-size: 75rpx;">{{ countDownSeconds + 's' }}</view>
  </van-circle>
    <slot v-else-if="!forceHidden&&countDownSeconds==0&&delaySeconds==0"></slot>


  </view>
</template>

<script>
export default {
  data() {
    return {
      countDownSeconds: 0,
      countDownPercent: 0,
      addPercent: 0,
      delaySeconds:0,
      forceHidden: false,
      timer1:0,
      timer2:0
    };
  },
  watch: {
    problemListIndex: {
      handler(newValue, oldValue) {
        console.log(newValue, oldValue);
        // this.isReset = true;
        // this.isReset = false;
        clearInterval(this.timer1);
        clearTimeout(this.timer2)
        this.forceHidden =false
        this.countDownSeconds = Number(this.seconds);
        this.delaySeconds = Number(this.delay)
        console.log("this.seconds", this.seconds);
        if (this.seconds == 0) {
          //   clearInterval(timer);
          this.$emit("countDownEnd");
          return;
        }
        this.$emit("countDownStart");

        this.addPercent = Math.floor(100 / this.seconds);
        this.countDownPercent = 0;

        this.timer1 = setInterval(() => {
          if(this.delaySeconds){
            this.delaySeconds = this.delaySeconds-1
          }
          else{
            this.countDownSeconds = this.countDownSeconds - 1;
            this.countDownPercent = this.countDownPercent + this.addPercent;
          }
     
          if (this.countDownSeconds == 0) {
            clearInterval(this.timer1);
            this.$emit("countDownEnd");
            if(this.autoHidden){
              this.timer2 =setTimeout(()=>{
                this.forceHidden =true

              },this.seconds*1050)
              
            }
          }
        }, 1050);
        //为了补偿渲染消耗的时间,特意减慢一丢丢
      },
      immediate: true,
    },
  },
  props: {
    delay:{
      type: Number,
      default: 0,
    },
    autoHidden:{
      type: Boolean,
      default: false,
    },
    seconds: {
      type: Number,
      default: 0,
    },
    problemListIndex: {
      type: Number,
      default: -1,
    },
  },
  mounted() {
    this.countDownSeconds = this.seconds;
    this.addPercent = Math.floor(100 / this.seconds);
    
    // setTimeout(() => {
    //   this.countDownSeconds = this.countDownSeconds - 1;
    //   this.countDownPercent = this.countDownPercent + this.addPercent;
    //   //addPercent 有时候为33
    //   if (this.countDownPercent < 99) {
    //     setTimeout(() => {
    //       this.countDownSeconds = this.countDownSeconds - 1;
    //       this.countDownPercent = this.countDownPercent + this.addPercent;
    //     }, 1000);
    //   }
    // }, 1000);
  },
};
</script>

<style lang="less" scoped>
.count {
 
  text-align: left;
  overflow: hidden;
  background-color: #fff;

}
.h0 {
  height: 0px !important;
}
.h100{
  height: 100rpx;
}
.h200{
  height: 200rpx;
}
.h300{
  height: 300rpx;
}
.h400{
  height: 400rpx;
}
</style>
