const express = require('express')
const app = express()

// 导入vue
const Vue = require('vue')
// 渲染器
// 得到一个渲染器，可以直接渲染vue实例
const {createRenderer} = require('vue-server-renderer')
const renderer = createRenderer()

// 路由
app.get('*',async (req, res) =>{
  // 创建vue实例
  const vm = new Vue({
    data(){
      return {
        name: 'wwww'
      }
    },
    template: '<h1 @click="onclick">{{name}}</h1>',
    methods: {
      onclick(){
        console.log('')
      }
    }
  })
  try{
    // 渲染获取html字符串
    const html = await renderer.renderToString(vm)
    res.send(html)
  }catch(error){
    // 500
    res.status(500).send('Internal Server Error')
  }

})

// 端口
app.listen(9000, () =>{
  console.log('server listen on 9000')
})
