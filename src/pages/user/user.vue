<template>
  <view class="iPhoneX bg">
 <!--   <topbar>
      <view class="nav">
      
        <text class="title">用户中心</text>
      </view>
    </topbar> -->
    <van-dialog confirm-button-text="关闭" use-slot :show="activeCodeVisible" @close="() => {
      activeCodeVisible = false
    }">

      <div style="padding: 0 30rpx;line-height: 1;">
        <div style="text-align: center;font-size: 40rpx;padding: 30rpx 0rpx;">提示</div>
        <view style="padding: 0 30rpx;font-size: 24rpx;">
          请输入抖音订单号或者激活码续费，
          也可以直接线上购买

        </view>
        <van-field type="text" :value="orderId" placeholder="请输入抖音订单号、激活码" @change="changeOrderId" />
        <div style="width: 100%;display: flex;justify-content: space-between;padding: 15rpx 60rpx;">

          <van-button @click="() => { goBuyVip(); activeCodeVisible = false }" size="small" type="info">
            在线开通
          </van-button>


          <van-button @click="bindOrderId" size="small" type="primary">
            立即开通
          </van-button>
        </div>
      </div>

    </van-dialog>
    <scroll-view scroll-y>
      <div class="user">
        <van-cell custom-class="head-cell" is-link label-class="" center>
          <view @click="
            () => {
              userFormShow = true;
              nickName = userInfo.nickName || '新用户';
            }
          " class="userButton" slot="title">
            <image class="user-headImg" v-if="userInfo.headImage" :src="userInfo.headImage"></image>
            <image class="user-headImg" v-else :src="unLoginHead"></image>
            <view class="flex" style="width: 60%; padding-left: 24rpx; text-align: left">
              <view style="font-size: 38rpx; color: #0a1a33; width: 100%">{{
                userInfo.nickName || "新用户"
              }}{{ '（ID:' + userInfo.id + '）' }}</view>
              <view style="font-size: 26rpx; color: #8a9099; width: 100%">
                {{ userInfo.phone || "点击绑定手机号" }}</view>
            </view>
          </view>
        </van-cell>
        <view style="
            border-radius: 20rpx 20rpx 20rpx 20rpx;
            overflow: hidden;
            box-shadow: 0rpx 0rpx 12rpx 2rpx rgba(0, 0, 0, 0.1);
          ">
          <van-cell-group>
            <van-cell value-class="text-right" title-class="user-fontsize-cell" title="到期时间" is-link>
              <view style="display: flex; justify-content: flex-end">
                <view v-if="isVip == 0">
                  <view @click="goBuyVip()" style="
                      color: #fff;
                      background: #498ef5;
                      width: 136rpx;
                      line-height: 52rpx;
                      text-align: center;
                      border-radius: 26px 26px 26px 26px;
                    ">立即开通</view>
                </view>
                <view v-else-if="isVip == 1"><text style="padding-right: 8rpx;">{{ expTime ? formatterExpTime(expTime) :
                  '永久VIP会员'
                    }}</text>
                  <van-button @click="() => {
                    activeCodeVisible = true
                  }" v-if="expTime" custom-style="width: 48rpx;" round size="small" type="primary">
                    续费
                  </van-button>
                </view>
                <view v-else-if="isVip == 2"> <text style="padding-right: 8rpx;">{{ expTime ? formatterExpTime(expTime)
                  : '永久VIP会员'
                    }}</text>
                  <van-button @click="() => {
                    activeCodeVisible = true
                  }" v-if="expTime" custom-style="width: 48rpx;" round size="small" type="primary">
                    续费
                  </van-button>
                </view>
              </view>
            </van-cell>

            <van-cell title-class="user-fontsize-cell" title="邀请好友" is-link center>
              <view style="display: flex; justify-content: flex-end">
                <van-button open-type="share" custom-style="width: 134rpx;" round size="small" type="primary">
                  邀请
                </van-button>
              </view>
            </van-cell>

            <van-cell v-if="vipPackage.childVisible == 1" title-class="user-fontsize-cell" title="分销中心" is-link center
              url="/otherPages/sellerCenter/index">
            </van-cell>
          </van-cell-group>
        </view>
        <view style="width: 100%; height: 30rpx"></view>
        <view style="
            border-radius: 20rpx 20rpx 20rpx 20rpx;
            overflow: hidden;
            box-shadow: 0rpx 0rpx 12rpx 2rpx rgba(0, 0, 0, 0.1);
          ">
          <van-cell title-class="user-fontsize-cell" title="激活码入口" is-link center url="/otherPages/buyVip/index">
          </van-cell>
          <van-cell title-class="user-fontsize-cell" title="学车必看" is-link center
            url="/otherPages/marked/index?markdown=学车必看">
          </van-cell>
          <van-cell-group>
            <van-cell title-class="user-fontsize-cell" title="考前须知" is-link center
              url="/otherPages/marked/index?markdown=考前须知">
            </van-cell>
            <!-- <van-cell
          @click="goCareGzh"
          title-class="user-fontsize-cell"
          title="关注公众号"
          is-link
          center
        >
        </van-cell> -->
            <!-- <van-cell
          url="/otherPages/careSph/index"
          title-class="user-fontsize-cell"
          title="关注视频号"
          is-link
          center
        >
        </van-cell> -->
            <!-- <van-cell
            title-class="user-fontsize-cell"
            title="电子资料"
            is-link
            @click="
              goPath('/pages/extraWeb/index?src=https://nbjk-h5.zzxcx.net/pdfImages')
            "
            center
          >
          </van-cell> -->
            <van-cell title-class="user-fontsize-cell" title="每日驾考资讯" is-link center
              url="/otherPages/careEveryDay/index">
            </van-cell>

            <van-cell title-class="user-fontsize-cell" title="生成分享二维码" is-link center
              url="/otherPages/createReferCode/index">
            </van-cell>
            <van-cell title-class="user-fontsize-cell" title="用户反馈" is-link center url="/otherPages/userAdvise/index">
            </van-cell>
          </van-cell-group>
        </view>

        <!-- <van-cell
          title-class="user-fontsize-cell"
          title="捐赠"
          is-link
          center
          url="/otherPages/donation/index"
        >
        </van-cell> -->
        <!-- <van-cell
          title-class="user-fontsize-cell"
          title="分销中心"
          is-link
          center
          url="/otherPages/sellerCenter/index"
        >
        </van-cell>
        <van-cell
          title-class="user-fontsize-cell"
          title="分销推广"
          is-link
          center
          url="/otherPages/sellerRefer/index"
        >
        </van-cell>
        <van-cell
          title-class="user-fontsize-cell"
          title="分销收益"
          is-link
          center
          url="/otherPages/sellerIncome/index"
        >
        </van-cell>
        <van-cell
          title-class="user-fontsize-cell"
          title="分销失败原因"
          is-link
          center
          url="/otherPages/sellerFailReason/index"
        >
        </van-cell>
        <van-cell
          title-class="user-fontsize-cell"
          title="分销提现"
          is-link
          center
          url="/otherPages/sellerDraw/index"
        >
        </van-cell>

        <van-cell
          title-class="user-fontsize-cell"
          is-link
          title="购买vip"
          url="/otherPages/buyVip/index"
        >
        </van-cell> -->
        <!-- <van-cell title="我的下级" value="" is-link center @click="goMyBranch">
				<template #icon>
					<m-icon type="hyyxq" class="cell-icon" />
				</template>
