<template>
  <view>
    <view class="header">
      <view class="rect">
        <van-search shape="round" background="" placeholder="输入考场名称" @search="searchRoadExamRoom" />
        <view style="display: flex; padding: 30rpx; justify-content: space-between">
          <input readonly disabled v-model="province.province" @click="
            () => {
              provinceShow = true;
            }
          " placeholder="省份" class="header-province" type="text" />
          <input disabled readonly @click="isShowCity()" v-model="city.city" placeholder="地市" class="header-city"
            type="text" />

          <input disabled readonly @click="isShowCounty()" v-model="county.county" placeholder="区" class="header-area"
            type="text" />
          <!-- header-area -->
        </view>
      </view>
      <van-popup round position="bottom" :show="provinceShow">
        <van-picker show-toolbar title="考场省份" :columns="examProviceList" value-key="province"
          @confirm="getExamCityAndProviceName" @cancel="
            () => {
              provinceShow = false;
            }
          " />
      </van-popup>
      <van-popup round position="bottom" :show="cityShow">
        <van-picker show-toolbar title="考场地市" :columns="examCityList" value-key="city" @confirm="getCityName" @cancel="
          () => {
            cityShow = false;
          }
        " />
      </van-popup>

      <van-popup round position="bottom" :show="countyShow">
        <van-picker show-toolbar title="考场区县" :columns="examCountyList" value-key="county" @confirm="getCountyName"
          @cancel="
            () => {
              countyShow = false;
            }
          " />
      </van-popup>
    </view>
    <view class="content">
      <view class="list">
        <van-empty v-if="examRoomList.length == 0" class="custom-image"
          image="https://img.yzcdn.cn/vant/custom-empty-image.png" description="该城市无视频" />
        <view class="list-item" v-for="(item, index) in examRoomList" @click="goCourseCatalog(item)" :key="index">
          <image mode="widthFx" :src="item.image" class="list-item-image"> </image>
          <view style="
              display: flex;
              align-items: space-between;
              flex-wrap: wrap;
              width: 355rpx;
            ">
            <view class="list-item-text1">{{ item.name }}</view>
            <view class="list-item-text2">共3节</view>
          </view>
          <view v-if="examRoomList.length == 1 && index == 0" style="border: none" class="wxad">
            <ad unit-id="adunit-f9ac1a546be5b3f0"></ad>
          </view>
          <view v-else-if="examRoomList.length == 2 && index == 1" style="border: none" class="wxad">
            <ad unit-id="adunit-f9ac1a546be5b3f0"></ad>
          </view>
          <view v-else-if="examRoomList.length >= 3 && index == 2" style="border: none" class="wxad">
            <ad unit-id="adunit-f9ac1a546be5b3f0"></ad>
          </view>
          <view v-else style="height: 30rpx; width: 100%"></view>
          <view class="list-item-border"></view>
        </view>
      </view>
      <!-- <view class="wxad">
         <ad v-if="examRoomList.length<3&&examRoomList.length>0" unit-id="adunit-f9ac1a546be5b3f0"></ad>
      </view> -->
    </view>
  </view>
</template>

<script>
import api from "@/api";

