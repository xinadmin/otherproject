let WebListOpt = {

	/**
	 *  @param object
	 *  {
	 *  data: {
	 *      serverDomain  String   请求的后台地址
	 *      userID        String    用户ID
	 *      userName      String    用户昵称
	 *      sdkAppID      String    IM登录凭证
	 *      accType       Int       账号集成类型
	 *      userSig       String    IM签名
	 *      rr
	 *  }
	 * success       function  成功回调
	 * fail          function  失败回调
	 * }
	 *
	 */
	initRoom: function(object) {
	},

	/**
	 * 创建房间（大主播）
	 * @param object
	 * {
	 *  data: {
	 *     divId        String  推流预览画面所在div
	 *     cameraId     String  摄像头ID（通过getCameras可以获取所有摄像头）
	 *     roomInfo:    String  用户自定义数据，作为房间信息会在getRoomList函数返回
	 *  }
	 * success       function(ret)  成功回调
	 *      ret: {
	 *          roomID
	 *      }
	 * fail          function  失败回调
	 * }
	 */
	createRoom: function(object) {
	},

	/**
	 * 进入房间（小主播）
	 * @param object
	 * {
	 *  data: {
	 *      roomID:     String  房间号
	 *      divId       String  推流预览画面所在div
	 *      cameraId    String  摄像头ID（通过getCameras可以获取所有摄像头）
	 *  }
	 * success       function  成功回调
	 * fail          function  失败回调
	 * }
	 */
	enterRoom: function(object) {
	},

	/**
	 * @param object
	 * {
	 * success       function  成功回调
	 * fail          function  失败回调
	 * }
	 */
	exitRoom: function(object) {
	},

	/**
	 * @param object
	 * {
	 *  data: {
	 *      index       Int
	 *      count       Int
	 *      roomType    Int
	 *  }
	 * success       function  成功回调
	 * fail          function  失败回调
	 * }
	 */
	getRoomList: function(object) {
	},

	/**
	 *  @param object
	 *  {
	 *      onRecvCmd           function  获取命令
	 *          {
	 *              cmdJson           String
	 *              roomID            String
	 *          }
	 *      onRoomClose          function  房间被动关闭
	 *          {
	 *              roomID            String
	 *          }
	 *  }
	 */
	setListener: function(object) {
	},
	unload: function() {
	}
}

let arrWebRoom = []
let webListDomain = ''
let roomServerDoMain = ''
let webExeRoomType = ''
let EXEStartObj = null

let accountInfo = {
	userID: '',			// 用户ID
	userName: '',		   // 用户昵称
	userAvatar: '',		// 用户头像URL
	userSig: '',		// IM登录凭证
	sdkAppID: '',		// IM应用ID
	accountType: '',	// 账号集成类型
	accountMode: 0,		//帐号模式，0-表示独立模式，1-表示托管模式
	pushURL: '',        //推流地址
	isCreator: false,    //是否是房间创建者
	previewDivId: '',
	token: ''
}
const webexe_roomtype = {
	LiveRoom: "webexe_liveroom",
	DoubleRoom: "webexe_doubleroom",
	MultiRoom: "webexe_multiroom",
}

