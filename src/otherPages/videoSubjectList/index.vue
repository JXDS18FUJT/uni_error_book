<template>
  <view class="videoList">
    <view class="list">
      <view class="list-title">书籍视频解说</view>
      <view
        v-for="(item, index) in list"
        :key="index"
        @click="addinsertAd(item)"
      >
        <view class="list-item">
          <view style="position: relative">
            <image
              class="list-item-play"
              alt=""
              src="https://ndata.zzxcx.net/ctjk/h5/videoList/play.png"
            />
            <image
              mode="widthFix"
              style="width: 44.5vw"
              alt=""
              :src="item.videoCover"
            />
          </view>

          <view class="list-item-name">{{ item.videoName }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import api from "@/api";
import utils from "@/utils";
export default {
  data() {
    return {
      query: {},
      list: [
        {
          createTime: "2023-02-20 14:46:40",
          id: 1,
          state: 1,
          updateTime: "2023-02-20 15:13:57",
          videoCover: "https://ndata.zzxcx.net/ctjk/h5/videoList/km1.png",
          videoName: "01小车科目一ABS题",
          videoSubject: 1,
          videoUrl:
            "https://mp.weixin.qq.com/s?__biz=Mzg2OTkwMDU0OA==&mid=2247483656&idx=1&sn=61381ded69ebe20d8c0fedc7e77ee0ce&chksm=ce974963f9e0c075bb209fde63d128a97936eb65694d373853c6352584acc645085f42f7b9d5#rd",
        },
      ],
    };
  },
  methods: {
    goPlayVideo(item) {
      let query = Object.assign({}, this.query);
      query.paramsMode = 2;
      query.shopId = '2'
      uni.setStorageSync("storageWebSrc", item.videoUrl);
      uni.navigateTo({
        url: "/pages/extraWeb/index?" + utils.mapToUrlQuery(query),
      });
    },
    addinsertAd(item) {
      let query = Object.assign({}, this.query);
      query.paramsMode = 2;
      query.shopId = '2'
      uni.setStorageSync("storageWebSrc", item.videoUrl);
      // 在页面中定义插屏广告
      let interstitialAd = null;
      // 在页面onLoad回调事件中创建插屏广告实例
      if (uni.createInterstitialAd) {
        interstitialAd = uni.createInterstitialAd({
          adUnitId: "adunit-7f8366efc6a07d93",
        });
        interstitialAd.onLoad(() => {});
        interstitialAd.onError((err) => {
          console.error(err);
          uni.navigateTo({
            url: "/pages/extraWeb/index?" + utils.mapToUrlQuery(query),
          });
        });
        interstitialAd.onClose(() => {
          uni.navigateTo({
            url: "/pages/extraWeb/index?" + utils.mapToUrlQuery(query),
          });
        });
      }

      // 在适合的场景显示插屏广告
      if (interstitialAd) {
        interstitialAd.show().catch((err) => {
          console.error(err);
          uni.navigateTo({
            url: "/pages/extraWeb/index?" + utils.mapToUrlQuery(query),
          });
        });
      }
    },
  },
  onLoad(query) {
    this.query = query;

    api.carVideo
      .studentVideoTeachingList({
        videoSubject: query.subject,
        shopId:2
      })
      .then((res) => {
        this.list = res.rows;
      });
  },
};
</script>

<style lang="scss" scoped>
.videoList {
  width: 750rpx;
  height: 100vh;
  overflow-y: scroll;
  .list {
    width: 690rpx;
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    position: relative;
    padding-top: 0px;
    justify-content: space-between;
    .list-title {
      width: 100%;
      color: #0a1a33;
      font-size: 34rpx;
      font-weight: bold;
      padding: 30rpx;
      padding-left: 0rpx;
    }
    .list-item {
      width: 334rpx;
      height: auto;
      margin-bottom: 30rpx;
      position: relative;
      overflow-x: hidden;
    }
    .list-item-name {
      font-size: 34rpx;
      text-align: center;
      width: 100%;
      overflow-x: hidden;
      padding: 10rpx 0px;
      color: black;
      text-align: left;
    }
    .list-item-play {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 60rpx;
      height: 60rpx;
    }
    .list-item-title {
      color: #fff;
    }
    .list-item-jiao {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}

.left40 {
  left: 40rpx;
}
.top128 {
  top: 128rpx;
}
.top54 {
  top: 54rpx;
}
</style>