export default {
  data() {
    return {
      query: {},
      cityShow: false,
      provinceShow: false,
      countyShow: false,
      examProviceList: [],
      examCityList: [],
      examCountyList: [],
      examRoomList: [],
      province: {
        provinceId: "",
        province: "",
      },
      city: {
        cityId: "",
        city: "",
      },
      county: {
        county: "",
      },
    };
  },
  methods: {
    searchRoadExamRoom(e) {
      console.log(e.detail);
      //初始化选项
      this.province = {
        provinceId: "",
        province: "",
      };
      this.city = {
        cityId: "",
        city: "",
      };
      this.county = {
        county: "",
      };
      api.exam
        .studentExamInfoList({
          name: e.detail,
        })
        .then((res) => {
          this.examRoomList = res.rows;
        });
    },
    getCurrentCity(e) {
      console.log(e);
      // uni.choosePoi({
      //   success(res){
      //     console.log(res)
      //   }

      // })
    },
    isShowCity() {
      if (this.province.provinceId && this.province.province) {
        this.cityShow = true;
      } else {
        uni.showToast({
          title: "请先选择省份",
          icon: "none",
        });
      }
    },
    isShowCounty() {
      if (this.city.cityId && this.city.city) {
        this.countyShow = true;
      } else {
        uni.showToast({
          title: "请先选择城市",
          icon: "none",
        });
      }
    },
    goCourseCatalog(item) {
      uni.navigateTo({
        url:
          "/otherPages/courseCatalog/index?examId=" +
          item.id +
          "&price=" +
          item.price +
          "&isFree=" +
          item.isFree,
      });
    },
    getCityName(e) {
      this.city = e.detail.value;
      uni.setStorageSync("roadExamCity", e.detail.value);
      this.cityShow = false;
      //清空选项
      this.county = {
        county: "",
      };
      //获取区县
      api.exam.studentExamInfoCountyCityId(e.detail.value.cityId).then((res) => {
        this.examCountyList = res.data;
      });
      api.exam
        .studentExamInfoList({
          ...this.city,
        })
        .then((res) => {
          this.examRoomList = res.rows;
        });
    },
    getCountyName(e) {
      this.county = e.detail.value;
      uni.setStorageSync("roadExamCounty", e.detail.value);
      this.countyShow = false;

      api.exam
        .studentExamInfoList({
          ...this.county,
        })
        .then((res) => {
          this.examRoomList = res.rows;
        });
    },
    getExamCityAndProviceName(e) {
      this.provinceShow = false;
      this.province = e.detail.value;
      this.city = {
        cityId: "",
        city: "",
      };
      this.county = {
        county: "",
      };
      uni.setStorageSync("roadExamProvince", e.detail.value);
      api.exam.studentExamInfoCityProviceId(e.detail.value.provinceId).then((res) => {
        this.examCityList = res.data;
      });
      api.exam
        .studentExamInfoList({
          ...this.province,
        })
        .then((res) => {
          this.examRoomList = res.rows;
        });
    },
  },
  onLoad(query) {
    this.query = query;
    let that = this;
    //如果 预设了城市和区县
    if (this.vipPackage.cityId && this.vipPackage.provinceId) {
      this.province = {
        provinceId: this.vipPackage.provinceId,
        province: this.vipPackage.province,
      };
      this.city = {
        cityId: this.vipPackage.cityId,
        city: this.vipPackage.city,
      };
      api.exam.studentExamInfoGetProvice().then((res) => {
        that.examProviceList = res.data;
      });
      api.exam.studentExamInfoCityProviceId(that.province.provinceId).then((res) => {
        that.examCityList = res.data;
      });
      //获取区县
      api.exam.studentExamInfoCountyCityId(that.city.cityId).then((res) => {
        that.examCountyList = res.data;
      });
      api.exam
        .studentExamInfoList({
          ...that.city,
        })
        .then((res) => {
          that.examRoomList = res.rows;
        });

      return;
    }

    that.city = {
      city: "广州市",
      cityId: "4401",
    };
    that.province = {
      province: "广东省",
      provinceId: "44",
    };
    that.county = { county: "" };

    api.exam.studentExamInfoGetProvice().then((res) => {
      that.examProviceList = res.data;
      if (
        that.examProviceList.some((item) => {
          return that.province.province == item.province;
        })
      ) {
        api.exam
          .studentExamInfoCityProviceId(that.province.provinceId)
          .then((res) => {
            that.examCityList = res.data;

            api.exam
              .studentExamInfoList({
                ...that.city,
              })
              .then((res) => {
                that.examRoomList = res.rows;
              });
            api.exam.studentExamInfoCountyCityId(that.city.cityId).then((res) => {
              that.examCountyList = res.data;
            });

            api.exam
              .studentExamInfoList({
                ...that.city,
              })
              .then((res) => {
                that.examRoomList = res.rows;
              });
          })
      }
    })

    //模糊定位(目前取消)
    // uni.getFuzzyLocation({
    //   type: "gcj02",
    //   success(res) {
    //     api.amap
    //       .wxmapGetLocation({
    //         location: res.latitude + "," + res.longitude,
    //         // location: "31,121"
    //       })
    //       .then((result) => {
    //         console.log(result);
    //         //处理直辖市没有省id的问题
    //         that.province = {
    //           province: result.data.province,
    //           provinceId:
    //             result.data.provinceCode !== "0"
    //               ? result.data.provinceCode
    //               : result.data.cityCode,
    //         };
    //         that.city = {
    //           city: result.data.city,
    //           cityId: result.data.cityCode,
    //         };
    //         that.county = { county: result.data.county };

    //         api.exam.studentExamInfoGetProvice().then((res) => {
    //           that.examProviceList = res.data;
    //           if (
    //             that.examProviceList.some((item) => {
    //               return that.province.province == item.province;
    //             })
    //           ) {
    //             api.exam
    //               .studentExamInfoCityProviceId(that.province.provinceId)
    //               .then((res) => {
    //                 that.examCityList = res.data;

    //                 api.exam
    //                   .studentExamInfoList({
    //                     ...that.city,
    //                   })
    //                   .then((res) => {
    //                     that.examRoomList = res.rows;
    //                   });
    //               });
    //           } else {
    //             that.city = {
    //               city: "郑州市",
    //               cityId: "4101",
    //             };
    //             that.province = {
    //               province: "河南省",
    //               provinceId: "41",
    //             };
    //             that.county = { county: "" };
    //             api.exam
    //               .studentExamInfoList({
    //                 ...that.city,
    //               })
    //               .then((res) => {
    //                 that.examRoomList = res.rows;
    //               });
    //           }
    //         });
    //       })
    //       .catch((err) => {
    //         api.exam.studentExamInfoGetProvice().then((res) => {
    //           that.examProviceList = res.data;
    //         });
    //         api.exam
    //           .studentExamInfoList({
    //             ...that.city,
    //           })
    //           .then((res) => {
    //             that.examRoomList = res.rows;
    //           });
    //       });
    //   },
    //   fail(res) {
    //     api.exam.studentExamInfoCityProviceId(that.province.provinceId).then((res) => {
    //       that.examCityList = res.data;
    //     });
    //     api.exam
    //       .studentExamInfoList({
    //         ...that.city,
    //       })
    //       .then((res) => {
    //         that.examRoomList = res.rows;
    //       });

    //     console.log(res);
    //   },
    // });
    // api.user.studentVipExamList().then((res) => {
    //   uni.setStorageSync("examRoom", res.rows);
    // });
    // api.exam.studentExamInfoIp().then((res) => {
    //   this.city.city = res.data.cityName;
    //   this.city.cityId = Number(res.data.city);
    //   this.province.province = res.data.provinceName;
    //   this.province.provinceId = Number(res.data.province);
    //   api.exam
    //     .studentExamInfoList({
    //       ...this.city,
    //     })
    //     .then((result) => {
    //       this.examRoomList = result.rows;
    //       if (result.rows.length == 0) {
    //         this.city.city = "";
    //         this.city.cityId = "";
    //         this.province.province = "";
    //         this.province.provinceId = "";
    //       }
    //     });
    // });
  },
  computed: {
    vipPackage() {
      return this.$store.getters.vipPackage;
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: auto;

  border-radius: 0px 0px 45px 45px;

  .rect {
    width: 100%;
    height: 406rpx;
    background-image: url("https://ndata.zzxcx.net/ctjk/mp-wx/buyVideo/headerBg.png");
    background-size: 100%;
  }

  .arc {
    width: 100%;
    height: 100rpx;
  }

  .header-province {
    width: 210rpx;
    height: 60rpx;
    background: #fff;
    border-radius: 40rpx;
    font-size: 26rpx;
    padding-left: 30rpx;
    box-sizing: border-box;
  }

  .header-city {
    width: 210rpx;
    height: 60rpx;
    background: #fff;
    border-radius: 40rpx;
    font-size: 26rpx;
    padding-left: 30rpx;
    box-sizing: border-box;
  }

  .header-area {
    width: 210rpx;
    height: 60rpx;
    background: #fff;
    border-radius: 40rpx;
    font-size: 26rpx;
    padding-left: 30rpx;
    box-sizing: border-box;
  }
}

.content {
  width: 100%;
  padding: 0rpx 30rpx;
  transform: translateY(-80px);

  .list {
    width: 100%;
    background: #edf4ff;
    box-shadow: 0px 6rpx 12rpx 2rpx rgba(0, 0, 0, 0.1);

    border-radius: 20rpx 20rpx 20rpx 20rpx;

    .list-item {
      width: 100%;
      padding: 30rpx;
      padding-top: 30rpx;
      padding-bottom: 0rpx;
      display: flex;

      flex-wrap: wrap;
    }

    .list-item-image {
      width: 248rpx;
      height: 138rpx;
      margin-right: 24rpx;
    }

    .list-item-border {
      width: 100%;
      background: #e0e0e0;
      height: 2rpx;
    }

    .list-item-text1 {
      width: 305rpx;
      color: #0a1a33;
      font-size: 30rpx;
      padding-top: 10rpx;
    }

    .list-item-text2 {
      width: 305rpx;
      color: #8a9099;
      font-size: 26rpx;
    }
  }
}
</style>
