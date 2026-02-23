<template>
	<view class="m-do-topic">
		<van-dialog :zIndex="999" id="van-dialog" />
		<countDown :time="examTime" @end="submitExam" @change="getUseTime"
			v-if="type == 'singleTest' || type == 'exam'">
		</countDown>
		<countDown :time="examTime1" @end="submitExam1" @change="getUseTime" v-if="type == 'recovery'">
		</countDown>
		<answerTip :questionType="problemList[problemListIndex].questionType" :opts="problemList[problemListIndex].opts"
			:show="answerTipShow" @close="() => {
				answerTipShow = false
			}" :answer="problemList[problemListIndex].answer"></answerTip>
		<view v-if="!hiddenMode" class="mode">
			<view @click="() => {
				createOrderProblemList();
				mode = 0;
			}
			" :class="{
				'mode-item_select': mode == 0,
			}" class="mode-item">顺序练习</view>
			<view @click="() => {
				createRandomProblemList();
				mode = 1;
			}
			" :class="{
				'mode-item_select': mode == 1,
			}" class="mode-item">随机练习</view>
			<view @click="() => {
				createCompleteProblemList();
				mode = 2;
			}
			" :class="{
				'mode-item_select': mode == 2,
			}" class="mode-item">背题模式</view>
			<view :class="{
				'mode-item_select': isAutoReadTopics,
			}" @click="() => {
				isAutoReadTopics = !isAutoReadTopics;
				isAutoReadTopics ? playCurrentIssue() : stopAudio();
			}
			" class="mode-item">自动读题</view>
		</view>
		<van-dialog confirm-button-text="关闭" use-slot :show="activeCodeVisible" @close="() => {
			activeCodeVisible = false
		}">

			<div style="padding: 0 30rpx;line-height: 1;">
				<div style="text-align: center;font-size: 40rpx;padding: 30rpx 0rpx;">提示</div>
				<view style="padding: 0 30rpx;font-size: 24rpx;">
					该功能为会员专属功能请开通会员,
					请输入抖音订单号或者激活码开通或在线开通

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
		<view class="divider"></view>
		<view class="problem-box" :class="{
			pb80px: type == 'exam',
			pb50px: type != 'exam',
		}">
			<!-- <text class="problem-type">{{
        problemList[problemListIndex].questionType | questionType
      }}</text>
      <text
        style="background: #9c5fed"
        v-if="problemList[problemListIndex].isNew"
        class="problem-type"
        >新规题</text
      > -->
			<!-- <text>{{ problemListIndex + 1 }}、</text> -->
			<rich-text style="font-size: 42rpx; vertical-align: top" :nodes="createProblemTypeHtml(problemList[problemListIndex]) +
				(problemListIndex + 1) +
				'、' +
				problemList[problemListIndex].issue
				"></rich-text>
			<!-- <text class="problem-issue"
        >{{ problemListIndex + 1 }}、{{
          problemList[problemListIndex].issue
        }}</text
      > -->
			<m-three-countdown1 :autoHidden="true" v-if="!problemList[problemListIndex].isCompleted"
				:problemListIndex="problemListIndex" :seconds="problemList[problemListIndex].imgfirst">
				<view v-if="problemList[problemListIndex].image" class="problem-img">
					<image mode="widthFix" v-if="getFileType(problemList[problemListIndex].image) == 'image'"
						:src="problemList[problemListIndex].image"></image>
					<video :controls="false" autoplay loop
						v-if="getFileType(problemList[problemListIndex].image) == 'video'"
						:src="problemList[problemListIndex].image"></video>
				</view>
			</m-three-countdown1>

			<view v-if="problemList[problemListIndex].image && problemList[problemListIndex].isCompleted"
				class="problem-img">
				<image mode="widthFix" v-if="getFileType(problemList[problemListIndex].image) == 'image'"
					:src="problemList[problemListIndex].image"></image>
				<video :controls="false" autoplay loop
					v-if="getFileType(problemList[problemListIndex].image) == 'video'"
					:src="problemList[problemListIndex].image"></video>
			</view>

			<view v-if="!hiddenFunction" class="funcicon-list">
				<view v-if="midFunc.includes('collect')" @click="collectTopics" :class="!problemList[problemListIndex].isCollect
					? 'funcicon-item'
					: 'funcicon-item funcicon-item_select'
					">
					<van-icon style="margin-right: 8rpx" v-if="!problemList[problemListIndex].isCollect" name="star-o"
						size="10px" />
					<van-icon style="margin-right: 8rpx" color="#ffde00ff"
						v-if="problemList[problemListIndex].isCollect" name="star" size="10px" />
					<span>收藏</span>
				</view>

				<view v-if="midFunc.includes('threeCollect')" @click="threeCollectTopics" :class="!problemList[problemListIndex].isCollect
					? 'funcicon-item'
					: 'funcicon-item funcicon-item_select'
					">
					<van-icon style="margin-right: 8rpx" v-if="!problemList[problemListIndex].isCollect" name="star-o"
						size="10px" />
					<van-icon style="margin-right: 8rpx" color="#ffde00ff"
						v-if="problemList[problemListIndex].isCollect" name="star" size="10px" />
					<span>收藏</span>
				</view>
				<view v-if="midFunc.includes('readQuestionAndAnswer')" @click="() => {
					isVip ? readQuestionAndAnswer() : activeCodeVisible = true;
					isVip ? completeQuestion() : activeCodeVisible = true;
				}

				" class="funcicon-item funcicon-item_select">
					<m-jp-icon style="margin-right: 8rpx" type="a-dtda" size="10px" />
					<span>读题+答案</span>
				</view>
				<view v-if="midFunc.includes('readQuestion')"
					@click="() => { isVip ? readQuestion() : activeCodeVisible = true }"
					class="funcicon-item funcicon-item_select">
					<m-jp-icon style="margin-right: 8rpx" type="duti" size="10px" />
					<span>读题</span>
				</view>
				<!-- <div
          @click="
            () => {
              explainJqVisible = true;
            }
          "
          class="function-item"
        >
          <m-jp-icon type="jqjj" size="25px" />
          <span>技巧讲解</span>
        </div> -->
			</view>
			<!-- #ifdef MP-WEIXIN -->
			<!-- 单项选择 -->
			<view v-if="
				problemList[problemListIndex].questionType < 3 &&
				!problemList[problemListIndex].isCompleted
			" style="margin-top: 0" class="problem-ops">
				<m-three-countdown1 :delay="problemList[problemListIndex].imgfirst" :problemListIndex="problemListIndex"
					:seconds="problemList[problemListIndex].imgfirst">
					<van-radio-group :value="problemList[problemListIndex].userAnswer" :max="1"
						@change="changeRadioGroup">
						<van-radio label-class="problem-fontsize"
							:value="problemList[problemListIndex].userAnswer === item.value" use-icon-slot
							v-for="(item, index) in problemList[problemListIndex].optsArr" :key="index"
							:name="item.value">
							<text class="problem-fontsize problem-lh">{{ item.value }}</text>
							<view class="problem-op problem-fontsize mt15 mb15" :class="{
								'problem-op_selected':
									problemList[problemListIndex].userAnswer === item.value,
							}" slot="icon">{{ numberToLetter(index) }}</view>
						</van-radio>
					</van-radio-group>
				</m-three-countdown1>

			</view>
			<view v-if="
				problemList[problemListIndex].questionType < 3 &&
				problemList[problemListIndex].isCompleted
			">
				<view v-for="(item, index) in problemList[problemListIndex].optsArr" :key="index"
					class="problem-select pl30">
					<icon v-if="item.isAnswer && item.selected" class="icon-box-img" type="success" color="#06c05f"
						size="36">
					</icon>
					<icon v-if="!item.isAnswer && item.selected" class="icon-box-img" type="clear" color="red"
						size="36"></icon>
					<text v-if="!item.isAnswer && !item.selected" class="problem-op problem-fontsize">{{
						numberToLetter(index)
					}}</text>
					<text v-if="item.isAnswer && !item.selected" class="problem-op problem-op_green problem-fontsize">{{
						numberToLetter(index) }}</text>
					<view style="width: 8px"></view>
					<view class="problem-opAnswer problem-fontsize">
						<view v-if="item.isAnswer && item.selected" class="problem-opAnswer_correct"> {{ item.value }}
						</view>
						<view v-if="item.isAnswer && !item.selected" class="problem-opAnswer_correct"> {{ item.value }}
						</view>
						<view v-if="!item.isAnswer && item.selected" class="problem-opAnswer_error"> {{ item.value }}
						</view>
						<view v-if="!item.isAnswer && !item.selected" class=""> {{ item.value }}</view>
					</view>
				</view>
			</view>

			<!-- 多项选择 -->
			<view v-if="
				problemList[problemListIndex].questionType == 3 &&
				!problemList[problemListIndex].isCompleted
			" class="problem-ops" style="margin-top: 0">
				<van-checkbox-group :value="problemList[problemListIndex].userAnswer" :max="4"
					@change="changeCheckboxGroup">
					<van-checkbox :value="problemList[problemListIndex].userAnswer.includes(item.value)"
						class="problem-checkbox" use-icon-slot
						v-for="(item, index) in problemList[problemListIndex].optsArr" :key="index" :name="item.value"
						label-class="problem-fontsize ">
						<text class="problem-fontsize problem-lh">{{ item.value }}</text>
						<view class="problem-op mt15 mb15 problem-fontsize" :class="{
							'problem-op_selected': item.selected,
						}" slot="icon">{{ numberToLetter(index) }}</view>
					</van-checkbox>
				</van-checkbox-group>
				<view class="flex-center mt30 pb16">
					<van-button @click="confirmMult" color="#3AC770" round custom-style="width:600rpx"
						type="primary">确定</van-button>
				</view>
			</view>
			<view class="problem-ops" v-if="
				problemList[problemListIndex].questionType == 3 &&
				problemList[problemListIndex].isCompleted
			" style="margin-top: 0">
				<view v-for="(item, index) in problemList[problemListIndex].optsArr" :key="index"
					class="problem-select">
					<icon v-if="item.isAnswer && item.selected" class="icon-box-img" type="success" color="#06c05f"
						size="36">
					</icon>
					<icon v-if="!item.isAnswer && item.selected" class="icon-box-img" type="clear" size="36"
						color="red"></icon>
					<text v-if="!item.isAnswer && !item.selected" class="problem-op problem-fontsize">{{
						numberToLetter(index)
					}}</text>
					<text v-if="item.isAnswer && !item.selected" class="problem-op problem-op_green problem-fontsize">{{
						numberToLetter(index) }}</text>
					<view style="width: 8px"></view>
					<view class="problem-opAnswer problem-fontsize">
						<view v-if="item.isAnswer && item.selected" class="problem-opAnswer_correct"> {{ item.value }}
						</view>
						<view v-if="item.isAnswer && !item.selected" class="problem-opAnswer_correct"> {{ item.value }}
						</view>
						<view v-if="!item.isAnswer && item.selected" class="problem-opAnswer_error"> {{ item.value }}
						</view>
						<view v-if="!item.isAnswer && !item.selected" class=""> {{ item.value }}</view>
					</view>
				</view>
			</view>
			<!-- #endif -->
			<!-- #ifdef MP-TOUTIAO -->
			<!-- 判断 -->
			<view v-if="
				problemList[problemListIndex].questionType == 1 &&
				!problemList[problemListIndex].isCompleted
			" class="problem-ops">
				<m-radio-group @change="changeRadioGroup" :value.sync="problemList[problemListIndex].userAnswer">
					<m-radio :value="judgMap[item.value]" :item="item" :useIconSlot="true" :key="index"
						:name="numberToLetter(index)" v-for="(item, index) in problemList[problemListIndex].optsArr">
					</m-radio>
				</m-radio-group>
			</view>
			<view class="problem-ops" v-if="
				problemList[problemListIndex].questionType == 1 &&
				problemList[problemListIndex].isCompleted
			">
				<view v-for="(item, index) in problemList[problemListIndex].optsArr" :key="index"
					class="problem-select">
					<icon v-if="item.isAnswer && item.selected" class="icon-box-img" type="success" color="#06c05f"
						size="37">
					</icon>
					<icon v-if="!item.isAnswer && item.selected" class="icon-box-img" type="clear" size="37"></icon>
					<text v-if="!item.isAnswer && !item.selected" class="problem-op">{{
						numberToLetter(index)
					}}</text>
					<text v-if="item.isAnswer && !item.selected" class="problem-op problem-op_green">{{
						numberToLetter(index)
					}}</text>
					<view style="width: 8px"></view>
					<text class="problem-opAnswer">{{ judgMap[item.value] }}</text>
				</view>
			</view>
			<!-- 单选 -->
			<view v-if="
				problemList[problemListIndex].questionType == 2 &&
				!problemList[problemListIndex].isCompleted
			" class="problem-ops">
				<m-radio-group @change="changeRadioGroup" :value.sync="problemList[problemListIndex].userAnswer">
					<m-radio :value="item.value" :item="item" :useIconSlot="true" :key="index"
						:name="numberToLetter(index)" v-for="(item, index) in problemList[problemListIndex].optsArr">
					</m-radio>
				</m-radio-group>
			</view>
			<view class="problem-ops" v-if="
				problemList[problemListIndex].questionType == 2 &&
				problemList[problemListIndex].isCompleted
			">
				<view v-for="(item, index) in problemList[problemListIndex].optsArr" :key="index"
					class="problem-select">
					<icon v-if="item.isAnswer && item.selected" class="icon-box-img" type="success" color="#06c05f"
						size="37">
					</icon>
					<icon v-if="!item.isAnswer && item.selected" class="icon-box-img" type="clear" size="37"></icon>
					<text v-if="!item.isAnswer && !item.selected" class="problem-op">{{
						numberToLetter(index)
					}}</text>
					<text v-if="item.isAnswer && !item.selected" class="problem-op problem-op_green">{{
						numberToLetter(index)
					}}</text>
					<view style="width: 8px"></view>
					<text class="problem-opAnswer">{{ item.value }}</text>
				</view>
			</view>
			<!-- 多选 -->
			<view v-if="
				problemList[problemListIndex].questionType == 3 &&
				!problemList[problemListIndex].isCompleted
			" class="problem-ops">
				<m-checkbox-group @change="changeCheckboxGroup" :value="problemList[problemListIndex].userAnswer"
					:max="4">
					<m-checkbox @change="changeCheckbox" :item="item" :value="item.value" class="problem-checkbox"
						use-icon-slot v-for="(item, index) in problemList[problemListIndex].optsArr" :key="index"
						:name="numberToLetter(index)">
					</m-checkbox>
				</m-checkbox-group>
				<view class="flex-center pb16">
					<van-button @click="confirmMult" color="#3AC770" round custom-style="width:600rpx"
						type="primary">确定</van-button>
				</view>
			</view>
			<view class="problem-ops" v-if="
				problemList[problemListIndex].questionType == 3 &&
				problemList[problemListIndex].isCompleted
			">
				<view v-for="(item, index) in problemList[problemListIndex].optsArr" :key="index"
					class="problem-select">
					<icon v-if="item.isAnswer && item.selected" class="icon-box-img" type="success" color="#06c05f"
						size="37">
					</icon>
					<icon v-if="!item.isAnswer && item.selected" class="icon-box-img" type="clear" size="37"></icon>
					<text v-if="!item.isAnswer && !item.selected" class="problem-op">{{
						numberToLetter(index)
					}}</text>
					<text v-if="item.isAnswer && !item.selected" class="problem-op problem-op_green">{{
						numberToLetter(index)
					}}</text>
					<view style="width: 8px"></view>
					<text class="problem-opAnswer">{{ item.value }}</text>
				</view>
			</view>

			<view v-if="problemList[problemListIndex].isCompleted && !hiddenAnswer" class="answer">
				<view v-if="
					problemList[problemListIndex].questionType == 1 &&
					problemList[problemListIndex].isCompleted
				">
					答案：{{ judgMap[problemList[problemListIndex].answer] }}
				</view>
				<view v-if="
					problemList[problemListIndex].questionType > 1 &&
					problemList[problemListIndex].isCompleted
				">
					答案： {{ problemList[problemListIndex].answer }}
				</view>
			</view>
			<funList :midFunc="midFunc" v-if="!hiddenFunction" @collect="collectTopics" @readQuestionAndAnswer="
				readQuestionAndAnswer();
			completeQuestion();
			" :problemListItem="problemList[problemListIndex]">
			</funList>

			<!-- #endif -->
			<view v-if="!hiddenFunction" class="function-list">
				<div v-if="midFunc.includes('collect')" @click="collectTopics" class="function-item">
					<van-icon v-if="!problemList[problemListIndex].isCollect" name="star-o" size="25px" />
					<van-icon color="#ffde00ff" v-if="problemList[problemListIndex].isCollect" name="star"
						size="25px" />
					<span>收藏</span>
				</div>

				<div v-if="midFunc.includes('threeCollect')" @click="threeCollectTopics" class="function-item">
					<van-icon v-if="!problemList[problemListIndex].isCollect" name="star-o" size="25px" />
					<van-icon color="#ffde00ff" v-if="problemList[problemListIndex].isCollect" name="star"
						size="25px" />
					<span>收藏</span>
				</div>
				<div v-if="midFunc.includes('readQuestionAndAnswer')" @click="() => {
					isVip ? readQuestionAndAnswer() : activeCodeVisible = true;
					isVip ? completeQuestion() : activeCodeVisible = true;
				}" class="function-item">
					<m-jp-icon type="a-dtda" size="25px" />
					<span>读题+答案</span>
				</div>
				<div v-if="midFunc.includes('readQuestion')"
					@click="() => { isVip ? readQuestion() : activeCodeVisible = true }" class="function-item">
					<m-jp-icon type="duti" size="25px" />
					<span>读题</span>
				</div>
				<!-- <div
          @click="
            () => {
              explainJqVisible = true;
            }
          "
          class="function-item"
        >
          <m-jp-icon type="jqjj" size="25px" />
          <span>技巧讲解</span>
        </div> -->
			</view>
			<!-- 底部的栏目 -->
			<!-- #ifdef MP-WEIXIN -->
			<view v-if="problemList[problemListIndex].isCompleted" class="atip">
				<view style="width: 100%;height: 20rpx;background-color: #F0F2F1;"></view>
				<view class="line1">
					<view style="display: inline-flex;">
						<view>
							<text>答案</text>
							<!-- 多选题适配 -->
							<text style="color: #3AC770;padding-left: 10rpx;">{{
								getAnswerLetter(problemList[problemListIndex],
									problemList[problemListIndex].answer.split('-'))
								}}</text>
						</view>

						<view style="padding-left: 40rpx;">
							<text>您选择</text>
							<text style="color: #FF4D53;padding-left: 10rpx;">{{
								getAnswerLetter(problemList[problemListIndex], problemList[problemListIndex].userAnswer)
							}}</text>
						</view>
					</view>

					<view @click="() => {
						isVip ?
							explainJqVisible = true : activeCodeVisible = true
					}" style="display: flex;align-items: center;">
						<image style="width: 32rpx;" mode="widthFix" src="/static/icon/deng_icon.png" />
						<text style="color: #3AC770;font-size: 30rpx;padding-left: 10rpx;">速记口诀</text>
					</view>
				</view>
				<view class="line2">
					<view>
						<text style="color: #919994;padding-right: 10rpx;font-size: 26rpx;">难度</text> <van-rate
							:value="problemList[problemListIndex].diffDegree" size="16" allow-half color="#ffd21e"
							void-icon="star" void-color="#eee" readonly></van-rate>
					</view>
					<view>
						<text v-if="problemList[problemListIndex].errorRate"
							style="color: #919994;padding-right: 10rpx;font-size: 26rpx;">错误率：{{
								problemList[problemListIndex].errorRate }}%</text>
					</view>

				</view>
				<view class="line3">
					<view style="font-size: 42rpx;padding-right: 10rpx;">本题技巧</view>
					<image @click="playexplainMp3()" style="width: 42rpx;" mode="widthFix"
						src="/static/icon/laba_icon.png"></image>
				</view>
				<view class="line4">
					<view>
						{{ problemList[problemListIndex].explainJq }}
					</view>
				</view>
			</view>
			<view v-if="problemList[problemListIndex].isCompleted" class="ajs">
				<view class="line1">
					<image style="width: 52rpx;" mode="widthFix" src="/static/icon/star_green_left.png"></image>
					<text style="padding: 0 10rpx;">试题详解</text>
					<image style="width: 52rpx;" mode="widthFix" src="/static/icon/star_green_right.png"></image>
				</view>
				<view class="line2">
					{{ problemList[problemListIndex].explainJs }}
				</view>
			</view>
			<view :fixed="false" height="20px;bottom:30px" class="custom-tabbar">
				<view class="ipone-bottom">
					<view class="custom-tabbar-item" v-if="bottomFunc.includes('previous')" @click="goBeforeTopics">
						<van-icon slot="icon" custom-style="transform: rotate(90deg);" custom-class="last-subject"
							name="down" size="18px" />
						<text style="font-size: 24rpx">上一题</text>
					</view>
					<view class="custom-tabbar-item" v-if="bottomFunc.includes('score')" style="text-align: center">
						<view @click="() => {
							selectProblemListVisible = true;
						}
						">
							<view>
								<icon slot="icon" class="icon-box-img" type="success" size="9px"></icon><text
									style="margin-left: 8rpx">{{ trueNum }}</text>
							</view>
							<view>
								<icon slot="icon" class="icon-box-img" type="clear" color="red" size="9px"></icon><text
									style="margin-left: 8rpx">{{ falseNum }}</text>
							</view>
							<view>
								<text style="font-size: 24rpx">
									{{ problemListIndex + 1 }}/{{ problemList.length }}</text>
							</view>
						</view>
					</view>
					<view class="custom-tabbar-item" v-if="bottomFunc.includes('skill')" style="position: relative">
						<image @tap="() => {
							isVip ?
								explainJqVisible = true : activeCodeVisible = true
						}
						" class="jqIcon" src="https://ndata.zzxcx.net/qcxj/mp-wx/exercise/jsIcon.png">
						</image>
						<van-icon style="opacity: 0; display: block" name="info-o" slot="icon" size="18px" />
						<span>
							<text style="font-size: 24rpx">技巧讲解</text>
						</span>
					</view>
					<!-- <van-tabbar-item><van-icon slot="icon" size="18px" name="description" />{{
            problemListIndex + 1
          }}/{{ problemListTotal }}
          </van-tabbar-item> -->
					<view class="custom-tabbar-item" v-if="bottomFunc.includes('explain')" @click="() => {
						explainJsVisible = true;
					}
					"><van-icon name="info-o" slot="icon" size="18px" />
						<text style="font-size: 24rpx">官方解释</text>
					</view>
					<view class="custom-tabbar-item" v-if="bottomFunc.includes('next')" @click="goNextTopics"><van-icon
							slot="icon" custom-style="transform: rotate(-90deg);" custom-class="last-subject"
							name="down" size="18px" /><text style="font-size: 24rpx">下一题</text>
					</view>
				</view>
				<view v-if="type == 'exam' || type == 'singleTest' || type == 'recoveryExam'" class="submit">
					<view @click="submitExam" class="submit-button">交卷</view>
				</view>
			</view>

			<!-- #endif -->
			<!-- #ifdef MP-TOUTIAO -->
			<tabbar height="50px">
				<view v-if="bottomFunc.includes('previous')" class="h-full tabbar-item">
					<view @click="goBeforeTopics">
						<van-icon slot="icon" custom-style="transform: rotate(90deg);" custom-class="last-subject"
							name="down" size="18px" />
						<view style="width: 100%"> 上一题 </view>
					</view>
				</view>

				<view v-if="bottomFunc.includes('score')" class="h-full tabbar-item">
					<view class="tabbar-item">
						<icon class="icon-box-img" color="#06c05f" type="success" size="18px"></icon>
						<view style="width: 100%; color: #06c05f">{{ trueNum }}</view>
					</view>
					<view style="margin-left: 15rpx" class="tabbar-item">
						<icon class="icon-box-img" type="clear" size="18px"></icon>
						<view style="width: 100%; color: red">{{ falseNum }}</view>
					</view>
				</view>
				<view v-if="bottomFunc.includes('catalogue')" class="h-full tabbar-item">
					<van-icon size="18px" name="description" />
					<view style="width: 100%">{{ problemListIndex + 1 }}/{{ problemList.length }}</view>
				</view>
				<view v-if="bottomFunc.includes('selectCatalogue')" @click="() => {
					selectProblemListVisible = true;
				}
				" class="h-full tabbar-item">
					<van-icon size="18px" name="description" />
					<view style="width: 100%">{{ problemListIndex + 1 }}/{{ problemList.length }}</view>
				</view>

				<view v-if="bottomFunc.includes('explain')" @click="() => {
					explainJsVisible = true;
				}
				" class="h-full tabbar-item">
					<icon type="warn" size="18" />
					<view style="width: 100%; text-align: center">解释</view>
				</view>
				<view @click="submitExam" v-if="bottomFunc.includes('submitExam')" class="h-full tabbar-item">
					<van-icon slot="icon" size="18px" name="records" />
					<view style="width: 100%">交卷</view>
				</view>

				<view v-if="bottomFunc.includes('next')" @click="goNextTopics" class="h-full tabbar-item">
					<van-icon slot="icon" custom-style="transform: rotate(-90deg);" custom-class="last-subject"
						name="down" size="18px" />
					<view style="width: 100%"> 下一题 </view>
				</view>
			</tabbar>
			<!-- #endif -->
			<!-- 题目序号选择 -->
			<van-overlay :lock-scroll="false" :zIndex="100" :duration="500" :show="selectProblemListVisible">
				<view class="select-problem">
					<view class="problem-index">
						<view class="problem-header">
							<view class="problem-header-left">
								<view class="problem-dui">
									<icon class="icon-box-img" color="#06c05f" type="success" size="18"></icon>
									<text style="color: #06c05f; font-size: 14px; margin-left: 8rpx">{{
										trueNum
									}}</text>
								</view>
								<view class="problem-cuo" style="margin-left: 16rpx">
									<icon class="icon-box-img" type="cancel" size="18"></icon>
									<text style="color: red; font-size: 14px; margin-left: 8rpx">{{
										falseNum
									}}</text>
								</view>
							</view>
							<view class="problem-header-right">
								<van-icon size="18px" name="description" />
								<view style="font-size: 14px; display: flex; align-items: center">
									{{ problemListIndex + 1 }}/{{
										problemListTotal }}
								</view>
							</view>
						</view>
						<view class="problem-body">
							<view class="problem-listBody">
								<view class="problem-listItem" :key="index" @click="() => {
									$emit('update:problemListIndex', index);
								}
								" v-for="(item, index) in problemList" :class="{
									'problem-listItem_current': problemListIndex == index,
									'problem-listItem_dui':
										item.userAnswer.length && item.userAnswer == item.answer,
									'problem-listItem_cuo':
										item.userAnswer.length && item.userAnswer !== item.answer,
								}">
									{{ index + 1 }}
								</view>
							</view>
						</view>
						<view class="problem-bottom">
							<!-- <view @click="
                () => {
                  selectProblemListVisible = false;
                }
              " class="problem-bottom-sure">确定
              </view> -->
							<view @click="() => {
								selectProblemListVisible = false;
							}
							" class="problem-bottom-close">
								关闭</view>
						</view>
					</view>
				</view>
			</van-overlay>
			<explainJq @close="() => {
				explainJqVisible = false;
			}
			" :explainJq="problemList[problemListIndex].explainJq" :explainMp3="problemList[problemListIndex].explainMp3"
				:explainJqGif="problemList[problemListIndex].explainJqGif"
				:skillkeyword="problemList[problemListIndex].skillkeyword" :show="explainJqVisible">
			</explainJq>
			<explainJs @close="() => {
				explainJsVisible = false;
			}
			" :explainJs="problemList[problemListIndex].explainJs" :explainjsmp3="problemList[problemListIndex].explainjsmp3"
				:show="explainJsVisible"></explainJs>
		</view>
	</view>
