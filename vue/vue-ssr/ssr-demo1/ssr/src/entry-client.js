// 客户端激活
import { createApp } from './main';
// 创建Vue实例
const {app, router} = createApp()

// 等待router就绪
router.onReady(() =>{
  // 挂载激活
  app.$mount('#app')
})