WebListOpt = {
	webexe_roomtype: webexe_roomtype,
	event: {
		onRecvData: () => {
		},		        // 收到命令
		onRoomClose: () => {
		}
	},
	initRoom: (object) => {
		if (!object || !object.data.roomServerDoMain || !object.data.listServerDoMain) {
			console.error('init参数错误')
			object.fail && object.fail(-9999, 'init参数错误')
			return
		}
		accountInfo.userID = object.data.userID
		accountInfo.userSig = object.data.userSig
		accountInfo.sdkAppID = object.data.sdkAppID
		accountInfo.accountType = object.data.accType
		accountInfo.accType = object.data.accountType
		accountInfo.userAvatar = object.userAvatar || '123'
		webExeRoomType = object.data.roomType
		roomServerDoMain = object.data.roomServerDoMain
		webListDomain = object.data.listServerDoMain
		EXEStartObj = LiveRoom
		if (webExeRoomType != webexe_roomtype.LiveRoom) {
			EXEStartObj = RtcRoom
		}
	},
	createRoom: (object) => {
		console.log('create_room:' + object.data.roomInfo)

		request({
			url: webListDomain + 'create_room',
			method: "POST",
			data: {
				userID: accountInfo.userID,
				nickName: accountInfo.userName,
				roomID: "",
				roomInfo: object.data.roomInfo,
				roomType: webExeRoomType,
				needHeartBeat: false, // 是否需要心跳，默认值1-需要
			},
			success: (ret) => {
				if (ret.data.code !== 0) {
					console.log('创建失败:', JSON.stringify(ret))
					object.fail && object.fail({
						errCode: ret.data.code,
						errMsg: ret.data.message + '[' + ret.data.code + ']'
					})
					return
				}
				object.success && object.success(ret)
			},
			fail: object.fail
		})
	},
	setListener: (object) => {
		console.log('-----setWebRoomListener------')
		if (!object) {
			console.error('setWebRoomListener参数错误', object)
			return false
		}
		WebListOpt.event.onRecvData = object.onRecvCmd || function () { }
		WebListOpt.event.onRoomClose = object.onRoomClose || function () { }
		EXEStartObj.setListener({
			onRoomClose: (ret) => {
				WebListOpt.event.onRoomClose && WebListOpt.event.onRoomClose({
					data: {
						roomID: ret.data.roomID,
						roomName: ret.data.roomName,
						code: ret.data.code,
						msg: ret.data.msg,
					}
				})
			},
		})
	},
	enterRoom: (object) =>{
		let bEnter = false
		let index = 0
		for (let i = 0; i < arrWebRoom.length; i++) {
			if (arrWebRoom[i].roomID === object.data.roomID) {
				bEnter = true
				index = i
				break
			}
		}
		if (bEnter === true) {
			alert( "[" + arrWebRoom[i].roomName + "]已开启，请先退出!")
			object.fail && object.fail({})
			return
		}

		// 房间信息
		let roomInfo = {
			roomID: '',			// 视频位房间ID
			roomName: '',		// 自定义信息
			roomCreator: '',    // 房间创建者的userID
		}
		console.log('enterRoom-roomID:' + object.data.roomID)
		roomInfo.roomID = object.data.roomID
		roomInfo.roomName = object.data.roomName
		roomInfo.roomCreator = object.data.roomCreator
		arrWebRoom.push(roomInfo)

		let template = EnumDef.Template.Template1V3
		if (webExeRoomType == "webexe_doubleroom") //如果是doubleroom，采用1v1的模板
			template = EnumDef.Template.Template1V1

		EXEStartObj.startEXE({
			userdata: {
				userID: accountInfo.userID,
				userName: accountInfo.userName,
				sdkAppID: accountInfo.sdkAppID,
				accType: accountInfo.accountType,
				userSig: accountInfo.userSig,
			},
			roomdata: {
				serverDomain: roomServerDoMain,
				roomAction: object.data.roomAction,
				roomID: object.data.roomID,
				roomName: object.data.roomName,
				roomTitle: object.data.roomTitle,
				roomLogo: object.data.roomLogo,
				template: template,
			},
			custom: {
				// userList: false,
				// IMList: false,
				// whiteboard: false,
				// screenRecord: EnumDef.ScreenRecordType.RecordScreenToServer,
				// cloudRecordUrl: 'rtmp://play.yxejk.com/live/StreamName'
			},
			success: (ret) => {
				object.success && object.success(ret)
				console.log('进入房间')
			},
			fail: (ret) => {
				let index = -1
				for (let i = 0; i < arrWebRoom.length; i++) {
					if (arrWebRoom[i].roomID === object.data.roomID) {
						index = i
						break
					}
				}
				if (index !== -1) {
					arrWebRoom.splice(index, 1)
				}
				object.fail && object.fail(ret)
			},
		})
	},
	exitRoom: (object) => {
		console.log('exitRoom-roomID:' + object.data.roomID)
		EXEStartObj.stopEXE({ data: { roomID: object.data.roomID, } })
		let index = -1
		for (let i = 0; i < arrWebRoom.length; i++) {
			if (arrWebRoom[i].roomID === object.data.roomID) {
				index = i
				break
			}
		}
		if (index !== -1) {
			arrWebRoom.splice(index, 1);
		}
		if (arrWebRoom.length === 0)
			EXEStartObj.setListener({})

		request({
			url: webListDomain + 'delete_room',
			method: "POST",
			data: {
				roomID: object.data.roomID,
			},
			success: (ret) => {
				if (ret.data.code !== 0) {
					console.log('删除房间失败:', JSON.stringify(ret))
					object.fail && object.fail({
						errCode: ret.data.code,
						errMsg: ret.data.message + '[' + ret.data.code + ']'
					})
					return
				}
				object.success && object.success(ret)
			},
			fail: object.fail
		})
	},
	getRoomList: (object) => {
		console.log('-----getRoomList------')
		request({
			url: webListDomain + 'get_room_list',
			method: "POST",
			data: {
				roomType: webExeRoomType,
				index: object.data.index,
				count: object.data.count
			},
			success: function (ret) {
				if(ret.data.code !== 0) {
					console.log('获取房间列表失败:', JSON.stringify(ret))
					object.fail && object.fail({
						errCode: ret.data.code,
						errMsg: ret.data.message + '[' + ret.data.code + ']'
					})
					return
				}
				object.success && object.success(ret)
			},
			fail: object.fail
		})
	},
	unload: () => {
		EXEStartObj.unload()
	}
}
export default WebListOpt

