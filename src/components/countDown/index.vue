<template>
  <view>
    <view
      :style="{
        background: background,
        textAlign: textAlign,
      }"
      class="left-time"
      >{{ formatterTime(privateTime, "mm:ss") }}</view
    >
  </view>
</template>

<script>
let t;
export default {
  data() {
    return {
      privateTime: this.time,
    };
  },
  methods: {
    formatterTime(time, format) {
      function formatterTimer(timer, format) {
        let formatArr = format.split(":");
        return formatArr
          .map((element) => {
            switch (element) {
              case "hh":
                return timer.getHours();
                break;
              case "mm":
                return timer.getMinutes();
                break;
              case "ss":
                return timer.getSeconds();
                break;
            }
          })
          .join(":");
      }
      return formatterTimer(new Date(time), format);
    },
  },
  props: {
    time: {
      type: Number,
      default: 0,
    },
    textAlign: {
      type: String,
      default: "center",
    },
    background: {
      type: String,
      default: "#fff",
    },
  },
  watch: {
    time(newVal, oldVal) {
      this.privateTime = Number(newVal);
    },
  },
  destroyed() {
    clearInterval(t);
  },
  mounted() {
    t = setInterval(() => {
      this.privateTime = this.privateTime - 1000;
      //第一参数是剩余时间,第二个是过去的时间
      this.$emit(
        "change",
        this.formatterTime(this.privateTime, "mm:ss"),
        this.formatterTime(this.time - this.privateTime, "mm:ss")
      );
      if (this.privateTime == 0) {
        clearInterval(t);
        //第一参数是剩余时间,第二个是过去的时间

        this.$emit(
          "end",
          this.formatterTime(this.privateTime, "mm:ss"),
          this.formatterTime(this.time - this.privateTime, "mm:ss")
        );
      }
    }, 1000);
  },
};
</script>

<style lang="less" scoped>
.left-time {
  width: 100%;
  font-size: 28rpx;
  text-align: center;
}
</style>