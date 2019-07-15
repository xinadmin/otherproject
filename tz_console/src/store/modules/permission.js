// import { asyncRouterMap, constantRouterMap } from '@/router'
//
// function hasPermission(permissons, route) {
// 	if (route.meta && route.meta.permission) {
//         return permissons.some(permiss => route.meta.permission.pCheck === permiss.pCheck && route.meta.permission.pId === permiss.pId)
// 	} else if (route.path == '*') {
// 		return true
// 	} else {
// 		return false
// 	}
// }
//
// const permission = {
// 	state: {
// 		routers: constantRouterMap,
// 		addRouters: [],
// 		permissList: []
// 	},
// 	mutations: {
// 		SET_ROUTERS: (state, routers) => {
// 			state.addRouters = routers
// 			state.routers = constantRouterMap.concat(routers)
// 		},
// 		SET_PERMISSION: (state, permissList) => {
// 			state.permissList = permissList
// 		}
// 	},
// 	actions: {
// 		GenerateRoutes({ commit }, data) {
// 			return new Promise(resolve => {
// 				const accessedRouters = asyncRouterMap.filter(v => {
// 					if (hasPermission(data, v)) {
// 						if (v.children && v.children.length > 0) {
// 							v.children = v.children.filter(child => {
// 								if (hasPermission(data, child)) {
// 									return child
// 								}
// 								return false
// 							})
// 							return v
// 						} else {
// 							return v
// 						}
// 					}
// 					return false
// 				})
// 				commit('SET_ROUTERS', accessedRouters)
// 				resolve()
// 			})
// 		}
// 	}
// }
//
// export default permission
