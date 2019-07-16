<!--
	使用该组件需要再index.html 中引入EXEStarter.js
	<script type="text/javascript" src="./static/js/EXEStarter.js" charset="utf-8"></script>
-->
<template>
	<div class="video-call">
		<div class="start-exe exe-remind" v-if="isLoading">正在启动客户端，请稍候....</div>
		<div class="exe-remind" v-if="isNoExe">检测未安装客户端，请【<a href="javascript:void(0)" @click="onDownloadButtonClick">下载</a>】安装</div>
		<el-button size="small" type="primary" @click="getRoomInfo">发起视频通话</el-button>
	</div>
</template>

<script>
	import {RoomServerDomain, ListServerDoMain} from './js/config'
	import WebListOpt from './js/WebListOpt'
	import controller from '@/controllers/videocontrollers'

	export default {
		props: {
			doctorId: {
				type: String | Number,
				default: 2
			},
			doctorName: {
				type: String,
				default: '贾医生'
			},

			patientName: {
				type: String,
				default: 'patientName'
			},
			storeId: {
				type: String | Number,
				default: 2
			}
		},
		data () {
			return {
				RoomTypeID: WebListOpt.webexe_roomtype.DoubleRoom,
				// RoomTypeID: WebListOpt.webexe_roomtype.LiveRoom,
				loginInfo: {
					sdkAppID: '',
					userSig: ''
				},
				hasReLoginRoom: false,

				patientId: new Date().getTime().toString(),
				roomInfo: null,
				token: null,

				isLoading: false,
				isNoExe: false
			}
		},
		mounted() {

		},
		methods: {
			onDownloadButtonClick () {
				window.open(EnumDef.EXEUrl)
				this.isLoading = false
				this.isNoExe = false
			},
			getRoomId () {
				const num = Math.floor(Math.random() * 9000) + 1000
				let time = new Date().getTime().toString()
				time = time.substr(time.length - 10, time.length)
				return time.toString() + num.toString()
			},
			async getRoomInfo () {
				const roomId = this.getRoomId()
				let { data } = await controller.getUserSig({
					doctorId: this.doctorId,
					doctorName: this.doctorName,
					originatorType: 1,
					patientId: this.patientId,
					storeId: this.storeId,
					roomId: roomId
				}).then(res => res)
				data.sdkAppId = parseInt(data.sdkAppId)
				this.roomInfo = data
				this.$set(this.roomInfo, 'roomId', roomId)
				this.login(this.roomInfo)
			},
			initRoom (data) {
				this.isLoading = true

				WebListOpt.initRoom({
					data: {
						userID: this.patientId,
						userName: this.patientName,
						sdkAppID: data.sdkAppId,
						userSig: data.userSig,
						accType: data.accountType,
						roomType: this.RoomTypeID,
						privateMapKey: data.privateMapKey,
						pushURL: CloudRecordUrl,
						roomServerDoMain: RoomServerDomain,
						listServerDoMain: ListServerDoMain
					},
				})
			},
			listerRoom () {
				WebListOpt.setListener({
					onRecvCmd: (roomID, cmd) => { },
					onRoomClose: (ret) => {
						this.isLoading = false
						this.isNoExe = false
						this.$message.error("视频已关闭【errMsg:" + ret.data.msg + "】");
					}
				})
			},

			async login (data) {
				let res = await controller.loginRoom({
					userID: this.patientId,
					sdkAppID: data.sdkAppId.toString(),
					userSig: data.userSig,
					accountType: data.accountType,
				}).then(res => res)
				if (res.data.code !== 0) {
					this.$message.error(res.data.message)
					return false
				}
				this.token = res.data.token
				this.createRoom()
			},
			async createRoom () {
				let res = await controller.createRoom({
					userID: this.patientId,
					token: this.token,
					roomID: this.roomInfo.roomId,
					roomInfo: '问诊',
				}).then(res => res)
				this.initRoom(this.roomInfo)
				this.listerRoom()
				this.enterRoom()
			},
			enterRoom () {
				this.isLoading = true

				WebListOpt.enterRoom({
					data: {
						roomID: this.roomInfo.roomId,
						roomName: 'test',
						roomType: this.RoomTypeID,
						roomCreator: this.patientName,
						roomTitle: "视频问诊",
						roomAction: EnumDef.RoomAction.CreateRoom,
						// roomAction: EnumDef.RoomAction.EnterRoom,
						roomLogo: "http://liteavsdk-1252463788.cosgz.myqcloud.com/windows/Cpp/logo/doubleroom_logo.png",
					},
					success: () => {
						this.isLoading = false
						this.isNoExe = false
						console.log("进入房间成功")
						this.getPushUrl()
					},
					fail: (ret) => {
						this.isLoading = false
						//当ret == -1，RtcRoom未检测到本地安装EXE，需要手动安装
						if (ret.errCode === -1) {
							console.log("进入房间 timeout!")
							this.isNoExe = true
						} else {
							console.log("进入房间失败!")
							this.isNoExe = false
						}
					},
				})
			},
			async getPushUrl () {
				let res = await controller.getPushUrl({
					userID: this.patientId,
					token: this.token,
					roomID: this.roomInfo.roomId
				}).then(res => res)
				this.addPusher(res.data.pushURL)
			},
			async addPusher (pushURL) {
				let res = await controller.addPusher({
					pushURL:pushURL,
					userID: this.patientId,
					token: this.token,
					roomID: this.roomInfo.roomId,
					userAvatar: 'https://kzj-b2b.oss-cn-shenzhen.aliyuncs.com/168928119577681920.jpg?x-oss-process=style/b2b',
					roomInfo: '视频问诊',
					userName: this.patientName,
				}).then(res => res)

			},
		}
	}
</script>

<style lang="scss" scoped>
	.video-call {
		.exe-remind {
			position: fixed;
			top: 40px;
			left: 50%;
			transform: translateX(-50%);
			padding: 20px 60px;
			background: rgba(255, 255, 255, .8);
			box-shadow: -2px 5px 15px 0 rgba(10,14,26,0.1);
			color: #999;
			font-size: 14px;

			a {
				color: #3b6eff;
				cursor: pointer;
			}
		}
	}
</style>