</van-cell> -->
        <!-- <van-cell
          title="我的推广积分"
          value=""
          is-link
          center
          @click="goMyIntegral"
        >
        </van-cell> -->
        <!-- #ifdef MP-WEIXIN -->
        <!-- <van-cell
        title="会员有效期"
        :value="expireTime ? expireTime : '开通会员'"
        is-link
        center
        url="/otherPages/buyVip/index"
      >
      </van-cell> -->

        <!-- #endif -->
        <!-- #ifdef MP-TOUTIAO -->
        <van-cell v-if="!isVip" title="会员有效期" :value="'开通会员'" is-link center url="/otherPages/buyVip/index">
        </van-cell>
        <van-cell v-if="isVip" title="会员有效期" :value="'已开通'" is-link center>
        </van-cell>
        <van-cell title="资料下载" is-link @click="goVipPath('/otherPages/pdfList/index')" left>
          <template #icon>
            <m-icon type="fkbz" class="cell-icon" />
          </template>
        </van-cell>

        <!-- #endif -->
        <!-- #ifdef MP-WEIXIN -->
        <!-- 
      <van-cell title-class="user-fontsize-cell" title="反馈帮助" is-link center url="/pages/extraWeb/index?src=https://support.qq.com/product/359609">
        <template #icon>
          <m-icon type="fkbz" class="cell-icon" />
        </template>
      </van-cell> -->

        <!-- #endif -->
      </div>
      <view class="list"> </view>
      <van-popup :z-index="9999" :close-on-click-overlay="true" position="bottom" :show="userFormShow">
        <view class="userform">
          <view class="userform-close">
            <van-icon @click="
              () => {
                userFormShow = false;
              }
            " color="#a8a8a8" size="18" name="cross" />
          </view>
          <view>
            <!-- <button  class="" @chooseAvatar="" open-type="chooseAvatar">
              <image mode="widthFix" style="width: 100rpx;" :src="userInfo.headImage||'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'"></image>
            </button> -->
            <van-field value-class="userform-visible" :value="userInfo.nickName" required clearable label="用户头像"
              use-button-slot placeholder="请输入用户名">
              <image slot="input" class="userform-head" :src="userInfo.headImage"></image>
              <view style="height: 100rpx" slot="button">
                <button size="mini" open-type="chooseAvatar" @chooseavatar="getUserHeadImage" type="primary">
                  上传头像
                </button>
              </view>
            </van-field>
            <van-field :value="userInfo.nickName" required clearable label="用户名" @change="changeUserName"
              placeholder="请输入用户名" type="nickname">
              <view style="height: 100rpx" slot="button">
                <button size="mini" @click="goGzhPage()" type="primary">获取昵称</button>
              </view>
            </van-field>

            <van-field :value="userInfo.phone" clearable label="手机号" placeholder="请绑定手机号" @change="changeUserPhone">
            </van-field>
            <van-field :value="userInfo.realName" clearable label="真实姓名" placeholder="请输入真实姓名"
              @change="changeUserRealName">
            </van-field>
          </view>
          <view class="userform-bind">
            <van-button @click="sendUserInfo" custom-style="width:690rpx;" round type="primary">修改用户信息</van-button>
          </view>
          <view style="height: 48px; width: 100%"></view>
        </view>
      </van-popup>

      <!-- <view class="ad-box serviceBox">
			<ad unit-id="adunit-d8c1548cc9663765"></ad>
		</view> -->
    </scroll-view>
    <view class="care" :style="careVisible ? '' : 'display:none'">
      <view class="dialog">
        <view class="title">请先关注公众号</view>
        <official-account></official-account>
        <view @click="
          () => {
            careVisible = false;
          }
        " class="confirm">
          关闭</view>
      </view>
    </view>
    <view class="adContainer">
     <!-- <ad-custom unit-id="adunit-422e5f4aa411340c"></ad-custom> -->
    </view>
    <view style="height: 48px; width: 100%"></view>
  </view>
