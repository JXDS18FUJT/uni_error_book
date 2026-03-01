<template>


    <view class="bg">
      <!--  <topbar> -->
            <view class="nav">
                <!-- <image @click="back" mode="widthFix" class="leftArrow"
                    src="https://ndata.zzxcx.net/ctjk/mp-wx/mockExamEnd/arrow-left.png"></image> -->
                <text class="title">驾考神器</text>
            </view>
        <!-- </topbar> -->
        <view class="goods">
            <view @click="goGoodsVideo(nbjk_sph.tip_book_feedId)" class="goods-item">
                <image mode="widthFix" src="https://ndata.zzxcx.net/ctjk/mp-wx/buyExamTool/tip_book@2x.png"></image>
            </view>
            <view @click="goGoodsVideo(nbjk_sph.color_impaired_glasses_feedId)" class="goods-item">
                <image mode="widthFix"
                    src="https://ndata.zzxcx.net/ctjk/mp-wx/buyExamTool/color_impaired_glasses@2x.png"></image>
            </view>
            <view @click="goGoodsVideo(nbjk_sph.ice_silk_cuff_feedId)" class="goods-item">
                <image mode="widthFix" src="https://ndata.zzxcx.net/ctjk/mp-wx/buyExamTool/ice_silk_cuff@2x.png">
                </image>
            </view>
            <view @click="goGoodsVideo(nbjk_sph.sun_protection_hat_feedId)" class="goods-item">
                <image mode="widthFix" src="https://ndata.zzxcx.net/ctjk/mp-wx/buyExamTool/sun_protection_hat@2x.png">
                </image>
            </view>
            <view @click="goGoodsVideo(nbjk_sph.booster_cushion_feedId)" class="goods-item">
                <image mode="widthFix" src="https://ndata.zzxcx.net/ctjk/mp-wx/buyExamTool/booster_cushion@2x.png">
                </image>
            </view>

        </view>
        <view class="wxad">
            <ad ad-type="video" :ad-intervals="100" unit-id="adunit-8eb44bbd7e3147d4"></ad>
        </view>
        <view style="height: 48px;"></view>
    </view>

</template>

<script>
// import { mapGetters } from 'vuex'
export default {
    data() {
        return {

        }
    },
    methods: {
        goGoodsVideo(feedId) {
            // wx.openChannelsActivity({
            //     finderUserName: this.nbjk_sph.video_accout_id,
            //     feedId: feedId || this.nbjk_sph.tip_book_feedId
            // })
        }
    },
    onLoad(query) {



    },
    computed: {
       
    },

}
</script>

<style lang="less" scoped>
.bg {
    background: linear-gradient(180deg, #EBF5FE 0%, #6CB1F5 100%);
    width: 750rpx;
    min-height: 100vh;
    overflow-y: scroll;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);

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

    .goods {
        width: 690rpx;
        margin: 0 auto;

        image {
            width: 100%;
            margin-bottom: 25rpx;
        }
    }

}
</style>