</template>

<script>
import countDown from "@/components/countDown/index";
import mRadio from "@/components/m-radio/m-radio.vue";
import mRadioGroup from "@/components/m-radio-group/m-radio-group.vue";
import mCheckbox from "@/components/m-checkbox/m-checkbox.vue";
import mCheckboxGroup from "@/components/m-checkbox-group/m-checkbox-group.vue";
import api from "@/api/index";
import utils from "@/utils/index";
import explainJq from "./components/explainJq.vue";
import tabbar from "./components/tabbar.vue";
import explainJs from "./components/explainJs.vue";
import answerTip from "./components/answerTip.vue";
import funList from "./components/funList.vue";
// import { mapGetters } from "vuex";
import Dialog  from '@/uni_modules/press-ui/components/press-dialog/handler';
let origProblemList = [];
export default {
	data() {
		return {
			//topic
			//isCollect
			isAutoReadTopics: false,
			answerTipShow: false,
			activeCodeVisible: false,
			mode: 0,
			problemList: [{
				questionType: 2,
				answer: "×",
				answerkeyword: "",
				isCollect: false,
				answermp3: "https://ndata.zzxcx.net/kt/answer_mp3/answer1389.mp3",
				classIssue: "54",
				classIssueName: "车内开关/装置",
				classSort: 16,
				createTime: "2022-04-21 13:33:46",
				excellIssue: "23",
				excellIssueName: "必学题三",
				excellSort: 4,
				explainGif: "https://ndata.zzxcx.net/kt/explain_gif/explain1389.gif",
				explainJq: "看图答题：红色圆圈套在杆子中间.答对；不在中间或没有圆圈的.答错。",
				explainJs: "图中所示为左右转向灯开关转向灯操作：上提是右转向灯亮起，下压是左转向灯。",
				explainMp3: "https://ndata.zzxcx.net/kt/explain_mp3/explain1389.mp3",
				explainjsmp3: "https://ndata.zzxcx.net/kt/explain_js_mp3/explainJS1389.mp3",
				id: 831,
				idKt: 1389,
				idYdt: 950,
				image: "https://ndata.zzxcx.net/kt/image/image1389.png",
				imageYdt: "https://ndata.zzxcx.net/kt/image_ydt/5eb4d75agw1e291vmniovj.jpg",
				issue: "将转向灯开关向上提，左转向灯亮。",
				issuemp3: "https://ndata.zzxcx.net/kt/issue_mp3/issue1389.mp3",
				isNew: 0,
				liceBus: "1",
				liceCar: "1",
				liceMoto: null,
				liceTruck: "1",
				number: 831,
				opts: "√-×",
				optsArr: ["√", "×"],
				placeIssue: null,
				placeIssueName: null,
				placeSort: null,
				questionType: 1,
				sequeIssue: "7",
				sequeIssueName: "机械仪表",
				sequeSort: 25,
				skillkeyword: "没有圆圈-答错",
				subject: 1,
				titlekeyword: "",
				updateTime: "2022-04-22 13:43:07",
				userAnswer: [],
			},],
			judgMap: {
				"√": "正确",
				"×": "错误",
			},
			gsMap: {
				xc: "小车",
				hc: "货车",
				mtc: "摩托车",
				kc: "客车",
			},
			examTime: 1000 * 60 * 45,
			examTime1: 1000 * 60 * 30,
			useTime: "",
			problemListTotal: 1,
			explainJqVisible: false,
			selectProblemListVisible: false,
			explainJsVisible: false,
			trueNum: 0,
			falseNum: 0,
			errQuestionIds: [],

		};
	},
	watch: {
		//specify
		problemListIndex(newValue, oldValue) {
			if (this.isAutoReadTopics) {
				let audio = utils.wxUtils.getGlobAudio();
				audio.stop();
				audio.src = this.problemList[this.problemListIndex].issuemp3;
				audio.play();
			}
			if (this.allowMemory) {
				let key = `${uni.getStorageSync("userInfo").xcxOpenid}_${this.query.cert}_${this.query.subject == 1 ? "科目一" : "科目四"
					}_${this.query.title}_${this.query.classIssueName ||
					this.query.placeIssueName ||
					this.query.excellIssueName ||
					this.query.sequeIssueName
					}`;
				uni.setStorageSync(key, this.problemListIndex);
			}
		},
	},
	methods: {
		changeOrderId(e) {
			this.orderId = e.detail

		},
		bindOrderId(e) {
			let that = this
			api.buy.studentJyPurchasesBindUserByTidOnVipCode({
				tid: this.orderId
			}).then(res => {
				if (res.code == 200) {
					uni.showModal({
						title: '提示',
						content: '激活成功',
						success(res) {
							that.activeCodeVisible = false

							uni.showLoading({
								title: '加载中'
							})
							setTimeout(() => {
								uni.hideLoading()

							}, 1500)
						}
					})
					// Dialog.alert({
					// 	selector: '#van-dialog',
					// 	title: '提示',
					// 	message: '激活成功',
					// 	theme: 'round-button',
					// }).then(() => {

					// 	// on close
					// });
					that.$store.dispatch("GetInfo")

				} else if (res.code == 50003) {
					uni.showToast({
						title: '已经是vip无需激活',
						icon: 'none',
						duration: 3500
					})
					that.$store.dispatch("GetInfo")
					that.activeCodeVisible = false
				}
				else {
					uni.showModal({
						title: '提示',
						content: res.msg,
						success(res) {
							that.activeCodeVisible = false

							uni.showLoading({
								title: '加载中'
							})
							setTimeout(() => {
								uni.hideLoading()

							}, 1500)
						}
					})
					// Dialog.alert({
					// 	selector: '#van-dialog',
					// 	title: '提示',
					// 	message: res.msg,
					// 	theme: 'round-button',
					// }).then(() => {})
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
		playexplainMp3() {
			let audio = utils.wxUtils.getGlobAudio();
			audio.stop();

			audio.src = this.problemList[this.problemListIndex].explainMp3;
			audio.onCanplay(() => {
				console.log("onCanplay");
			});
			audio.onPlay(() => {
				console.log("onPlay");
			});
			audio.onError((res) => {
				console.log(res);
			});
			//体验比较好
			setTimeout(() => {
				audio.play();
			}, 1000);
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
		getAnswerLetter(item, answer) {

			let optsArray = item.opts.split('-')
			let l = ''
			if (typeof answer == 'string') {
				let i = optsArray.indexOf(answer)

				switch (i) {
					case -1:
						l = ""
						break;
					case 0:
						l = "A"
						break;
					case 1:
						l = "B"
						break;
					case 2:
						l = "C"
						break;
					case 3:
						l = "D"
						break;
					default:
						l = ""


				}


			} else if (Array.isArray(answer)) {
				l = ''
				for (let index = 0; index < answer.length; index++) {
					const element = answer[index];
					let i = optsArray.indexOf(element)

					switch (i) {
						case -1:
							l += ""
							break;
						case 0:
							l += "A"
							break;
						case 1:
							l += "B"
							break;
						case 2:
							l += "C"
							break;
						case 3:
							l += "D"
							break;
						default:
							l += ""


					}


				}


			}
			return l


		},
		getFileType(src) {
			let suffix = src.substring(src.lastIndexOf(".") + 1);
			let type = "";
			switch (suffix) {
				case "mp4":
				case "WebM":
				case "Ogg":
					type = "video";
					break;
				case "png":
				case "jpg":
				case "webp":
				case "gif":
					type = "image";
					break;
				case "pdf":
					type = "pdf";
					break;
				default:
					type = "other";
			}
			return type;
		},
		createProblemTypeHtml(item) {
			let html = "";
			//#9c5fed
			html = item.isNew ?
				'<span style="font-size: 11px;color: #fff;background:#9c5fed;padding: 3px 10px;border-radius: 4px;margin-right: 5px;vertical-align: middle;">新规题</span>' :
				"";
			if (item.questionType == 1) {
				return (
					html +
					'<span style="font-size: 11px;color: #fff;background: #3AC770;padding: 3px 10px;border-radius: 4px;margin-right: 5px;vertical-align: middle;">判断题</span>'
				);
			} else if (item.questionType == 2) {
				return (
					html +
					'<span style="font-size: 11px;color: #fff;background: #3AC770;padding: 3px 10px;border-radius: 4px;margin-right: 5px;vertical-align: middle;">选择题</span>'
				);
			} else {
				return (
					html +
					'<span style="font-size: 11px;color: #fff;background: #2878ff;padding: 3px 10px;border-radius: 4px;margin-right: 5px;vertical-align: middle;">多选题</span>'
				);
			}
		},
		getUseTime(leftTime, useTime) {
			this.useTime = useTime;
		},
		stopAudio() {
			let audio = utils.wxUtils.getGlobAudio();
			audio.stop();
		},
		playCurrentIssue() {
			let audio = utils.wxUtils.getGlobAudio();
			audio.stop();
			audio.src = this.problemList[this.problemListIndex].issuemp3;
			audio.play();
		},
		createCompleteProblemList() {
			if (this.mode == 2) {
				return;
			}
			let problemList = JSON.parse(JSON.stringify(origProblemList));

			problemList.forEach((item) => {
				item.optsArr.forEach((_item) => {
					if (_item.isAnswer) {
						_item.selected = true;
					}
				});
				item.isCompleted = true;
			});
			this.trueNum = 0;
			this.falseNum = 0;

			this.problemList = problemList;
			this.$emit("update:problemListIndex", 0);
		},
		createOrderProblemList() {
			if (this.mode == 0) {
				return;
			}
			let problemList = JSON.parse(JSON.stringify(origProblemList));
			console.log(problemList);
			console.log(origProblemList);
			this.problemList = problemList;
			this.trueNum = 0;
			this.falseNum = 0;
			//初始化序号
			this.$emit("update:problemListIndex", 0);
		},
		createRandomProblemList() {
			if (this.mode == 1) {
				return;
			}
			let problemList = JSON.parse(JSON.stringify(origProblemList));
			problemList.sort(function () {
				return Math.random() - 0.5;
			});
			this.problemList = problemList;
			this.trueNum = 0;
			this.falseNum = 0;
			//初始化序号
			this.$emit("update:problemListIndex", 0);
		},
		goBeforeTopics() {
			if (this.problemListIndex <= 0) {
				uni.showToast({
					title: "到底了",
					icon: "none",
				});
				return;
			}
			// this.problemListIndex = this.problemListIndex - 1;
			this.$emit("update:problemListIndex", this.problemListIndex - 1);
		},
		goNextTopics() {
			if (this.problemListIndex >= this.problemList.length - 1) {
				uni.showToast({
					title: "到底了",
					icon: "none",
				});
				return;
			}
			// this.problemListIndex = this.problemListIndex + 1;
			console.log(this.problemListIndex + 1);
			this.$emit("update:problemListIndex", this.problemListIndex + 1);
		},
		completeQuestion() {
			this.problemList[this.problemListIndex].optsArr.forEach((item, index) => {
				if (item.isAnswer) {
					this.$set(
						this.problemList[this.problemListIndex].optsArr[index],
						"selected",
						true
					);
				}
			});
			this.$set(this.problemList[this.problemListIndex], "isCompleted", true);
			this.$set(
				this.problemList[this.problemListIndex],
				"userAnswer",
				this.problemList[this.problemListIndex].answer
			);
		},
		submitExam(e) {
			let score = 0;
			let query = this.query;
			let that = this;
			let scorePerQuestion = 0;
			console.log(query);
			query.subject === "4" ? (scorePerQuestion = 2) : (scorePerQuestion = 1);
			// mtc force scorePerQuestion =2
			if (query.model == 'mtc') {
				scorePerQuestion = 2
			}
			if (this.type == 'recovery') {
				scorePerQuestion = 2
			}
			score = this.trueNum * scorePerQuestion;
			uni.showModal({
				title: "是否交卷",
				content: "交卷后不可再修改了",
				async success(res) {
					if (res.confirm) {
						uni.showLoading({
							title: "提交成绩中",
						});
						if (query.oldSubject == 'k12') {
							await api.exam.studentScoreInfo({
								score: score,

								kskm: '满分',
								type: '满分',
							});

						} else {
							await api.exam.studentScoreInfo({
								score: score,

								kskm: query.subject,
								type: that.gsMap[query.gs],
							});

						}

						uni.hideLoading();
						let useTime = that.useTime;

						uni.navigateTo({
							url: "/otherPages/mockExamEnd/index?" +
								utils.mapToUrlQuery({
									totalScore: scorePerQuestion * that.problemList.length,
									score,
									useTime,
									questionIds: that.errQuestionIds.join(","),
									type: that.type,
									...that.query,
								}),
						});
					}
				},
				fail() { },
			});
		},
		submitExam1() {
			let score = 0;
			let query = this.query;
			let that = this;
			let scorePerQuestion = 0;
			console.log(query);

			if (this.type == 'recovery') {
				scorePerQuestion = 2
			}
			if (this.type == 'recoveryExam') {
				scorePerQuestion = 1
			}
			score = this.trueNum * scorePerQuestion;
			uni.showModal({
				title: '时间已经结束',
				content: '您的分数为' + score,
				showCancel: false,
				success(res) {
					if (res.confirm) {
						uni.navigateBack({
							delta: 1
						})
					}
				}
			})

		},
		threeCollectTopics(e) {
			let storageName = uni.getStorageSync("userInfo").xcxOpenid + "_userThreeIds_" + 9;
			let userThreeIds = uni.getStorageSync(storageName) || [];

			if (!this.problemList[this.problemListIndex].isCollect) {
				if (
					!userThreeIds.some((item) => {
						return item.id === this.problemList[this.problemListIndex].id;
					})
				) {
					userThreeIds.push({
						id: this.problemList[this.problemListIndex].id,
						timestamp: +new Date(),
					});
					uni.setStorageSync(storageName, userThreeIds);
				}
				this.$set(this.problemList[this.problemListIndex], "isCollect", true);
				uni.showToast({
					title: "收藏成功",
				});
			} else {
				if (
					userThreeIds.some((item) => {
						return item.id === this.problemList[this.problemListIndex].id;
					})
				) {
					userThreeIds.splice(
						userThreeIds.findIndex((item) => {
							return item.id == this.problemList[this.problemListIndex].id;
						}),
						1
					);
					uni.setStorageSync(storageName, userThreeIds);
				}

				this.$set(this.problemList[this.problemListIndex], "isCollect", false);
				uni.showToast({
					title: "取消收藏",
					icon: "fail",
				});
			}
		},
		collectTopics(e) {
			let storageName =
				uni.getStorageSync("userInfo").xcxOpenid +
				"_userCollectionIds_" +
				(this.query.subject || '');
			let userCollectionIds = uni.getStorageSync(storageName) || [];

			if (!this.problemList[this.problemListIndex].isCollect) {
				if (
					!userCollectionIds.some((item) => {
						return item.id === this.problemList[this.problemListIndex].id;
					})
				) {
					userCollectionIds.push({
						id: this.problemList[this.problemListIndex].id,
						timestamp: +new Date(),
					});
					uni.setStorageSync(storageName, userCollectionIds);
				}
				this.$set(this.problemList[this.problemListIndex], "isCollect", true);
				uni.showToast({
					title: "收藏成功",
				});
			} else {
				if (
					userCollectionIds.some((item) => {
						return item.id === this.problemList[this.problemListIndex].id;
					})
				) {
					userCollectionIds.splice(
						userCollectionIds.findIndex((item) => {
							return item.id === this.problemList[this.problemListIndex].id;
						}),
						1
					);
					uni.setStorageSync(storageName, userCollectionIds);
				}

				this.$set(this.problemList[this.problemListIndex], "isCollect", false);
				uni.showToast({
					title: "取消收藏",
					icon: "fail",
				});
			}

			// api.exam
			//   .studentQuestionCollection({
			//     questionId: this.problemList[this.problemListIndex].id,
			//     carType: this.gsMap[this.query.gs],
			//     km: this.query.subject === "4" ? "科目四" : "科目一",
			//   })
			//   .then((res) => {
			//     if (!this.problemList[this.problemListIndex].isCollect) {
			//       this.$set(
			//         this.problemList[this.problemListIndex],
			//         "isCollect",
			//         true
			//       );
			//       uni.showToast({
			//         title: "收藏成功",
			//       });
			//     } else {
			//       this.$set(
			//         this.problemList[this.problemListIndex],
			//         "isCollect",
			//         false
			//       );
			//       uni.showToast({
			//         title: "取消收藏",
			//         icon: "fail",
			//       });
			//     }
			//   });
		},
		readQuestionAndAnswer() {
			let globalAudio = utils.wxUtils.getGlobAudio();

			if (globalAudio) {
				globalAudio.src = this.problemList[this.problemListIndex].issuemp3;
				globalAudio.stop();
				globalAudio.play();
				globalAudio.onEnded(() => {
					globalAudio.src = this.problemList[this.problemListIndex].answermp3;
					globalAudio.stop();
					globalAudio.play();
					globalAudio.offEnded();
				});
			}
		},
		readQuestion() {
			let globalAudio = utils.wxUtils.getGlobAudio();
			if (globalAudio) {
				globalAudio.src = this.problemList[this.problemListIndex].issuemp3;
				globalAudio.stop();
				globalAudio.play();
			}
		},
		numberToLetter(index) {
			index = Number(index);
			return String.fromCharCode(index + 65);
		},
		confirmMult(e) {
			let storageName =
				uni.getStorageSync("userInfo").xcxOpenid + "_userWrongIds_" + (this.query.subject || '');
			//已做题目的key

			this.$set(this.problemList[this.problemListIndex], "isCompleted", true);
			if (
				JSON.stringify(
					this.problemList[this.problemListIndex].answer.split("-").sort()
				) === JSON.stringify(this.problemList[this.problemListIndex].userAnswer.sort())
			) {
				this.trueNum = this.trueNum + 1;
				let userDoneIds = uni.getStorageSync(storageName1) || [];
				if (userDoneIds.some((item => {
					return item.id == this.problemList[this.problemListIndex].id
				}))) {


				} else {
					userDoneIds.push({
						id: this.problemList[this.problemListIndex].id,
						timestamp: +new Date()
					})
				}
				uni.setStorageSync(storageName1, userDoneIds)
				this.$emit("update:trueNum", this.trueNum);
				setTimeout(() => {
					if (this.problemListIndex < (this.problemList.length - 1)) {
						this.$emit("update:problemListIndex", this.problemListIndex + 1);
					}

				}, 1000)
			} else {
				this.falseNum++;
				this.$emit("update:falseNum", this.falseNum);
				this.answerTipShow = true
				this.errQuestionIds.includes(this.problemList[this.problemListIndex].id) ?
					"" :
					this.errQuestionIds.push(this.problemList[this.problemListIndex].id);
				let userWrongIds = uni.getStorageSync(storageName) || [];
				if (
					!userWrongIds.some((item) => {
						return item.id === this.problemList[this.problemListIndex].id;
					})
				) {
					userWrongIds.push({
						id: this.problemList[this.problemListIndex].id,
						timestamp: +new Date(),
					});
					uni.setStorageSync(storageName, userWrongIds);
				}
				// 目前改为保存本地
				// api.exam.studentQuestionWrong({
				//   questionId: this.problemList[this.problemListIndex].id,
				//   carType: this.gsMap[this.query.gs],
				//   km: this.query.subject === "4" ? "科目四" : "科目一",
				// });
			}

			//存已经做的题目
			let storageName1 = uni.getStorageSync("userInfo").xcxOpenid + "_userDoneIds_" + (this.query.subject || '');
			let userDoneIds = uni.getStorageSync(storageName1) || [];
			if (userDoneIds.some((item => {
				return item.id == this.problemList[this.problemListIndex].id
			}))) {


			} else {
				userDoneIds.push({
					id: this.problemList[this.problemListIndex].id,
					timestamp: +new Date()
				})
			}
			uni.setStorageSync(storageName1, userDoneIds)
			// this.problemList[this.problemListIndex]
		},
		changeCheckboxGroup(e) {
			//console.log(e);
			// this.$set()
			// #ifdef MP-WEIXIN
			this.$set(this.problemList[this.problemListIndex], "userAnswer", e.detail);
			this.problemList[this.problemListIndex].optsArr.forEach((item) => {
				if (e.detail.includes(item.value)) {
					item.selected = true;
				} else {
					item.selected = false;
				}
			});
			//#endif
			// #ifdef MP-TOUTIAO
			this.$set(this.problemList[this.problemListIndex], "userAnswer", e.detail);
			this.problemList[this.problemListIndex].optsArr.forEach((item, index) => {
				if (e.detail.includes(item.value)) {
					item.selected = true;
					this.$set(
						this.problemList[this.problemListIndex].optsArr[index],
						"selected",
						true
					);
				} else {
					item.selected = false;
					this.$set(
						this.problemList[this.problemListIndex].optsArr[index],
						"selected",
						false
					);
				}
			});
			//#endif
			// if (
			//   this.problemList[this.problemListIndex].answer
			//     .split("-")
			//     .sort()
			//     .toString() ===
			//   this.problemList[this.problemListIndex].userAnswer.sort().toString()
			// ) {
			//   this.trueNum = this.trueNum + 1;
			//   this.$emit("update:trueNum", this.trueNum);
			// } else {
			//   this.falseNum = this.falseNum + 1;
			//   this.$emit("update:falseNum", this.falseNum);
			// }
			//score=1&useTime=NaN%3ANaN&questionIds=&type=&cert=C1%2FC2%2FC3&vehicle=%E8%BD%BF%E8%BD%A6&subject=1&title=%E9%A1%BA%E5%BA%8F%E7%BB%83%E4%B9%A0&liceCar=1&liceTruck=&liceBus=&liceMoto=&name=%E7%A7%91%E7%9B%AE%E4%B8%80&gs=xc&sort=3&sequeIssueName=%E7%BB%83%E4%B9%A0%E4%B8%80&__id__=3
		},
		changeRadioGroup(e) {
			console.log(e, "changeRadioGroup");
			// #ifdef MP-WEIXIN
			let storageName =
				uni.getStorageSync("userInfo").xcxOpenid + "_userWrongIds_" + (this.query.subject || '');

			this.$set(this.problemList[this.problemListIndex], "isCompleted", true);
			if (e.detail == this.problemList[this.problemListIndex].answer) {
				this.trueNum = this.trueNum + 1;
				this.$emit("update:trueNum", this.trueNum);
				setTimeout(() => {
					if (this.problemListIndex < (this.problemList.length - 1)) {
						this.$emit("update:problemListIndex", this.problemListIndex + 1);
					}

				}, 1000)


			} else {
				this.falseNum = this.falseNum + 1;
				this.answerTipShow = true
				let userWrongIds = uni.getStorageSync(storageName) || [];
				if (
					!userWrongIds.some((item) => {
						return item.id === this.problemList[this.problemListIndex].id;
					})
				) {
					userWrongIds.push({
						id: this.problemList[this.problemListIndex].id,
						timestamp: +new Date(),
					});
					uni.setStorageSync(storageName, userWrongIds);
				}

				//目前改为保存在本地,降低服务器压力
				// api.exam.studentQuestionWrong({
				//   questionId: this.problemList[this.problemListIndex].id,
				//   carType: this.gsMap[this.query.gs],
				//   km: this.query.subject === "4" ? "科目四" : "科目一",
				// });
				this.$emit("update:falseNum", this.falseNum);
				this.errQuestionIds.includes(this.problemList[this.problemListIndex].id) ?
					"" :
					this.errQuestionIds.push(this.problemList[this.problemListIndex].id);
				console.log(this.errQuestionIds);
			}
			this.$set(this.problemList[this.problemListIndex], "userAnswer", e.detail);
			this.optsArr = this.problemList[this.problemListIndex].optsArr.map((item) => {
				item.selected = item.value == e.detail;
			});

			//存已经做的题目
			let storageName1 = uni.getStorageSync("userInfo").xcxOpenid + "_userDoneIds_" + (this.query.subject || '');
			let userDoneIds = uni.getStorageSync(storageName1) || [];
			if (userDoneIds.some((item => {
				return item.id == this.problemList[this.problemListIndex].id
			}))) {


			} else {
				userDoneIds.push({
					id: this.problemList[this.problemListIndex].id,
					timestamp: +new Date()
				})
			}
			uni.setStorageSync(storageName1, userDoneIds)

			// e.detail.value === this.problemList[this.problemListIndex].answer
			//   ? (this.trueNum = this.trueNum + 1)
			//   : (this.falseNum = this.falseNum + 1);
			//#endif
		},
	},
	filters: {
		questionType: function (value) {
			let question = "";
			switch (value) {
				case 1:
				case "1":
					question = "判断题";
					break;
				case 2:
				case "2":
					question = "单选题";
					break;
				case 3:
				case "3":
					question = "多选题";
					break;
			}
			return question;
		},
	},
	components: {
		mRadio,
		mRadioGroup,
		mCheckbox,
		mCheckboxGroup,
		explainJq,
		tabbar,
		explainJs,
		funList,
		answerTip,
		countDown,
	},
	computed: {
		isVip(){
			return 1
		}

	},
	props: {
		midFunc: {
			type: Array,
			default: () => {
				return [];
			},
		},
		bottomFunc: {
			type: Array,
			default: () => {
				return [];
			},
		},
		hiddenAnswer: {
			type: Boolean,
			default: false,
		},
		allowMemory: {
			type: Boolean,
			default: false,
		},
		hiddenFunction: {
			type: Boolean,
			default: false,
		},
		hiddenMode: {
			type: Boolean,
			default: false,
		},
		problemListTotal: {
			type: Number,
			default: 0,
		},
		query: {
			type: Object,
			default: () => {
				return {};
			},
		},
		type: {
			type: String,
			default: "",
		},
		problemListIndex: {
			type: Number,
			default: 0,
		},
	},
	mounted() {

		let that = this;
		console.log(this.query, 'kemu:', this.query.subject)
		//初始化部分变量
		this.trueNum = 0
		this.falseNum = 0

		let storageName = "";
		uni.showLoading({
			title: "加载题目中",
		});
		//记忆题目
		let key = `${uni.getStorageSync("userInfo").xcxOpenid}_${this.query.cert}_${this.query.subject == 1 ? "科目一" : "科目四"
			}_${this.query.title}_${this.query.classIssueName ||
			this.query.placeIssueName ||
			this.query.excellIssueName ||
			this.query.sequeIssueName
			}`;
		// if (this.allowMemory && uni.getStorageSync(key)) {
		//   uni.showModal({
		//     title:"回到上次的题目",
		//     content:`你上次做到第${uni.getStorageSync(key)}题,是否前往`,
		//     success(res){
		//       if(res.confirm){
		//         this.problemListIndex = Number(uni.getStorageSync(key))
		//       }
		//     }
		//   })

		// }
		let ids = [];
		switch (that.type) {
			case "specifyYdt":
				api.exam
					.studentQuestion2InfoGetQuestionInfoByYdtIds({
						ids: this.query.questionIds.split(","),
					})
					.then((res) => {
						res.rows.forEach((element) => {
							element.optsArr = [];
							element.isCollect = false;
							element.opts.split("-").forEach((item, index) => {
								if (element.questionType == 3) {
									element.optsArr.push({
										selected: false,
										value: item,
										index: index,
										isAnswer: element.answer.split("-").includes(item),
									});
								} else {
									element.optsArr.push({
										selected: false,
										value: item,
										index: index,
										isAnswer: item === element.answer,
									});
								}
							});
							element.isCompleted = false;
							element.userAnswer = [];
						});
						that.problemListTotal = res.total;
						origProblemList = JSON.parse(JSON.stringify(res.rows));
						that.problemList = res.rows;
						that.$emit("update:problemListTotal", res.total);
						uni.hideLoading();
						if (this.allowMemory && uni.getStorageSync(key)) {
							uni.showModal({
								title: "回到上次的题目",
								content: `你上次做到第${uni.getStorageSync(key) + 1}题,是否前往`,
								success: (res) => {
									if (res.confirm) {
										this.$emit("update:problemListIndex", uni.getStorageSync(key));
									} else {
										uni.setStorageSync(key, 0);
									}
								},
							});
						}
					});


				break;
			case "reality":
				api.exam
					.studentQuestion2InfoSelectQuestionInfoFiveByQuestionDb({
						...this.query
					})
					.then((res) => {
						res.rows.forEach((element) => {
							element.optsArr = [];
							element.isCollect = false;
							element.opts.split("-").forEach((item, index) => {
								if (element.questionType == 3) {
									element.optsArr.push({
										selected: false,
										value: item,
										index: index,
										isAnswer: element.answer.split("-").includes(item),
									});
								} else {
									element.optsArr.push({
										selected: false,
										value: item,
										index: index,
										isAnswer: item === element.answer,
									});
								}
							});
							element.isCompleted = false;
							element.userAnswer = [];
						});
						that.problemListTotal = res.total;
						origProblemList = JSON.parse(JSON.stringify(res.rows));
						that.problemList = res.rows;
						that.$emit("update:problemListTotal", res.total);
						uni.hideLoading();
						if (this.allowMemory && uni.getStorageSync(key)) {
							uni.showModal({
								title: "回到上次的题目",
								content: `你上次做到第${uni.getStorageSync(key) + 1}题,是否前往`,
								success: (res) => {
									if (res.confirm) {
										this.$emit("update:problemListIndex", uni.getStorageSync(key));
									} else {
										uni.setStorageSync(key, 0);
									}
								},
							});
						}
					});
				break;
			case "reality4":
				api.exam
					.studentQuestion2InfoSelectQuestionInfoK4ThreeAll()
					.then((res) => {
						res.rows.forEach((element) => {
							element.optsArr = [];
							element.isCollect = false;
							element.opts.split("-").forEach((item, index) => {
								if (element.questionType == 3) {
									element.optsArr.push({
										selected: false,
										value: item,
										index: index,
										isAnswer: element.answer.split("-").includes(item),
									});
								} else {
									element.optsArr.push({
										selected: false,
										value: item,
										index: index,
										isAnswer: item === element.answer,
									});
								}
							});
							element.isCompleted = false;
							element.userAnswer = [];
						});
						that.problemListTotal = res.total;
						origProblemList = JSON.parse(JSON.stringify(res.rows));
						that.problemList = res.rows;
						that.$emit("update:problemListTotal", res.total);
						uni.hideLoading();
						if (this.allowMemory && uni.getStorageSync(key)) {
							uni.showModal({
								title: "回到上次的题目",
								content: `你上次做到第${uni.getStorageSync(key) + 1}题,是否前往`,
								success: (res) => {
									if (res.confirm) {
										this.$emit("update:problemListIndex", uni.getStorageSync(key));
									} else {
										uni.setStorageSync(key, 0);
									}
								},
							});
						}
					});
				break;
			case "reality1":
				api.exam
					.studentQuestion2InfoSelectQuestionInfoFiveAll()
					.then((res) => {
						res.rows.forEach((element) => {
							element.optsArr = [];
							element.isCollect = false;
							element.opts.split("-").forEach((item, index) => {
								if (element.questionType == 3) {
									element.optsArr.push({
										selected: false,
										value: item,
										index: index,
										isAnswer: element.answer.split("-").includes(item),
									});
								} else {
									element.optsArr.push({
										selected: false,
										value: item,
										index: index,
										isAnswer: item === element.answer,
									});
								}
							});
							element.isCompleted = false;
							element.userAnswer = [];
						});
						that.problemListTotal = res.total;
						origProblemList = JSON.parse(JSON.stringify(res.rows));
						that.problemList = res.rows;
						that.$emit("update:problemListTotal", res.total);
						uni.hideLoading();
						if (this.allowMemory && uni.getStorageSync(key)) {
							uni.showModal({
								title: "回到上次的题目",
								content: `你上次做到第${uni.getStorageSync(key) + 1}题,是否前往`,
								success: (res) => {
									if (res.confirm) {
										this.$emit("update:problemListIndex", uni.getStorageSync(key));
									} else {
										uni.setStorageSync(key, 0);
									}
								},
							});
						}
					});
				break;
			case "recoveryExam":
				api.exam
					.studentQuestion2InfoSelectTestMfQuestionInfoList2({
						model: this.query.model
					})
					.then((res) => {
						res.rows.forEach((element) => {
							element.optsArr = [];
							element.isCollect = false;
							element.opts.split("-").forEach((item, index) => {
								if (element.questionType == 3) {
									element.optsArr.push({
										selected: false,
										value: item,
										index: index,
										isAnswer: element.answer.split("-").includes(item),
									});
								} else {
									element.optsArr.push({
										selected: false,
										value: item,
										index: index,
										isAnswer: item === element.answer,
									});
								}
							});
							element.isCompleted = false;
							element.userAnswer = [];
						});
						that.problemListTotal = res.total;
						origProblemList = JSON.parse(JSON.stringify(res.rows));
						that.problemList = res.rows;
						that.$emit("update:problemListTotal", res.total);
						uni.hideLoading();
						if (this.allowMemory && uni.getStorageSync(key)) {
							uni.showModal({
								title: "回到上次的题目",
								content: `你上次做到第${uni.getStorageSync(key) + 1}题,是否前往`,
								success: (res) => {
									if (res.confirm) {
										this.$emit("update:problemListIndex", uni.getStorageSync(key));
									} else {
										uni.setStorageSync(key, 0);
									}
								},
							});
						}
					});
				break;
			case "recovery":
				api.exam
					.studentQuestion2InfoSelectTestMfQuestionInfoList2({
						model: this.query.model
					})
					.then((res) => {
						res.rows.forEach((element) => {
							element.optsArr = [];
							element.isCollect = false;
							element.opts.split("-").forEach((item, index) => {
								if (element.questionType == 3) {
									element.optsArr.push({
										selected: false,
										value: item,
										index: index,
										isAnswer: element.answer.split("-").includes(item),
									});
								} else {
									element.optsArr.push({
										selected: false,
										value: item,
										index: index,
										isAnswer: item === element.answer,
									});
								}
							});
							element.isCompleted = false;
							element.userAnswer = [];
						});
						that.problemListTotal = res.total;
						origProblemList = JSON.parse(JSON.stringify(res.rows));
						that.problemList = res.rows;
						that.$emit("update:problemListTotal", res.total);
						uni.hideLoading();
						if (this.allowMemory && uni.getStorageSync(key)) {
							uni.showModal({
								title: "回到上次的题目",
								content: `你上次做到第${uni.getStorageSync(key) + 1}题,是否前往`,
								success: (res) => {
									if (res.confirm) {
										this.$emit("update:problemListIndex", uni.getStorageSync(key));
									} else {
										uni.setStorageSync(key, 0);
									}
								},
							});
						}
					});
				break;
			case "specify":
				api.exam
					.studentQuestion2InfoGetQuestionInfoByIds({
						ids: this.query.questionIds.split(","),
					})
					.then((res) => {
						res.rows.forEach((element) => {
							element.optsArr = [];
							element.isCollect = false;
							element.opts.split("-").forEach((item, index) => {
								if (element.questionType == 3) {
									element.optsArr.push({
										selected: false,
										value: item,
										index: index,
										isAnswer: element.answer.split("-").includes(item),
									});
								} else {
									element.optsArr.push({
										selected: false,
										value: item,
										index: index,
										isAnswer: item === element.answer,
									});
								}
							});
							element.isCompleted = false;
							element.userAnswer = [];
						});
						that.problemListTotal = res.total;
						origProblemList = JSON.parse(JSON.stringify(res.rows));
						that.problemList = res.rows;
						that.$emit("update:problemListTotal", res.total);
						uni.hideLoading();
						if (this.allowMemory && uni.getStorageSync(key)) {
							uni.showModal({
								title: "回到上次的题目",
								content: `你上次做到第${uni.getStorageSync(key) + 1}题,是否前往`,
								success: (res) => {
									if (res.confirm) {
										this.$emit("update:problemListIndex", uni.getStorageSync(key));
									} else {
										uni.setStorageSync(key, 0);
									}
								},
							});
						}
					});

				break;
			case "exam":
				api.exam
					.studentQuestion2InfoSelectTestQuestionInfo({
						model: this.query.model,
						subject: this.query.subject,
					})
					.then((res) => {
						res.data.forEach((element) => {
							element.optsArr = [];
							element.isCollect = false;
							element.opts.split("-").forEach((item, index) => {
								if (element.questionType == 3) {
									element.optsArr.push({
										selected: false,
										value: item,
										index: index,
										isAnswer: element.answer.split("-").includes(item),
									});
								} else {
									element.optsArr.push({
										selected: false,
										value: item,
										index: index,
										isAnswer: item === element.answer,
									});
								}
							});
							element.isCompleted = false;
							element.userAnswer = [];
						});
						that.problemListTotal = res.total;
						origProblemList = JSON.parse(JSON.stringify(res.data));

						that.problemList = res.data;

						that.$emit("update:problemListTotal", res.total);
						uni.hideLoading();
						if (this.allowMemory && uni.getStorageSync(key)) {
							uni.showModal({
								title: "回到上次的题目",
								content: `你上次做到第${uni.getStorageSync(key) + 1}题,是否前往`,
								success: (res) => {
									if (res.confirm) {
										this.$emit("update:problemListIndex", uni.getStorageSync(key));
									} else {
										uni.setStorageSync(key, 0);
									}
								},
							});
						}
					});

				break;
			case "free":
				api.open
					.questionInfoSelectFreeQuestionInfo({
						...this.query,
					})
					.then((res) => {
						res.rows.forEach((element) => {
							element.optsArr = [];
							element.opts.split("-").forEach((item, index) => {
								if (element.questionType == 3) {
									element.optsArr.push({
										selected: false,
										value: item,
										index: index,
										isAnswer: element.answer.split("-").includes(item),
									});
								} else {
									element.optsArr.push({
										selected: false,
										value: item,
										index: index,
										isAnswer: item === element.answer,
									});
								}
							});
							element.isCompleted = false;
							element.userAnswer = [];
						});
						that.problemList = res.rows;
						origProblemList = JSON.parse(JSON.stringify(res.rows));
						that.problemListTotal = res.total;
						uni.hideLoading();
					});

				break;
			case "wrong":
				//studentQuestionWrongWrongByUser(废弃)
				storageName =
					uni.getStorageSync("userInfo").xcxOpenid +
					"_userWrongIds_" +
					(that.query.subject || '');
				if (that.query.orderBy == "asc") {
					ids = uni.getStorageSync(storageName) ?
						uni.getStorageSync(storageName).map((item) => {
							return item.id;
						}) :
						null;
				} else if (that.query.orderBy == "desc") {
					ids = uni.getStorageSync(storageName) ?
						uni
							.getStorageSync(storageName)
							.map((item) => {
								return item.id;
							})
							.reverse() :
						null;
				}
				api.exam
					.studentQuestion2InfoGetQuestionInfoByIds({
						ids,
					})
					.then((res) => {
						console.log(res);
						res.rows.forEach((element) => {
							element.optsArr = [];
							element.opts.split("-").forEach((item, index) => {
								if (element.questionType == 3) {
									element.optsArr.push({
										selected: false,
										value: item,
										index: index,
										isAnswer: element.answer.split("-").includes(item),
									});
								} else {
									element.optsArr.push({
										selected: false,
										value: item,
										index: index,
										isAnswer: item === element.answer,
									});
								}
							});
							element.isCompleted = false;
							element.userAnswer = [];
						});
						that.problemListTotal = res.total;
						that.problemList = res.rows;
						origProblemList = JSON.parse(JSON.stringify(res.rows));
						that.$emit("update:problemListTotal", res.rows.length);

						uni.hideLoading();
					});

				break;
			case "color":
				api.exam.studentQuestionSeList().then((res) => {
					if (Array.isArray(res.rows) && res.rows.length > 0) {
						res.rows.forEach((element) => {
							element.optsArr = [];
							element.opts.split("-").forEach((item, index) => {
								if (element.questionType == 3) {
									element.optsArr.push({
										selected: false,
										value: item,
										index: index,
										isAnswer: element.answer.split("-").includes(
											item),
									});
								} else {
									element.optsArr.push({
										selected: false,
										value: item,
										index: index,
										isAnswer: item === element.answer,
									});
								}
							});
							element.isCompleted = false;
							element.isCollect = false;
							element.userAnswer = [];
						});
						that.problemListTotal = res.total;
						that.problemList = res.rows;
					}
					uni.hideLoading();
				});

				break;
			case "collect":
				storageName =
					uni.getStorageSync("userInfo").xcxOpenid +
					"_userCollectionIds_" +
					(that.query.subject || '');
				if (that.query.orderBy == "asc") {
					ids = uni.getStorageSync(storageName) ?
						uni.getStorageSync(storageName).map((item) => {
							return item.id;
						}) :
						null;
				} else if (that.query.orderBy == "desc") {
					ids = uni.getStorageSync(storageName) ?
						uni
							.getStorageSync(storageName)
							.map((item) => {
								return item.id;
							})
							.reverse() :
						null;
				}

				api.exam
					.studentQuestion2InfoGetQuestionInfoByIds({
						ids,
					})
					.then((res) => {
						console.log(res);
						res.rows.forEach((element) => {
							element.optsArr = [];
							element.opts.split("-").forEach((item, index) => {
								if (element.questionType == 3) {
									element.optsArr.push({
										selected: false,
										value: item,
										index: index,
										isAnswer: element.answer.split("-").includes(item),
									});
								} else {
									element.optsArr.push({
										selected: false,
										value: item,
										index: index,
										isAnswer: item === element.answer,
									});
								}
							});
							element.isCompleted = false;
							element.isCollect = true;
							element.userAnswer = [];
						});
						that.problemListTotal = res.total;
						that.problemList = res.rows;
						origProblemList = JSON.parse(JSON.stringify(res.rows));
						that.$emit("update:problemListTotal", res.rows.length);

						uni.hideLoading();
					});

				break;
			case "three":
				api.exam
					.studentQuestion2InfoList({
						subject: 9,
					})
					.then((res) => {
						if (Array.isArray(res.rows) && res.rows.length > 0) {
							res.rows.forEach((element) => {
								element.optsArr = [];
								element.opts.split("-").forEach((item, index) => {
									if (element.questionType == 3) {
										element.optsArr.push({
											selected: false,
											value: item,
											index: index,
											isAnswer: element.answer.split("-").includes(
												item),
										});
									} else {
										element.optsArr.push({
											selected: false,
											value: item,
											index: index,
											isAnswer: item === element.answer,
										});
									}
								});
								element.isCompleted = false;
								element.isCollect = false;
								element.userAnswer = [];
							});
							this.problemList = res.rows;
							let key = `${uni.getStorageSync("userInfo").xcxOpenid}_threeExam_${this.query.subject
								}`;
							if (uni.getStorageSync(key)) {
								uni.showModal({
									title: "回到上次的题目",
									content: `你上次做到第${uni.getStorageSync(key) + 1}题,是否前往`,
									success: (res) => {
										if (res.confirm) {
											this.problemListIndex = Number(uni.getStorageSync(key));
											// this.$emit(
											//   "update:problemListIndex",
											//   uni.getStorageSync(key)
											// );
										} else {
											uni.setStorageSync(key, 0);
										}
									},
								});
							}
						} else {
							uni.showToast({
								icon: "error",
								title: "加载失败",
							});
						}
						uni.hideLoading();
					});
				break;
			case "threeSelect":
				api.exam
					.studentQuestion2InfoSelectTestSanliQuestionInfoList()
					.then((res) => {
						if (Array.isArray(res.rows) && res.rows.length > 0) {
							res.rows.forEach((element) => {
								element.optsArr = [];
								element.opts.split("-").forEach((item, index) => {
									if (element.questionType == 3) {
										element.optsArr.push({
											selected: false,
											value: item,
											index: index,
											isAnswer: element.answer.split("-").includes(
												item),
										});
									} else {
										element.optsArr.push({
											selected: false,
											value: item,
											index: index,
											isAnswer: item === element.answer,
										});
									}
								});
								element.isCompleted = false;
								element.isCollect = false;
								element.userAnswer = [];
							});
							this.problemList = res.rows;
							let key = `${uni.getStorageSync("userInfo").xcxOpenid}_threeExam_${this.query.subject
								}`;
							if (uni.getStorageSync(key)) {
								uni.showModal({
									title: "回到上次的题目",
									content: `你上次做到第${uni.getStorageSync(key) + 1}题,是否前往`,
									success: (res) => {
										if (res.confirm) {
											this.problemListIndex = Number(uni.getStorageSync(key));
											// this.$emit(
											//   "update:problemListIndex",
											//   uni.getStorageSync(key)
											// );
										} else {
											uni.setStorageSync(key, 0);
										}
									},
								});
							}
						} else {
							uni.showToast({
								icon: "error",
								title: "加载失败",
							});
						}
						uni.hideLoading();
					});
				break;
			case "mi":
				api.exam
					.studentQuestion2InfoSelectMiQuestionInfoList({
						sortNum: this.query.sortNum,
						model: this.query.model,

						subject: this.query.subject,
					})
					.then((res) => {
						console.log(res);
						res.rows.forEach((element) => {
							element.optsArr = [];
							element.opts.split("-").forEach((item, index) => {
								if (element.questionType == 3) {
									element.optsArr.push({
										selected: false,
										value: item,
										index: index,
										isAnswer: element.answer.split("-").includes(item),
									});
								} else {
									element.optsArr.push({
										selected: false,
										value: item,
										index: index,
										isAnswer: item === element.answer,
									});
								}
							});
							element.isCompleted = false;
							element.userAnswer = [];
						});
						that.problemListTotal = res.total;
						that.problemList = res.rows;
						origProblemList = JSON.parse(JSON.stringify(res.rows));
						that.$emit("update:problemListTotal", res.rows.length);

						uni.hideLoading();
					});

				break;
			case "threeCollect":
				storageName = uni.getStorageSync("userInfo").xcxOpenid + "_userThreeIds_" + 9;
				if (that.query.orderBy == "asc") {
					ids = uni.getStorageSync(storageName) ?
						uni.getStorageSync(storageName).map((item) => {
							return item.id;
						}) :
						null;
				} else if (that.query.orderBy == "desc") {
					ids = uni.getStorageSync(storageName) ?
						uni
							.getStorageSync(storageName)
							.map((item) => {
								return item.id;
							})
							.reverse() :
						null;
				}

				api.exam
					.studentQuestion2InfoGetQuestionInfoByIds({
						ids: uni.getStorageSync(storageName) ?
							uni.getStorageSync(storageName).map((item) => {
								return item.id;
							}) : null,
					})
					.then((res) => {
						console.log(res);
						res.rows.forEach((element) => {
							element.optsArr = [];
							element.opts.split("-").forEach((item, index) => {
								if (element.questionType == 3) {
									element.optsArr.push({
										selected: false,
										value: item,
										index: index,
										isAnswer: element.answer.split("-").includes(item),
									});
								} else {
									element.optsArr.push({
										selected: false,
										value: item,
										index: index,
										isAnswer: item === element.answer,
									});
								}
							});
							element.isCompleted = false;
							element.userAnswer = [];
							element.isCollect = true;
						});
						that.problemListTotal = res.total;
						that.problemList = res.rows;
						origProblemList = JSON.parse(JSON.stringify(res.rows));
						that.$emit("update:problemListTotal", res.rows.length);

						uni.hideLoading();
					});
				break;
			default:
				api.exam
					.studentQuestion2InfoList({
						...that.query,
					})
					.then((res) => {
						res.rows.forEach((element) => {
							element.optsArr = [];
							element.opts.split("-").forEach((item, index) => {
								if (element.questionType == 3) {
									element.optsArr.push({
										selected: false,
										value: item,
										index: index,
										isAnswer: element.answer.split("-").includes(item),
									});
								} else {
									element.optsArr.push({
										selected: false,
										value: item,
										index: index,
										isAnswer: item === element.answer,
									});
								}
							});
							element.isCompleted = false;
							element.userAnswer = [];
						});
						that.problemListTotal = res.total;
						that.problemList = res.rows;
						origProblemList = JSON.parse(JSON.stringify(res.rows));
						that.$emit("update:problemListTotal", res.total);
						uni.hideLoading();
						if (this.allowMemory && uni.getStorageSync(key)) {
							uni.showModal({
								title: "回到上次的题目",
								content: `你上次做到第${uni.getStorageSync(key) + 1}题,是否前往`,
								success: (res) => {
									if (res.confirm) {
										this.$emit("update:problemListIndex", uni.getStorageSync(key));
									} else {
										uni.setStorageSync(key, 0);
									}
								},
							});
						}
					});
				break;
		}
	},
};
</script>
<style>
.pt15 {
	padding-left: 15rpx;
}

.pb15 {
	padding-bottom: 15rpx;
}

.mt15 {
	margin-top: 15rpx;
}

.mb15 {
	margin-bottom: 15rpx;
}

#watermark {
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
}
</style>
<style lang="scss" scoped>
.atip {
	background-color: #fff;

	.line1 {
		display: flex;
		justify-content: space-between;
		align-items: center;
		align-content: center;
		font-size: 38rpx;
		padding-top: 40rpx;
		padding-left: 15rpx;
	}

	.line2 {
		display: flex;
		justify-content: space-between;
		align-items: center;
		align-content: center;
		font-size: 38rpx;
		padding-right: 15rpx;
		padding-left: 15rpx;
		padding-top: 16rpx;
	}

	.line3 {
		display: flex;
		padding-left: 15rpx;
		padding-top: 40rpx;
		align-items: center;
		align-content: center;
		font-size: 38rpx;
	}

	.line4 {
		display: flex;
		padding-left: 15rpx;
		padding-bottom: 40rpx;
		align-items: center;
		align-content: center;
		font-size: 38rpx;
	}

}

.ajs {
	.line1 {
		display: flex;
		justify-content: center;
		font-size: 38rpx;
		align-items: center;
		align-content: center;
	}

	.line2 {
		padding-top: 20rpx;
		padding-left: 15rpx;
		padding-right: 15rpx;
		font-size: 38rpx;
		padding-bottom: 90rpx;
	}

}

.m-do-topic {
	padding-bottom: constant(safe-area-inset-bottom);
	padding-bottom: env(safe-area-inset-bottom);
}

.problem-lh {
	line-height: 1.3;
	vertical-align: bottom;
}

.problem-fontsize {
	font-size: $uni-app-fontsize-topic;
}

.pb80px {
	padding-bottom: 80px;
}

.pb50px {
	padding-bottom: 50px;
}

.pl30 {
	padding-left: 30rpx;
}

.custom-tabbar {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	background: #fff;
	padding-bottom: constant(safe-area-inset-bottom);
	/*兼容 IOS<11.2*/
	box-sizing: content-box;
	padding-bottom: env(safe-area-inset-bottom);

	.ipone-bottom {
		/*兼容 IOS>11.2*/
		display: flex;
		flex-direction: wrap;
		height: 50px;
		width: 100%;
	}

	.custom-tabbar-item {
		flex: 1;
		height: 50px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		font-size: 26rpx;
	}
}

.submit {
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	padding-top: 8rpx;

	.submit-button {
		width: 60%;
		background: #3AC770;
		color: #fff;
		text-align: center;
		line-height: 30px;
		height: 30px;
		border-radius: 20rpx;
	}
}

.jqIcon {
	position: absolute;
	top: -15rpx;
	left: 50%;
	transform: translate(-50%, -40%);
	width: 166rpx;
	height: 166rpx;
	z-index: 10;
}

.answer {
	padding-left: 16rpx;
	padding-bottom: 16rpx;
	padding-top: 16rpx;

	>view {
		padding-left: 16rpx;
		background: #d8d8d8;
		padding-bottom: 8rpx;
		padding-top: 8rpx;
	}
}

.pb16 {
	padding-bottom: 16rpx;
}

.mode {
	display: flex;
	padding: 20rpx 30rpx;
	justify-content: space-between;
	border-top: 2rpx solid #d8d8d8;

	.mode-item {
		width: auto;

		font-size: $uni-app-fontsize-paragraph;

		background: #fff;
		color: #3AC770;
		text-align: center;
		border-radius: 32rpx;
		border: 1px solid #3AC770;
		padding-left: 8rpx;
		padding-right: 8rpx;
	}

	.mode-item_select {
		color: #fff;
		background: #3AC770;
	}
}

.divider {
	width: 100%;
	height: 24rpx;
	background-color: #f2f3f5;
}

.select-problem {
	display: flex;
	width: 100vw;
	height: 100vh;
	align-content: flex-end;
	align-items: flex-end;

	.problem-index {
		width: 100vw;
		height: 650rpx;
		background: #fff;
		border-top-right-radius: 16rpx;
		border-top-left-radius: 16rpx;
		padding-top: 50rpx;
		-webkit-overflow-scrolling: touch;
	}

	.problem-bottom {
		width: 100%;
		display: flex;
		height: 80rpx;

		.problem-bottom-sure {
			width: 50%;
			height: 100%;
			border-right: 2rpx solid #d8d8d8;
			border-top: 2rpx solid #d8d8d8;
			text-align: center;
			color: #3AC770;
			line-height: 80rpx;
		}

		.problem-bottom-close {
			width: 100%;
			height: 100%;
			color: red;
			text-align: center;
			border-top: 2rpx solid #d8d8d8;
			line-height: 80rpx;
		}
	}

	.problem-header {
		display: flex;
		justify-content: space-between;
		align-content: center;
		align-items: center;
		padding: 0rpx 30rpx;

		.problem-header-left {
			display: flex;

			.problem-dui {
				display: flex;
				align-content: center;
				align-items: center;
			}

			.problem-cuo {
				display: flex;
				align-content: center;
				align-items: center;
			}
		}

		.problem-header-right {
			display: flex;
			align-content: center;
		}
	}

	.problem-body {
		height: 480rpx;
		padding-top: 30rpx;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;

		.problem-listBody {
			display: inline-block;
			overflow-y: scroll;
			-webkit-overflow-scrolling: touch;

			.problem-listItem {
				display: inline-block;
				width: 99rpx;
				height: 99rpx;
				line-height: 100rpx;
				text-align: center;
				border-radius: 50%;
				border: 2rpx #d8d8d8 solid;
				margin-bottom: 15rpx;
				margin-left: 13rpx;
				margin-right: 13rpx;
				font-size: 40rpx;
			}

			.problem-listItem_current {
				background: rgba(138, 144, 153, 0.15);
				border-color: #bfbfbf;
				color: #5c6066;
			}

			.problem-listItem_dui {
				background: #c1e6db;
				color: #4eb79a;
				border-color: #4eb79a;
			}

			.problem-listItem_cuo {
				background: #ffbcbe;
				color: #e65055;
				border-color: #e65055;
			}
		}
	}
}

.tabbar-item {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	text-align: center;
	align-content: space-around;
	align-items: space-around;
}

.mt30 {
	margin-top: 30rpx;
}

.flex-center {
	display: flex;
	justify-content: center;
}

.problem-box {
	padding-top: 15rpx;
	padding-left: 15rpx;
	padding-right: 15rpx;

	background: #fff;
	position: relative;

	.new-rule {
		color: red;
		font-size: 16rpx;
	}

	::v-deep .van-checkbox {
		padding-bottom: 15rpx;
	}

	::v-deep .van-radio {
		padding-bottom: 15rpx;
	}

	.problem-issue {
		font-size: $uni-app-fontsize-topic;
		font-weight: 500;
	}

	.problem-select {
		display: flex;
		align-content: center;
		align-items: center;
		padding-top: 16rpx;
		padding-bottom: 16rpx;
	}

	.problem-type {
		padding-left: 10rpx;
		padding-right: 10rpx;
		padding-top: 4rpx;
		padding-bottom: 4rpx;
		font-size: 24rpx;
		border-radius: 16rpx 16rpx 0 16rpx;
		background: #3AC770;
		margin-right: 10rpx;
		color: #fff;
		font-size: 32rpx;
	}

	.problem-ops {
		margin-top: 30rpx;
		padding-left: 30rpx;
		font-size: $uni-app-fontsize-paragraph;

		.problem-checkbox {
			// min-height: 100rpx;
			padding-bottom: 30rpx;
			box-sizing: border-box;
		}
	}

	.problem-op {
		width: 75rpx;
		height: 75rpx;
		line-height: 75rpx;
		border-radius: 50%;
		text-align: center;
		overflow: hidden;
		background: #fff;
		box-shadow: 0px 4rpx 12rpx rgba(0, 0, 0, 0.16);
	}

	.problem-op_green {
		width: 75rpx;
		height: 75rpx;
		line-height: 75rpx;
		border-radius: 50%;
		text-align: center;
		overflow: hidden;
		background: #01c18d;
		color: #fff;
		box-shadow: 0px 4rpx 12rpx rgba(0, 0, 0, 0.16);
	}

	.problem-op_selected {
		background: #3AC770;
	}

	.problem-opAnswer {
		color: #333;
	}

	.problem-opAnswer_correct {
		color: #01c18d;

	}

	.problem-opAnswer_error {
		color: red;

	}

	.problem-img {
		width: 100%;
		margin-top: 20rpx;
		display: flex;
		justify-content: center;
		position: relative;

		image {
			margin: 0 auto;
		}
	}
}

.funcicon-list {
	width: 100%;
	display: flex;
	font-size: $uni-app-fontsize-paragraph;
	margin-top: 16rpx;

	.funcicon-item {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 0 20rpx;
		height: 48rpx;
		line-height: 48rpx;
		border: 2rpx solid #8a9099;
		border-radius: 20rpx;
		margin-left: 10rpx;
		color: #8a9099;
	}

	.funcicon-item_select {
		border-color: #3AC770;
		color: #3AC770;
	}
}

.function-list {
	width: 100%;
	font-size: $uni-app-fontsize-paragraph;
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
	padding: 8px;
	box-sizing: border-box;
	border-top: 2rpx solid #d8d8d8;

	.function-item {
		margin-bottom: 20px;
		width: 20%;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: $uni-app-fontsize-paragraph;
		font-weight: 400;
		color: #8a9099;
		white-space: nowrap;

		span {
			margin-top: 5px;
		}
	}
}
</style>