</template>

<script>
import api from "@/api/index";
import unLoginHead from "@/assets/img/unLoginHead.png";
export default {
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo
    },
    vipPackage() {
      return this.$store.state.user.vipPackage;
    },
    iosVipOpen() {
      return this.$store.getters.iosVipOpen;
    },
    unLoginHead() {
      return unLoginHead;
    },
    expireTime() {
      return this.$store.state.user.userInfo.expireTime && this.$store.getters.isVip
        ? this.$store.state.user.userInfo.expireTime.split(" ")[0]
        : null;
    },
    expTime() {
      return this.$store.getters.expTime;
    },
    isVip() {
      return this.$store.getters.isVip;
    },
    token() {
      return this.$store.getters.token;
    },
  },
  data() {
    return {
      orderId: '',
      gzhWebPath:
        process.env.NODE_ENV === "development"
          ? "https://nbjk1-h5.zzxcx.net/wxUserInfo"
          : "https://nbjk-h5.zzxcx.net/wxUserInfo",
      phoneType: uni.getStorageSync("phoneType"),
      userFormShow: false,
      careVisible: false,
      activeCodeVisible: false,
      // userInfo: uni.getStorageSync("userInfo"),
      uploadUrl:
        //测试期间都是nbjk1.zzxcx.net
        process.env.NODE_ENV === "development"
          ? "https://nbjk1.zzxcx.net/nbjk-admin/"
          : "https://nbjk1.zzxcx.net/nbjk-admin/",
    };
  },
  mounted() {
    // this.$store.dispatch("GetInfo");
  },
  methods: {
    formatterExpTime(s) {

      if (s) {
        return s.split(' ')[0]
      }
      return s

    },
    bindOrderId(e) {
      let that = this
      api.buy.studentJyPurchasesBindUserByTidOnVipCode({
        tid: this.orderId
      }).then(res => {
        if (res.code == 200) {
          uni.showToast({
            title: '激活成功',
            icon: 'none'
          })
          that.$store.dispatch("GetInfo")
          this.activeCodeVisible = false
        } else if (res.code == 50003) {
          uni.showToast({
            title: '已经是vip无需激活',
            icon: 'none'
          })
          that.$store.dispatch("GetInfo")
        }
        else {
          uni.showToast({
            title: res.msg,
            icon: 'none'
          })
          that.$store.dispatch("GetInfo")
        }

        // console.log(res)
        // api.carVideo.studentJyCoursePurchasedCoursesList({
        //   v: +new Date()
        // }).then(res => {
        //   that.list = res.rows
        // })

      })

    },
    changeOrderId(e) {
      this.orderId = e.detail

    },
    goGzhPage() {
      let storageWebSrc = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2e7a22bed898f795&redirect_uri=https://nbjk-h5.zzxcx.net/qcxjWxUserInfo&response_type=code&scope=snsapi_userinfo&state=LOGIN#wechat_redirect";
      uni.setStorageSync("storageWebSrc", storageWebSrc);
      wx.navigateTo({
        url: "/pages/extraWeb/index?paramsMode=2",
      });
    },


    goBuyVip() {
      let that = this;
      if (that.phoneType == 1 && that.iosVipOpen == 0) {
        wx.navigateTo({
          url: "/otherPages/buyVip/index",
        });
        //青葱无权限web授权的权限
        // let storageWebSrc =
        //   process.env.NODE_ENV === "development"
        //     ? "https://nbjk1-h5.zzxcx.net/buyQcjkVip?v="
        //     : "https://nbjk-h5.zzxcx.net/buyQcjkVip?v=";
        // storageWebSrc = storageWebSrc + Date.now();
        // uni.setStorageSync("storageWebSrc", storageWebSrc);
        // wx.navigateTo({
        //   url: "/pages/extraWeb/index?paramsMode=2",
        // });
      } else if (that.phoneType == 2) {
        wx.navigateTo({
          url: "/otherPages/buyVip/index",
        });
      } else {
        wx.navigateTo({
          url: "/otherPages/buyVip/index",
        });
      }
    },
    back() {
      uni.navigateBack();
    },
    changeUserRealName(e) {
      this.userInfo.realName = e.detail;
    },
    getUserHeadImage(e) {
      console.log(e);
      let that = this;
      const { avatarUrl } = e.detail;
      uni.uploadFile({
        header: {
          Authorization: "Bearer " + uni.getStorageSync("token"),
        },
        url: that.uploadUrl + "student/file/info/headimgUp",
        filePath: avatarUrl,
        name: "coverFile",
        success(result) {
          that.userInfo.headImage = JSON.parse(result.data).data;
        },
      });
      // uni.downloadFile({
      //   url: avatarUrl,

      //   useHighPerformanceMode: true,
      //   fail(err){
      //     console.log(err)
      //   },
      //   success(res) {
      //     console.log(res)
      //     uni.uploadFile({
      //       header: {
      //         Authorization: "Bearer " + uni.getStorageSync("token"),
      //       },
      //       url: that.uploadUrl + "student/file/info/headimgUp",
      //       filePath: res.tempFilePath,
      //       name: "coverFile",
      //       success(result) {
      //         that.userInfo.headImage = JSON.parse(result.data).data;
      //       },
      //     });
      //   },
      // });
    },
    goCareGzh() {
      const launchScene = wx.getLaunchOptionsSync().scene;
      console.log(launchScene);
      switch (launchScene) {
        case 1011:

        case 1017:

        case 1025:

        case 1047:

        case 1124:
          this.careVisible = true;
          break;

        default:
          uni.navigateTo({
            url: "/otherPages/careGzh/index",
          });
          break;
      }
    },
    goVideoGroup() {
      wx.openChannelsActivity({
        finderUserName: "sphQVbhe9O04tqB",
        feedId:
          "export/UzFfAgtgekIEAQAAAAAAJXo6IOZ81wAAAAstQy6ubaLX4KHWvLEZgBPEoqNUAhgxcvaHzNPgMJrCizVlT8Vn4kaJKobMZZuP",
      });
    },
    sendUserInfo() {
      api.user
        .updateUserInfo({
          headImage: this.userInfo.headImage,
          nickName: this.userInfo.nickName,
          phone: this.userInfo.phone || "",
          realName: this.userInfo.realName || "",
        })
        .then((res) => {
          this.userFormShow = false;
          this.$store.dispatch("GetInfo");
        });
    },
    changeUserName(e) {
      console.log(e);
      this.userInfo.nickName = e.detail;
    },
    changeUserPhone(e) {
      console.log(e);
      this.userInfo.phone = e.detail;
    },
    getPhoneByUser(e) {
      api.user
        .userInfoGetPhoneByCode({
          code: e.detail.code,
        })
        .then((res) => {
          this.userInfo.phone = res.data;
        });
    },
    goPath(url) {
      uni.navigateTo({
        url,
      });
    },
    goVipPath(url) {
      if (this.isVip) {
        uni.navigateTo({
          url,
        });
      } else {
        uni.showToast({
          title: "vip才能使用",
          icon: "none",
        });
      }
    },
    getUserProfile(e) {
      let that = this;
      uni.getUserProfile({
        desc: "业务需要",
        success(res) {
          console.log(res);
          api.user
            .studentUserInfoUserInfo({
              headImage: res.userInfo.avatarUrl,
              nickName: res.userInfo.nickName,
            })
            .then((res) => {
              that.$store.dispatch("GetInfo");
            });
        },
      });

      // let updateRes = await this.$api.user.updateUserInfo({
      //   headImage: userInfo.userInfo.avatarUrl,
      //   nickName: userInfo.userInfo.nickName,
      // });
      // if (updateRes.code == 200) {

      //   this.$store.state.user.userInfo.headImage = userInfo.userInfo.avatarUrl;
      //   this.$store.state.user.userInfo.nickName = userInfo.userInfo.nickName;
      // }
    },
  },
  onShow() {
    // if (typeof this.$mp.page.getTabBar === "function" && this.$mp.page.getTabBar()) {
    //   this.$mp.page.getTabBar().init();
    // }
  },
  onShareAppMessage() {
    let that = this;
    return {
      title: "驾考精选题库",
      path: "/pages/carVideo/index?pUserId=" + that.userInfo.id,
      imageUrl: "https://ndata.zzxcx.net/ctjk/mp-wx/user/shareCover.png",
    };
  },
};
</script>
<style>
.user .head-cell {
  background: transparent;
}
</style>
<style lang="scss" scoped>
.adContainer{
  width: 100%;
  margin-top: 16rpx;
}
.care {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.35);
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;

  .dialog {
    width: 300px;
    height: calc(84px + 144rpx);
    background: #fff;
    border-radius: 16rpx;
    overflow: hidden;

    .title {
      width: 100%;
      height: 72rpx;
      text-align: center;
      font-size: 32rpx;
      line-height: 72rpx;
      color: #333;
      background: #fff;

      font-weight: bold;
    }

    .confirm {
      width: 100%;
      height: 72rpx;
      text-align: center;
      font-size: 40rpx;
      line-height: 72rpx;
      color: #ee0a24;
      background: #fff;
      letter-spacing: 15px;
    }
  }
}

