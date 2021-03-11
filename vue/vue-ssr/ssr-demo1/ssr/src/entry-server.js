import {createApp} from './main'
// 首屏渲染 服务端执行
// 创建Vue实例
// entry-server 调用者是奖将来的渲染器renderServer
export default context =>{
  return new Promise((resolve, reject) =>{
    // 创建vue实例和路由实例
    const {app, router} = createApp(context)

    // 获取用户请求的url，从而知道要渲染的哪个页面
    // 跳转至首屏
    router.push(context.url)

    // 监听路由器ready事件，确保异步任务都完成
    router.ready(() =>{
      resolve(app)
    },reject)
  })
}