.nav {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;

  .leftArrow {
    width: 18rpx;
    position: absolute;
    left: 30rpx;
  }

  .title {
    position: absolute;
    left: 50%;
  }
}

.userform {
  width: 100%;

  background: #fff;

  .userform-visible {
    overflow: visible;
  }

  .userform-head {
    width: 100rpx;
    height: 100rpx;
  }

  .userform-close {
    text-align: right;
    padding-right: 15rpx;
    padding-top: 15rpx;
  }

  .userform-bind {
    width: 100%;
    padding: 30rpx 30rpx;
    display: flex;
    justify-content: center;
  }
}

.flex {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}

.userButton::after {
  border: 0;
}

.userButton {
  border: 0;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  background: transparent;
  align-items: flex-start;
  height: auto;
  padding: 0;
  line-height: 1.4;
}

.bg {
  width: 100%;
  min-height: 100vh;
  // background: #fff;
  background-image: url("https://ndata.zzxcx.net/qcxj/mp-wx/user/bg.png");
  background-size: 100%;
  background-repeat: no-repeat;
  background-color: #fff;
}

.list {
  padding: 0 15rpx;
}

.user {
  padding: 0 30rpx;

  /* height: 100vh; */
  .group {
    margin: 10px 0;
  }

  .user-avatar {
    width: 46px;
    height: 46px;
    margin-right: 10px;
  }
}

.user-headImg {
  width: 90rpx;
  height: 90rpx;
  border-radius: 50%;
}

.cell-icon {
  margin-right: 5px;
}
</style>
